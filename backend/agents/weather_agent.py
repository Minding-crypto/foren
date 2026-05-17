from __future__ import annotations

import os
from typing import Any

import httpx

from .mock_data import WEATHER_BY_LOCATION


class WeatherAgent:
    def __init__(self) -> None:
        self.openweather_api_key = os.getenv("OPENWEATHER_API_KEY", "")

    async def get_weather_advice(self, drop: dict[str, Any]) -> dict[str, str | int]:
        location = str(drop.get("location", "Singapore"))
        fallback = WEATHER_BY_LOCATION.get(location, "Warm evening - no rain expected")

        latitude = drop.get("latitude")
        longitude = drop.get("longitude")
        if not isinstance(latitude, (int, float)) or not isinstance(longitude, (int, float)):
            print("Drop coordinates missing; weather uses Singapore fallback [SIMULATED]")
            return {
                "weather": fallback,
                "description": fallback,
                "temp_c": 29,
                "recommendation": "Check weather before leaving",
                "source": "SIMULATED",
            }

        if not self.openweather_api_key:
            print("OPENWEATHER_API_KEY missing; weather uses Singapore fallback [SIMULATED]")
            return {
                "weather": fallback,
                "description": fallback,
                "temp_c": 29,
                "recommendation": "Check weather before leaving",
                "source": "SIMULATED",
            }

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                response = await client.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    params={
                        "lat": float(latitude),
                        "lon": float(longitude),
                        "appid": self.openweather_api_key,
                        "units": "metric",
                    },
                )
                response.raise_for_status()
                data = response.json()

            description = str(data["weather"][0]["description"]).capitalize()
            temp_c = round(float(data["main"]["temp"]))
            rain = "rain" in description.lower() or "drizzle" in description.lower()
            recommendation = "Bring an umbrella" if rain else "No rain expected"
        except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError) as exc:
            print(f"OpenWeatherMap request failed; weather uses Singapore fallback [SIMULATED]: {exc}")
            return {
                "weather": fallback,
                "description": fallback,
                "temp_c": 29,
                "recommendation": "Check weather before leaving",
                "source": "SIMULATED",
            }

        print("OpenWeatherMap weather lookup succeeded [LIVE]")
        return {
            "weather": f"{description}, {temp_c}°C - {recommendation}",
            "description": description,
            "temp_c": temp_c,
            "recommendation": recommendation,
            "source": "LIVE",
        }
