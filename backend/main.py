from __future__ import annotations

import asyncio
import os
from contextlib import asynccontextmanager
from typing import Any, Literal

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from agents import DropAgent, QueueAgent, TransportAgent, WeatherAgent
from scraper import refresh_loop

load_dotenv()


@asynccontextmanager
async def lifespan(_: FastAPI):
    task = asyncio.create_task(refresh_loop())
    try:
        yield
    finally:
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass


app = FastAPI(
    title="QueueGod API",
    description="AI agent API for Singapore product-drop queue optimization.",
    version="1.0.0",
    lifespan=lifespan,
)

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://127.0.0.1:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

drop_agent = DropAgent()
transport_agent = TransportAgent()
weather_agent = WeatherAgent()
queue_agent = QueueAgent()
slot_assignments: dict[str, int] = {}


class Drop(BaseModel):
    id: str
    name: str
    brand: str
    location: str
    dropTime: str
    queueOpen: str
    estimatedWait: str
    currentSlot: int
    totalSlots: int
    status: Literal["hot", "filling", "available"]
    imagePlaceholderColor: str
    latitude: float | None = None
    longitude: float | None = None
    sourceUrl: str | None = None
    sourceLabel: str | None = None


class UserLocation(BaseModel):
    latitude: float
    longitude: float
    source: Literal["LIVE", "REAL", "SIMULATED"]


class SecureSlotRequest(BaseModel):
    drop_id: str = Field(alias="dropId")
    user_location: UserLocation = Field(alias="userLocation")


class QueueOptimization(BaseModel):
    slotNumber: int
    arriveBy: str
    leaveAt: str
    travelMinutes: int
    transport: str
    weather: str
    confidence: int
    message: str


class SecureSlotResponse(BaseModel):
    drop: Drop
    optimization: QueueOptimization
    agentLog: list[str]


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/drops", response_model=list[Drop])
async def list_api_drops() -> list[dict[str, Any]]:
    return drop_agent.list_drops()


@app.get("/drops", response_model=list[Drop])
async def list_drops_alias() -> list[dict[str, Any]]:
    return await list_api_drops()


@app.post("/api/secure-slot", response_model=SecureSlotResponse)
async def secure_api_slot(request: SecureSlotRequest) -> dict[str, Any]:
    drop = drop_agent.get_drop(request.drop_id)
    slot_number = _assign_slot(str(drop["id"]), int(drop["currentSlot"]))
    transport = await transport_agent.plan_route(
        request.user_location.latitude,
        request.user_location.longitude,
        drop,
    )
    weather = await weather_agent.get_weather_advice(drop)
    optimization = queue_agent.optimize(drop, transport, weather, slot_number)
    agent_log = _build_agent_log(request, drop, transport, weather, optimization)

    return {
        "drop": drop,
        "optimization": optimization,
        "agentLog": agent_log,
    }


@app.post("/secure-slot", response_model=SecureSlotResponse)
async def secure_slot_alias(request: SecureSlotRequest) -> dict[str, Any]:
    return await secure_api_slot(request)


def _assign_slot(drop_id: str, starting_slot: int) -> int:
    previous_slot = slot_assignments.get(drop_id, starting_slot - 1)
    next_slot = previous_slot + 1
    slot_assignments[drop_id] = next_slot
    print(f"Assigned persisted in-memory slot #{next_slot} for {drop_id} [LIVE]")
    return next_slot


def _build_agent_log(
    request: SecureSlotRequest,
    drop: dict[str, Any],
    transport: dict[str, Any],
    weather: dict[str, str | int],
    optimization: dict[str, Any],
) -> list[str]:
    location_status = "[LIVE]" if request.user_location.source in {"LIVE", "REAL"} else "[SIMULATED]"
    route_status = "[LIVE]" if transport.get("source") == "LIVE" else "[SIMULATED]"
    lta_status = "[LIVE]" if transport.get("ltaSource") == "LIVE" else "[SIMULATED]"
    weather_status = "[LIVE]" if weather.get("source") == "LIVE" else "[SIMULATED]"

    return [
        (
            "GPS acquired: "
            f"{request.user_location.latitude:.4f} N, "
            f"{request.user_location.longitude:.4f} E {location_status}"
        ),
        (
            "OneMap route: "
            f"{optimization['travelMinutes']} min via {transport['line']} {route_status}"
        ),
        f"LTA nearest stop: {transport['nearestStop']} {lta_status}",
        f"Weather at {drop['location']}: {weather['weather']} {weather_status}",
        f"Slot #{str(optimization['slotNumber']).zfill(2)} assigned [LIVE] persisted this session",
    ]
