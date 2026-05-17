from __future__ import annotations

import asyncio
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from openai import AsyncOpenAI

from agents.mock_data import DROPS

DATA_DIR = Path(__file__).resolve().parent / "data"
LIVE_DROPS_PATH = DATA_DIR / "live_drops.json"
REFRESH_SECONDS = 6 * 60 * 60

SEARCH_QUERIES = [
    "Singapore sneaker drop this week",
    "Singapore limited edition release current month",
    "Swatch Singapore pop-up 2025",
    "Pop Mart Singapore drop",
]


async def refresh_loop() -> None:
    while True:
        await refresh_live_drops()
        await asyncio.sleep(REFRESH_SECONDS)


async def refresh_live_drops() -> list[dict[str, Any]]:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    if not os.getenv("OPENAI_API_KEY"):
        print("OPENAI_API_KEY missing; live drop discovery uses hardcoded fallback [SIMULATED]")
        if not LIVE_DROPS_PATH.exists():
            LIVE_DROPS_PATH.write_text("[]", encoding="utf-8")
        return []

    client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = f"""
Search the web for current or upcoming Singapore product drops. Use these searches:
{json.dumps(SEARCH_QUERIES)}

Extract only product releases that include a product name, brand, Singapore location,
date/time, and source URL. Return strict JSON only, no markdown, matching:
[
  {{
    "name": "product name",
    "brand": "brand",
    "location": "Singapore venue",
    "dropTime": "10:00 AM, 18 May",
    "queueOpen": "8:00 AM",
    "estimatedWait": "2h 40min",
    "status": "hot",
    "sourceUrl": "https://source.example/path",
    "sourceLabel": "Source name"
  }}
]
"""

    try:
        response = await client.responses.create(
            model=os.getenv("OPENAI_SEARCH_MODEL", "gpt-4.1-mini"),
            tools=[
                {
                    "type": "web_search",
                    "user_location": {
                        "type": "approximate",
                        "country": "SG",
                        "city": "Singapore",
                        "timezone": "Asia/Singapore",
                    },
                }
            ],
            include=["web_search_call.action.sources"],
            input=prompt,
        )
        parsed = _parse_json_array(response.output_text)
        live_drops = _normalize_drops(parsed)
        LIVE_DROPS_PATH.write_text(json.dumps(live_drops, indent=2), encoding="utf-8")
        print(f"Live drop discovery refreshed {len(live_drops)} drops [LIVE web_search]")
        return live_drops
    except Exception as exc:
        print(f"Live drop discovery failed; using fallback drops [SIMULATED]: {exc}")
        if not LIVE_DROPS_PATH.exists():
            LIVE_DROPS_PATH.write_text("[]", encoding="utf-8")
        return []


def _parse_json_array(text: str) -> list[dict[str, Any]]:
    stripped = text.strip()
    if stripped.startswith("["):
        payload = json.loads(stripped)
    else:
        match = re.search(r"\[[\s\S]*\]", stripped)
        if not match:
            return []
        payload = json.loads(match.group(0))

    if not isinstance(payload, list):
        return []

    return [item for item in payload if isinstance(item, dict)]


def _normalize_drops(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    fallback_colors = ["#1a0a2e", "#0a1a2e", "#1a1a0a"]

    for index, item in enumerate(items[:6], start=1):
        name = str(item.get("name", "")).strip()
        brand = str(item.get("brand", "")).strip()
        location = str(item.get("location", "")).strip()
        source_url = str(item.get("sourceUrl", "")).strip()

        if not name or not brand or not location or not source_url:
            continue

        normalized.append(
            {
                "id": f"live-{index}",
                "name": name,
                "brand": brand,
                "location": location,
                "dropTime": str(item.get("dropTime", _fallback_drop_time(index))),
                "queueOpen": str(item.get("queueOpen", "9:00 AM")),
                "estimatedWait": str(item.get("estimatedWait", "2h 15min")),
                "currentSlot": 1,
                "totalSlots": 150,
                "status": _status(item.get("status")),
                "imagePlaceholderColor": fallback_colors[(index - 1) % len(fallback_colors)],
                "sourceUrl": source_url,
                "sourceLabel": str(item.get("sourceLabel", "Source")),
                "discoveredAt": datetime.now(timezone.utc).isoformat(),
            }
        )

    return normalized


def _status(value: Any) -> str:
    status = str(value).lower()
    if status in {"hot", "filling", "available"}:
        return status

    return "hot"


def _fallback_drop_time(index: int) -> str:
    return DROPS[(index - 1) % len(DROPS)]["dropTime"]
