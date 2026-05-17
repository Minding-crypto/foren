from __future__ import annotations

import os
import sys

from dotenv import load_dotenv


def print_environment_report() -> None:
    load_dotenv()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    checks = {
        "OPENAI_API_KEY": os.getenv("OPENAI_API_KEY"),
        "ONEMAP_ACCESS_TOKEN": os.getenv("ONEMAP_ACCESS_TOKEN"),
        "OPENWEATHER_API_KEY": os.getenv("OPENWEATHER_API_KEY"),
    }

    print("\n=== QueueForMe Environment Check ===", flush=True)
    for key, val in checks.items():
        status = "✅ SET" if val else "❌ MISSING (will use simulated fallback)"
        print(f"  {key}: {status}", flush=True)
    print("==================================\n", flush=True)
