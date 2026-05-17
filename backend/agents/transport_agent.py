from __future__ import annotations

import math
import os
from datetime import datetime
from typing import Any

import httpx

from .mock_data import TRANSPORT_BY_LOCATION


class TransportAgent:
    def __init__(self) -> None:
        self.lta_api_key = os.getenv("LTA_API_KEY", "")
        self.onemap_access_token = os.getenv("ONEMAP_ACCESS_TOKEN", "")

    async def plan_route(
        self,
        user_latitude: float,
        user_longitude: float,
        drop: dict[str, Any],
    ) -> dict[str, Any]:
        destination = await self._resolve_destination(drop)
        fallback = TRANSPORT_BY_LOCATION.get(
            str(drop.get("location", "")),
            {
                "travelMinutes": 28,
                "line": "MRT to nearest central station",
                "walkingDistanceMeters": 450,
                "firstDeparture": "Now",
                "interchange": "Check station signage",
                "nearestStop": "Nearest MRT station",
            },
        )

        route = await self._fetch_onemap_route(
            user_latitude,
            user_longitude,
            float(destination["latitude"]),
            float(destination["longitude"]),
        )
        lta = await self._fetch_nearest_lta_stop(
            float(destination["latitude"]),
            float(destination["longitude"]),
        )

        if route["source"] == "LIVE":
            print("OneMap routing succeeded [LIVE]")
            route_result = route
        else:
            print("OneMap routing failed; using Singapore fallback [SIMULATED]")
            route_result = {
                "travelMinutes": fallback["travelMinutes"],
                "line": fallback["line"],
                "walkingDistanceMeters": fallback["walkingDistanceMeters"],
                "firstDeparture": fallback["firstDeparture"],
                "interchange": fallback["interchange"],
                "label": (
                    f"{fallback['travelMinutes']} min via {fallback['line']} "
                    f"({fallback['walkingDistanceMeters']}m walk)"
                ),
                "source": "SIMULATED",
            }

        route_result["nearestStop"] = (
            lta["nearestStop"] if lta["source"] == "LIVE" else fallback["nearestStop"]
        )
        route_result["ltaSource"] = lta["source"]
        route_result["destinationLatitude"] = destination["latitude"]
        route_result["destinationLongitude"] = destination["longitude"]
        return route_result

    async def _resolve_destination(self, drop: dict[str, Any]) -> dict[str, float]:
        latitude = drop.get("latitude")
        longitude = drop.get("longitude")

        if isinstance(latitude, (int, float)) and isinstance(longitude, (int, float)):
            return {"latitude": float(latitude), "longitude": float(longitude)}

        try:
            async with httpx.AsyncClient(timeout=6.0) as client:
                response = await client.get(
                    "https://www.onemap.gov.sg/api/common/elastic/search",
                    params={
                        "searchVal": str(drop.get("location", "Singapore")),
                        "returnGeom": "Y",
                        "getAddrDetails": "Y",
                        "pageNum": "1",
                    },
                )
                response.raise_for_status()
                data = response.json()
                first_result = data["results"][0]
                return {
                    "latitude": float(first_result["LATITUDE"]),
                    "longitude": float(first_result["LONGITUDE"]),
                }
        except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError) as exc:
            print(f"OneMap destination geocoding failed; using ION fallback [SIMULATED]: {exc}")

        return {"latitude": 1.3040, "longitude": 103.8318}

    async def _fetch_onemap_route(
        self,
        user_latitude: float,
        user_longitude: float,
        destination_latitude: float,
        destination_longitude: float,
    ) -> dict[str, Any]:
        try:
            headers = {}
            if self.onemap_access_token:
                headers["Authorization"] = self.onemap_access_token

            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    "https://www.onemap.gov.sg/api/public/routingsvc/route",
                    headers=headers,
                    params={
                        "start": f"{user_latitude},{user_longitude}",
                        "end": f"{destination_latitude},{destination_longitude}",
                        "routeType": "pt",
                        "date": datetime.now().strftime("%m-%d-%Y"),
                        "time": datetime.now().strftime("%H:%M:%S"),
                        "mode": "TRANSIT",
                        "maxWalkDistance": "800",
                        "numItineraries": "1",
                    },
                )
                response.raise_for_status()
                data = response.json()

            itinerary = data["plan"]["itineraries"][0]
            duration_mins = round(float(itinerary["duration"]) / 60)
            legs = itinerary["legs"]
            transit_legs = [
                leg for leg in legs if str(leg.get("mode", "")).upper() in {"SUBWAY", "BUS", "RAIL"}
            ]
            walk_legs = [
                leg for leg in legs if str(leg.get("mode", "")).upper() == "WALK"
            ]
            route_name = " -> ".join(
                str(leg.get("routeShortName", leg.get("mode", "Transit")))
                for leg in transit_legs
            ) or "Walk"
            walk_m = round(sum(float(leg.get("distance", 0)) for leg in walk_legs))
            first_departure = self._format_departure(
                transit_legs[0].get("startTime") if transit_legs else itinerary.get("startTime")
            )

            return {
                "travelMinutes": duration_mins,
                "line": route_name,
                "walkingDistanceMeters": walk_m,
                "firstDeparture": first_departure,
                "interchange": self._interchange_label(transit_legs),
                "label": f"{duration_mins} min via {route_name} ({walk_m}m walk)",
                "source": "LIVE",
            }
        except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError) as exc:
            print(f"OneMap route request failed [SIMULATED fallback]: {exc}")
            return {"source": "SIMULATED"}

    async def _fetch_nearest_lta_stop(
        self,
        destination_latitude: float,
        destination_longitude: float,
    ) -> dict[str, str]:
        if not self.lta_api_key:
            print("LTA_API_KEY missing; nearest stop uses fallback [SIMULATED]")
            return {"nearestStop": "Nearest MRT station", "source": "SIMULATED"}

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                best_stop: dict[str, Any] | None = None
                best_distance = float("inf")

                for skip in range(0, 5500, 500):
                    response = await client.get(
                        "https://datamall2.mytransport.sg/ltaodataservice/BusStops",
                        headers={"AccountKey": self.lta_api_key, "accept": "application/json"},
                        params={"$skip": skip},
                    )
                    response.raise_for_status()
                    payload = response.json()
                    for stop in payload.get("value", []):
                        distance = self._haversine_meters(
                            destination_latitude,
                            destination_longitude,
                            float(stop["Latitude"]),
                            float(stop["Longitude"]),
                        )
                        if distance < best_distance:
                            best_distance = distance
                            best_stop = stop

                if best_stop:
                    print("LTA DataMall nearest bus stop lookup succeeded [LIVE]")
                    return {"nearestStop": str(best_stop["Description"]), "source": "LIVE"}
        except (httpx.HTTPError, KeyError, TypeError, ValueError) as exc:
            print(f"LTA DataMall lookup failed [SIMULATED fallback]: {exc}")

        return {"nearestStop": "Nearest MRT station", "source": "SIMULATED"}

    def _format_departure(self, timestamp: Any) -> str:
        try:
            value = int(timestamp)
        except (TypeError, ValueError):
            return "Now"

        if value > 10_000_000_000:
            value = value // 1000

        return datetime.fromtimestamp(value).strftime("%I:%M %p")

    def _interchange_label(self, transit_legs: list[dict[str, Any]]) -> str:
        route_names = [
            str(leg.get("routeShortName", leg.get("mode", "Transit")))
            for leg in transit_legs
        ]
        unique_routes = list(dict.fromkeys(route_names))

        if len(unique_routes) <= 1:
            return "No interchange"

        return f"Interchange via {' -> '.join(unique_routes)}"

    def _haversine_meters(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        radius = 6_371_000
        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = (
            math.sin(delta_phi / 2) ** 2
            + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
        )
        return radius * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
