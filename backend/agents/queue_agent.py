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
        date_fragment = self._date_fragment(drop_time)
        candidates = [
            f"{queue_open}, {date_fragment}",
            f"{queue_open} {date_fragment}",
        ]

        for candidate in candidates:
            for fmt in ("%I:%M %p, %d %B %Y", "%I:%M %p, %d %b %Y", "%I:%M %p %d %B %Y", "%I:%M %p %d %b %Y"):
                try:
                    return datetime.strptime(candidate, fmt)
                except ValueError:
                    continue

        return now + timedelta(hours=2)

    def _date_fragment(self, drop_time: str) -> str:
        now = datetime.now()
        parts = [part.strip() for part in drop_time.split(",")]
        if len(parts) >= 2:
            return f"{parts[-1]} {now.year}"

        return now.strftime("%d %B %Y")
