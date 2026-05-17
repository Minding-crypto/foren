from __future__ import annotations

import json
import calendar
import re
from datetime import date
from pathlib import Path
from typing import Any

MONTHS = {
    "jan": 1,
    "january": 1,
    "feb": 2,
    "february": 2,
    "mar": 3,
    "march": 3,
    "apr": 4,
    "april": 4,
    "may": 5,
    "jun": 6,
    "june": 6,
    "jul": 7,
    "july": 7,
    "aug": 8,
    "august": 8,
    "sep": 9,
    "sept": 9,
    "september": 9,
    "oct": 10,
    "october": 10,
    "nov": 11,
    "november": 11,
    "dec": 12,
    "december": 12,
}


class DropAgent:
    def __init__(self) -> None:
        self.data_path = Path(__file__).resolve().parents[1] / "data" / "live_drops.json"

    def list_drops(self) -> list[dict[str, Any]]:
        live_drops = self._read_live_drops()

        if live_drops:
            print("GET /api/drops using live_drops.json [LIVE web-search derived]")
            return live_drops

        print("GET /api/drops has no live drops; returning empty list instead of fake drops")
        return []

    def get_drop(self, drop_id: str) -> dict[str, Any] | None:
        live_drops = self._read_live_drops()
        return next((drop for drop in live_drops if str(drop.get("id")) == drop_id), None)

    def _read_live_drops(self) -> list[dict[str, Any]]:
        try:
            if not self.data_path.exists():
                return []

            payload = json.loads(self.data_path.read_text(encoding="utf-8"))
            if not isinstance(payload, list):
                return []

            return [
                drop
                for drop in payload
                if isinstance(drop, dict) and self._is_current_or_upcoming(drop)
            ]
        except (OSError, json.JSONDecodeError):
            return []

    def _is_current_or_upcoming(self, drop: dict[str, Any]) -> bool:
        drop_time = str(drop.get("dropTime", "")).strip()
        parsed_dates = self._dates_from_text(drop_time)

        if not parsed_dates:
            return False

        today = date.today()
        lower_drop_time = drop_time.lower()
        ongoing_terms = ("daily", "until", "till", "through", "now", " to ")

        if any(term in lower_drop_time for term in ongoing_terms):
            return max(parsed_dates) >= today

        return min(parsed_dates) >= today

    def _dates_from_text(self, text: str) -> list[date]:
        today = date.today()
        parsed: list[date] = []
        current_year = today.year

        for match in re.finditer(
            r"\b(\d{1,2})\s+"
            r"(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
            r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t)?(?:ember)?|Oct(?:ober)?|"
            r"Nov(?:ember)?|Dec(?:ember)?)"
            r"(?:\s+(\d{4}))?\b",
            text,
            flags=re.IGNORECASE,
        ):
            day = int(match.group(1))
            month = MONTHS[match.group(2).lower()]
            year = int(match.group(3) or current_year)
            parsed.append(date(year, month, day))

        for match in re.finditer(
            r"\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
            r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t)?(?:ember)?|Oct(?:ober)?|"
            r"Nov(?:ember)?|Dec(?:ember)?)\s+(\d{4})\b",
            text,
            flags=re.IGNORECASE,
        ):
            if text[max(0, match.start() - 3) : match.start()].strip().isdigit():
                continue

            month = MONTHS[match.group(1).lower()]
            year = int(match.group(2))
            parsed.append(date(year, month, self._last_day_of_month(year, month)))

        return parsed

    def _last_day_of_month(self, year: int, month: int) -> int:
        return calendar.monthrange(year, month)[1]
