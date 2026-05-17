from __future__ import annotations

import os
from typing import Any

import httpx


class WeatherAgent:
    def __init__(self) -> None:
        self.openweather_api_key = os.getenv("OPENWEATHER_API_KEY", "")

    async def get_weather_advice(self, drop: dict[str, Any]) -> dict[str, str | int]:
        fallback = "Weather unavailable - live lookup failed"

        latitude = drop.get("latitude")
        longitude = drop.get("longitude")
        if not isinstance(latitude, (int, float)) or not isinstance(longitude, (int, float)):
            print("Drop coordinates missing; weather uses fallback [SIMULATED]")
            return {
                "weather": fallback,
                "description": fallback,
                "temp_c": 0,
                "recommendation": "Check weather before leaving",
                "source": "SIMULATED",
            }

        if not self.openweather_api_key:
            print("OPENWEATHER_API_KEY missing; weather uses fallback [SIMULATED]")
            return {
                "weather": fallback,
                "description": fallback,
                "temp_c": 0,
                "recommendation": "Check weather before leaving",
                "source": "SIMULATED",
            }

        try:
            async with httpx.AsyncClient(timeout=20.0, follow_redirects=True) as client:
                response = await client.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    params={
                        "lat": float(latitude),
                        "lon": float(longitude),
                        "appid": self.openweather_api_key,
                        "units": "metric",
                    },
                )
                if response.is_error:
                    print(
                        "OpenWeatherMap HTTP error "
                        f"{response.status_code} [SIMULATED fallback]: "
                        f"{response.text[:500]}"
                    )
                response.raise_for_status()
                data = response.json()

            description = str(data["weather"][0]["description"]).capitalize()
            temp_c = round(float(data["main"]["temp"]))
            rain = "rain" in description.lower() or "drizzle" in description.lower()
            recommendation = "Bring an umbrella" if rain else "No rain expected"
        except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError) as exc:
            print(
                "OpenWeatherMap request failed; weather uses fallback "
                f"[SIMULATED]: {type(exc).__name__}: {exc!r}"
            )
            return {
                "weather": fallback,
                "description": fallback,
                "temp_c": 0,
                "recommendation": "Check weather before leaving",
                "source": "SIMULATED",
            }

        print("OpenWeatherMap weather lookup succeeded [LIVE]")
        return {
            "weather": f"{description}, {temp_c} C - {recommendation}",
            "description": description,
            "temp_c": temp_c,
            "recommendation": recommendation,
            "source": "LIVE",
        }
