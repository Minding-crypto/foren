"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { DropCard } from "@/components/DropCard"
import { SecureSlotModal } from "@/components/SecureSlotModal"
import { getDrops, secureQueueSlot } from "@/lib/api"
import { drops } from "@/lib/mock-data"
import type { Drop, SecureSlotResponse, UserLocation } from "@/lib/types"

const SINGAPORE_FALLBACK_LOCATION: UserLocation = {
  latitude: 1.3521,
  longitude: 103.8198,
  source: "SIMULATED"
}

export function DropsGrid() {
  const [activeDrops, setActiveDrops] = useState<Drop[]>(drops)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSecuring, setIsSecuring] = useState(false)
  const [slotResult, setSlotResult] = useState<SecureSlotResponse | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadDrops() {
      const nextDrops = await getDrops()

      if (isMounted) {
        setActiveDrops(nextDrops)
      }
    }

    loadDrops()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleSecureSlot(dropId: string) {
    setIsModalOpen(true)
    setIsSecuring(true)
    setSlotResult(null)

    const userLocation = await getUserLocation()
    const result = await secureQueueSlot(dropId, userLocation)
    setSlotResult(result)
    setIsSecuring(false)
  }

  return (
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
          AI is actively optimizing queues for these releases.
        </p>
      </motion.div>

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

      <SecureSlotModal
        isOpen={isModalOpen}
        isLoading={isSecuring}
        result={slotResult}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
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

    console.log("QueueGod GPS acquired with navigator.geolocation [LIVE]", location)
    return location
  } catch (error) {
    console.warn(
      "QueueGod GPS unavailable; using central Singapore demo coordinates [SIMULATED]",
      error
    )
    return SINGAPORE_FALLBACK_LOCATION
  }
}
