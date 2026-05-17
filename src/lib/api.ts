import type { AccountTicket, Drop, SecureSlotResponse, UserLocation } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

function buildApiUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured")
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export async function getDrops(): Promise<Drop[]> {
  try {
    const response = await fetch(buildApiUrl("/api/drops"), {
      headers: {
        Accept: "application/json"
      }
    })

    if (!response.ok) {
      throw new Error(`Drops request failed with ${response.status}`)
    }

    console.log("QueueForMe drops loaded from backend")
    return (await response.json()) as Drop[]
  } catch (error) {
    console.warn("QueueForMe drops request failed; showing no fake drops", error)
    return []
  }
}

export async function secureQueueSlot(
  drop: Drop,
  userLocation: UserLocation
): Promise<SecureSlotResponse> {
  try {
    console.log("Sending coords:", userLocation.latitude, userLocation.longitude)

    const response = await fetch(buildApiUrl("/api/optimize"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dropId: drop.id, userLocation })
    })

    if (!response.ok) {
      throw new Error(`Secure slot request failed with ${response.status}`)
    }

    console.log("QueueForMe secure-slot backend request succeeded [LIVE API path attempted]")
    return (await response.json()) as SecureSlotResponse
  } catch (error) {
    console.warn("QueueForMe secure-slot failed; returning unavailable result without fake data", error)

    return {
      drop,
      optimization: {
        slotNumber: 0,
        arriveBy: "Unavailable",
        leaveAt: "Unavailable",
        travelMinutes: 0,
        transport: "Live route unavailable",
        weather: "Live weather unavailable",
        confidence: 0,
        message: "QueueForMe could not complete live optimization for this drop."
      },
      agentLog: [
        `GPS acquired: ${userLocation.latitude.toFixed(4)} N, ${userLocation.longitude.toFixed(4)} E [${userLocation.source}]`,
        "OneMap route unavailable [SIMULATED]",
        "Weather unavailable [SIMULATED]",
        "Slot not assigned because live optimization failed [SIMULATED]"
      ]
    }
  }
}

export async function confirmQueueSlot(result: SecureSlotResponse): Promise<boolean> {
  try {
    const response = await fetch(buildApiUrl("/api/confirm-slot"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dropId: result.drop.id,
        slotNumber: result.optimization.slotNumber
      })
    })

    if (!response.ok) {
      throw new Error(`Confirm slot request failed with ${response.status}`)
    }

    console.log("QueueForMe slot confirmed [LIVE session state]")
    return true
  } catch (error) {
    console.warn("QueueForMe slot confirmation failed; keeping local confirmation state", error)
    return false
  }
}

export async function releaseQueueSlot(result: SecureSlotResponse): Promise<boolean> {
  return releaseTicketSlot(result.drop.id, result.optimization.slotNumber)
}

export async function releaseAccountTicket(ticket: AccountTicket): Promise<boolean> {
  return releaseTicketSlot(ticket.dropId, ticket.slotNumber)
}

async function releaseTicketSlot(dropId: string, slotNumber: number): Promise<boolean> {
  try {
    const response = await fetch(buildApiUrl("/api/release-slot"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dropId,
        slotNumber
      })
    })

    if (!response.ok) {
      throw new Error(`Release slot request failed with ${response.status}`)
    }

    console.log("QueueForMe slot released [LIVE session state]")
    return true
  } catch (error) {
    console.warn("QueueForMe slot release failed; closing local reservation view", error)
    return false
  }
}
