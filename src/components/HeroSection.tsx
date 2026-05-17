"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { getDrops } from "@/lib/api"
import type { Drop } from "@/lib/types"

export function HeroSection() {
  const [featuredDrop, setFeaturedDrop] = useState<Drop | null>(null)
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function loadFeaturedDrop() {
      const drops = await getDrops()

      if (!isMounted) {
        return
      }

      setActiveCount(drops.length)
      setFeaturedDrop(
        drops.find((drop) => drop.status === "hot") ?? drops[0] ?? null
      )
    }

    loadFeaturedDrop()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section
      id="top"
      className="section-shell grid min-h-screen items-center gap-14 pb-28 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h1 className="font-display text-[40px] font-semibold leading-[1.04] tracking-normal text-[var(--text-primary)] sm:text-5xl lg:text-[56px]">
          Never Queue Overnight Again.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/65 sm:text-xl">
          QueueForMe analyzes your location, transit options, and weather in
          real time - then tells you exactly when to leave for active drops.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#drops">Optimize My Queue</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#account">View Account</a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mx-auto w-full max-w-[430px]"
      >
        <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Featured live drop
            </p>
            <div className="rounded-lg border border-[var(--accent)]/35 bg-[var(--accent-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--accent)]">
              {activeCount > 0 ? `${activeCount} active` : "Loading"}
            </div>
          </div>

          {featuredDrop ? (
            <>
              <div className="mt-8 grid gap-2">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {featuredDrop.brand}
                </p>
                <h2 className="font-display text-3xl font-semibold leading-tight text-white">
                  {featuredDrop.name}
                </h2>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  {featuredDrop.location}
                </p>
              </div>

              <div className="mt-7 divide-y divide-[color:var(--border)] border-t border-[color:var(--border)]">
                <TicketRow label="Drop time" value={featuredDrop.dropTime} />
                <TicketRow label="Queue opens" value={featuredDrop.queueOpen} />
                <TicketRow label="Queue status" value={queueStatus(featuredDrop)} />
                <TicketRow label="Source" value={featuredDrop.sourceLabel ?? "Verified source"} />
              </div>

              <Button type="button" className="mt-6 w-full" asChild>
                <a href="#drops">Secure this drop</a>
              </Button>
            </>
          ) : (
            <div className="mt-8 rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-5">
              <p className="font-display text-xl font-semibold text-white">
                Loading live drops
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Pulling verified Singapore drops from the backend.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function TicketRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  )
}

function queueStatus(drop: Drop) {
  if (
    typeof drop.currentSlot === "number" &&
    typeof drop.totalSlots === "number" &&
    drop.totalSlots > 0
  ) {
    return `${drop.currentSlot}/${drop.totalSlots} available today`
  }

  return drop.estimatedWait
}
