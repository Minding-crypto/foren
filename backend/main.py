from __future__ import annotations

import asyncio
import os
from contextlib import asynccontextmanager
from typing import Any, Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from agents import DropAgent, QueueAgent, TransportAgent, WeatherAgent
from check_env import print_environment_report
from scraper import refresh_loop

load_dotenv()


@asynccontextmanager
async def lifespan(_: FastAPI):
    print_environment_report()
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
    title="QueueForMe API",
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
released_slots: dict[str, list[int]] = {}
confirmed_slots: dict[str, set[int]] = {}


class Drop(BaseModel):
    id: str
    name: str
    brand: str
    location: str
    dropTime: str
    queueOpen: str
    estimatedWait: str
    currentSlot: int | None = None
    totalSlots: int | None = None
    status: Literal["hot", "filling", "available"]
    imagePlaceholderColor: str
    latitude: float | None = None
    longitude: float | None = None
    sourceUrl: str | None = None
    sourceLabel: str | None = None


class UserLocation(BaseModel):
    latitude: float
    longitude: float
    source: Literal["LIVE", "REAL", "SIMULATED", "SIMULATED - permission denied"]


class SecureSlotRequest(BaseModel):
    drop_id: str = Field(alias="dropId")
    user_location: UserLocation = Field(alias="userLocation")


class SlotActionRequest(BaseModel):
    drop_id: str = Field(alias="dropId")
    slot_number: int = Field(alias="slotNumber", ge=1)


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
    if drop is None:
        raise HTTPException(
            status_code=404,
            detail="Drop not found. Live discovery has no verified drop for this id.",
        )

    starting_slot = drop.get("currentSlot")
    slot_number = _assign_slot(
        str(drop["id"]),
        starting_slot if isinstance(starting_slot, int) and starting_slot > 0 else 1,
    )
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


@app.post("/api/optimize", response_model=SecureSlotResponse)
async def optimize_alias(request: SecureSlotRequest) -> dict[str, Any]:
    return await secure_api_slot(request)


@app.post("/secure-slot", response_model=SecureSlotResponse)
async def secure_slot_alias(request: SecureSlotRequest) -> dict[str, Any]:
    return await secure_api_slot(request)


@app.post("/api/confirm-slot")
async def confirm_api_slot(request: SlotActionRequest) -> dict[str, str | int]:
    confirmed_slots.setdefault(request.drop_id, set()).add(request.slot_number)
    print(
        f"Confirmed slot #{request.slot_number} for {request.drop_id} "
        "[LIVE] persisted this session"
    )
    return {
        "status": "confirmed",
        "dropId": request.drop_id,
        "slotNumber": request.slot_number,
    }


@app.post("/api/release-slot")
async def release_api_slot(request: SlotActionRequest) -> dict[str, str | int]:
    confirmed_slots.setdefault(request.drop_id, set()).discard(request.slot_number)
    released_for_drop = released_slots.setdefault(request.drop_id, [])

    if request.slot_number not in released_for_drop:
        released_for_drop.append(request.slot_number)
        released_for_drop.sort()

    print(
        f"Released slot #{request.slot_number} for {request.drop_id} "
        "[LIVE] available again this session"
    )
    return {
        "status": "released",
        "dropId": request.drop_id,
        "slotNumber": request.slot_number,
    }


def _assign_slot(drop_id: str, starting_slot: int) -> int:
    released_for_drop = released_slots.get(drop_id, [])
    if released_for_drop:
        next_slot = released_for_drop.pop(0)
        print(f"Reassigned released slot #{next_slot} for {drop_id} [LIVE]")
        return next_slot

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
    location_status = (
        "[LIVE]"
        if request.user_location.source in {"LIVE", "REAL"}
        else f"[{request.user_location.source}]"
    )
    route_status = "[LIVE]" if transport.get("source") == "LIVE" else "[SIMULATED]"
    lta_status = "[LIVE]" if transport.get("ltaSource") == "LIVE" else "[SIMULATED]"
    weather_status = "[LIVE]" if weather.get("source") == "LIVE" else "[SIMULATED]"

    log = [
        (
            "GPS acquired: "
            f"{request.user_location.latitude:.4f} N, "
            f"{request.user_location.longitude:.4f} E {location_status}"
        ),
        (
            "OneMap route: "
            f"{optimization['travelMinutes']} min via {transport['line']} {route_status}"
        ),
    ]

    if transport.get("source") == "LIVE" and transport.get("nearestStopFromRoute"):
        log.append(f"Transit start from OneMap route: {transport['nearestStopFromRoute']} [LIVE]")
    elif transport.get("ltaSource") == "LIVE":
        log.append(f"LTA nearest stop: {transport['nearestStop']} {lta_status}")

    log.extend(
        [
            f"Weather at {drop['location']}: {weather['weather']} {weather_status}",
            f"Slot #{str(optimization['slotNumber']).zfill(2)} assigned [LIVE] persisted this session",
        ]
    )
    return log
