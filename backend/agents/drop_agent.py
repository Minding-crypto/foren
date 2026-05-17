from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .mock_data import DROPS


class DropAgent:
    def __init__(self) -> None:
        self.data_path = Path(__file__).resolve().parents[1] / "data" / "live_drops.json"

    def list_drops(self) -> list[dict[str, Any]]:
        live_drops = self._read_live_drops()

        if live_drops:
            print("GET /api/drops using live_drops.json [LIVE web-search derived]")
            return live_drops

        print("GET /api/drops falling back to Singapore demo drops [SIMULATED]")
        return DROPS

    def get_drop(self, drop_id: str) -> dict[str, Any]:
        drops = self.list_drops()
        return next((drop for drop in drops if str(drop["id"]) == drop_id), drops[0])

    def _read_live_drops(self) -> list[dict[str, Any]]:
        try:
            if not self.data_path.exists():
                return []

            payload = json.loads(self.data_path.read_text(encoding="utf-8"))
            if not isinstance(payload, list):
                return []

            return [drop for drop in payload if isinstance(drop, dict)]
        except (OSError, json.JSONDecodeError):
            return []
