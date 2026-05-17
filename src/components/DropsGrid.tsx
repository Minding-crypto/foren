"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { AccountTickets } from "@/components/AccountTickets"
import { DropCard } from "@/components/DropCard"
import { SecureSlotModal } from "@/components/SecureSlotModal"
import {
  confirmQueueSlot,
  getDrops,
  releaseAccountTicket,
  releaseQueueSlot,
  secureQueueSlot
} from "@/lib/api"
import type { AccountTicket, Drop, SecureSlotResponse, UserLocation } from "@/lib/types"

const SINGAPORE_FALLBACK_LOCATION: UserLocation = {
  latitude: 1.3521,
  longitude: 103.8198,
  source: "SIMULATED"
}
const ACCOUNT_TICKETS_STORAGE_KEY = "queueforme.accountTickets"

export function DropsGrid() {
  const [activeDrops, setActiveDrops] = useState<Drop[]>([])
  const [isLoadingDrops, setIsLoadingDrops] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSecuring, setIsSecuring] = useState(false)
  const [slotResult, setSlotResult] = useState<SecureSlotResponse | null>(null)
  const [reservationState, setReservationState] = useState<"review" | "confirmed" | "released">(
    "review"
  )
  const [accountTickets, setAccountTickets] = useState<AccountTicket[]>([])
  const [isReservationActionPending, setIsReservationActionPending] = useState(false)
  const [, setUserLocation] = useState<UserLocation | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadDrops() {
      const nextDrops = await getDrops()

      if (isMounted) {
        setActiveDrops(nextDrops)
        setIsLoadingDrops(false)
      }
    }

    loadDrops()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    try {
      const storedTickets = window.localStorage.getItem(ACCOUNT_TICKETS_STORAGE_KEY)
      if (!storedTickets) {
        return
      }

      const parsedTickets = JSON.parse(storedTickets)
      if (Array.isArray(parsedTickets)) {
        setAccountTickets(parsedTickets.filter(isAccountTicket))
      }
    } catch (error) {
      console.warn("QueueForMe could not load account tickets", error)
    }
  }, [])

  async function handleSecureSlot(drop: Drop) {
    setIsModalOpen(true)
    setIsSecuring(true)
    setSlotResult(null)
    setReservationState("review")

    const nextUserLocation = await getUserLocation()
    setUserLocation(nextUserLocation)
    const result = await secureQueueSlot(drop, nextUserLocation)
    setSlotResult(result)
    setIsSecuring(false)
  }

  async function handleConfirmSlot() {
    if (!slotResult) {
      return
    }

    setIsReservationActionPending(true)
    await confirmQueueSlot(slotResult)
    saveAccountTickets(upsertTicket(accountTickets, toAccountTicket(slotResult)))
    setReservationState("confirmed")
    setIsReservationActionPending(false)
  }

  async function handleReleaseSlot() {
    if (!slotResult) {
      setIsModalOpen(false)
      return
    }

    setIsReservationActionPending(true)
    await releaseQueueSlot(slotResult)
    removeTicket(slotResult.drop.id, slotResult.optimization.slotNumber)
    setReservationState("released")
    setIsReservationActionPending(false)
  }

  async function handleReleaseAccountTicket(ticket: AccountTicket) {
    await releaseAccountTicket(ticket)
    removeTicket(ticket.dropId, ticket.slotNumber)
  }

  return (
    <>
      <section id="drops" className="section-shell py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Live Drops in Singapore
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Queue plans appear here only after live drop discovery returns results.
          </p>
        </motion.div>

        {isLoadingDrops ? (
          <div className="mt-12 rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6 text-sm text-[var(--text-secondary)]">
            Loading live drops...
          </div>
        ) : activeDrops.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeDrops.map((drop, index) => (
              <DropCard
                key={drop.id}
                drop={drop}
                index={index}
                onSecureSlot={handleSecureSlot}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6">
            <h3 className="font-display text-xl font-semibold text-white">
              No live drops loaded
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              QueueForMe is not showing demo product drops. Add `OPENAI_API_KEY` to
              `backend/.env` and restart the backend to enable live web discovery,
              or add verified drops to `backend/data/live_drops.json`.
            </p>
          </div>
        )}
      </section>

      <AccountTickets
        tickets={accountTickets}
        onReleaseTicket={handleReleaseAccountTicket}
      />

      <SecureSlotModal
        isOpen={isModalOpen}
        isLoading={isSecuring}
        isActionPending={isReservationActionPending}
        result={slotResult}
        reservationState={reservationState}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSlot}
        onRelease={handleReleaseSlot}
      />
    </>
  )

  function saveAccountTickets(nextTickets: AccountTicket[]) {
    setAccountTickets(nextTickets)
    window.localStorage.setItem(ACCOUNT_TICKETS_STORAGE_KEY, JSON.stringify(nextTickets))
  }

  function removeTicket(dropId: string, slotNumber: number) {
    saveAccountTickets(
      accountTickets.filter(
        (ticket) => ticket.dropId !== dropId || ticket.slotNumber !== slotNumber
      )
    )
  }
}

function toAccountTicket(result: SecureSlotResponse): AccountTicket {
  return {
    id: `${result.drop.id}-${result.optimization.slotNumber}`,
    dropId: result.drop.id,
    brand: result.drop.brand,
    dropName: result.drop.name,
    location: result.drop.location,
    slotNumber: result.optimization.slotNumber,
    arriveBy: result.optimization.arriveBy,
    leaveAt: result.optimization.leaveAt,
    transport: result.optimization.transport,
    weather: result.optimization.weather,
    sourceUrl: result.drop.sourceUrl,
    sourceLabel: result.drop.sourceLabel,
    confirmedAt: new Date().toISOString()
  }
}

function upsertTicket(tickets: AccountTicket[], nextTicket: AccountTicket) {
  return [
    nextTicket,
    ...tickets.filter((ticket) => ticket.id !== nextTicket.id)
  ]
}

function isAccountTicket(value: unknown): value is AccountTicket {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const ticket = value as AccountTicket
  return (
    typeof ticket.id === "string" &&
    typeof ticket.dropId === "string" &&
    typeof ticket.brand === "string" &&
    typeof ticket.dropName === "string" &&
    typeof ticket.location === "string" &&
    typeof ticket.slotNumber === "number" &&
    typeof ticket.arriveBy === "string" &&
    typeof ticket.leaveAt === "string" &&
    typeof ticket.transport === "string" &&
    typeof ticket.weather === "string" &&
    typeof ticket.confirmedAt === "string"
  )
}

async function getUserLocation(): Promise<UserLocation> {
  try {
    if (!("geolocation" in navigator)) {
      throw new Error("navigator.geolocation is not available")
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      })
    })

    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      source: "LIVE" as const
    }

    console.log("QueueForMe GPS acquired with navigator.geolocation [LIVE]", location)
    return location
  } catch (error) {
    const fallbackSource =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as GeolocationPositionError).code === 1
        ? "SIMULATED - permission denied"
        : "SIMULATED"

    const fallbackLocation = {
      ...SINGAPORE_FALLBACK_LOCATION,
      source: fallbackSource
    } satisfies UserLocation

    console.warn(
      `QueueForMe GPS unavailable; using central Singapore demo coordinates [${fallbackSource}]`,
      error
    )
    return fallbackLocation
  }
}
