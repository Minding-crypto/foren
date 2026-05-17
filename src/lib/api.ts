import { drops, mockQueueOptimization } from "@/lib/mock-data"
import type { Drop, SecureSlotResponse, UserLocation } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

function buildApiUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured")
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

function findMockDrop(dropId: string) {
  return drops.find((drop) => drop.id === dropId) ?? drops[0]
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

    console.log("QueueGod drops loaded from backend [LIVE if backend has live_drops.json]")
    return (await response.json()) as Drop[]
  } catch (error) {
    console.warn("QueueGod drops fallback to hardcoded Singapore mock data [SIMULATED]", error)
    return drops
  }
}

export async function secureQueueSlot(
  dropId: string,
  userLocation: UserLocation
): Promise<SecureSlotResponse> {
  try {
    const response = await fetch(buildApiUrl("/api/secure-slot"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dropId, userLocation })
    })

    if (!response.ok) {
      throw new Error(`Secure slot request failed with ${response.status}`)
    }

    console.log("QueueGod secure-slot backend request succeeded [LIVE API path attempted]")
    return (await response.json()) as SecureSlotResponse
  } catch (error) {
    console.warn("QueueGod secure-slot fallback to Singapore mock optimization [SIMULATED]", error)
    const drop = findMockDrop(dropId)

    return {
      drop,
      optimization: {
        ...mockQueueOptimization,
        slotNumber: drop.currentSlot,
        message: `Demo mode secured slot #${drop.currentSlot} for ${drop.brand} ${drop.name}.`
      },
      agentLog: [
        `GPS acquired: ${userLocation.latitude.toFixed(4)} N, ${userLocation.longitude.toFixed(4)} E [${userLocation.source}]`,
        "OneMap route: 28 min via Circle Line [SIMULATED]",
        "LTA nearest stop: Orchard Station [SIMULATED]",
        "Weather at ION Orchard: Light rain [SIMULATED]",
        `Slot #${String(drop.currentSlot).padStart(2, "0")} assigned [SIMULATED] fallback`
      ]
    }
  }
}
