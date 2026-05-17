from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any


class QueueAgent:
    def optimize(
        self,
        drop: dict[str, Any],
        transport: dict[str, Any],
        weather: dict[str, str | int],
        slot_number: int,
    ) -> dict[str, Any]:
        queue_open = self._parse_event_time(str(drop.get("queueOpen", "")), str(drop.get("dropTime", "")))
        arrive_by = queue_open - timedelta(minutes=15)
        travel_minutes = int(transport.get("travelMinutes", 28))
        leave_by = arrive_by - timedelta(minutes=travel_minutes)

        if leave_by < datetime.now():
            leave_by = datetime.now() + timedelta(minutes=travel_minutes)

        return {
            "slotNumber": slot_number,
            "arriveBy": arrive_by.strftime("%I:%M %p"),
            "leaveAt": leave_by.strftime("%I:%M %p"),
            "travelMinutes": travel_minutes,
            "transport": str(transport.get("label", f"{travel_minutes} min via public transport")),
            "weather": str(weather["weather"]),
            "confidence": 98 if transport.get("source") == "LIVE" else 86,
            "message": (
                f"Slot #{slot_number} assigned for {drop['brand']} {drop['name']}. "
                f"Leave by {leave_by.strftime('%I:%M %p')} to arrive 15 minutes before queue opens."
            ),
        }

    def _parse_event_time(self, queue_open: str, drop_time: str) -> datetime:
        now = datetime.now()
        time_only = self._parse_time_today(queue_open, now)
        if time_only is not None and (
            "daily" in drop_time.lower()
            or "from " in drop_time.lower()
            or "now till" in drop_time.lower()
            or "through" in drop_time.lower()
        ):
            return time_only if time_only > now else time_only + timedelta(days=1)

        date_fragment = self._date_fragment(drop_time)
        candidates = [
            f"{queue_open}, {date_fragment}",
            f"{queue_open} {date_fragment}",
        ]

        for candidate in candidates:
            for fmt in ("%I:%M %p, %d %B %Y", "%I:%M %p, %d %b %Y", "%I:%M %p %d %B %Y", "%I:%M %p %d %b %Y"):
                try:
                    parsed = datetime.strptime(candidate, fmt)
                    return parsed if parsed > now else parsed + timedelta(days=1)
                except ValueError:
                    continue

        if time_only is not None:
            return time_only if time_only > now else time_only + timedelta(days=1)

        return now + timedelta(hours=2)

    def _parse_time_today(self, queue_open: str, now: datetime) -> datetime | None:
        for fmt in ("%I:%M %p", "%H:%M"):
            try:
                parsed = datetime.strptime(queue_open.strip(), fmt)
                return now.replace(
                    hour=parsed.hour,
                    minute=parsed.minute,
                    second=0,
                    microsecond=0,
                )
            except ValueError:
                continue

        return None

    def _date_fragment(self, drop_time: str) -> str:
        now = datetime.now()
        parts = [part.strip() for part in drop_time.split(",")]
        if len(parts) >= 2:
            return f"{parts[-1]} {now.year}"

        return now.strftime("%d %B %Y")
