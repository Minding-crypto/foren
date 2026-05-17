"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

import { getDrops } from "@/lib/api"
import type { Drop } from "@/lib/types"
import { cn } from "@/lib/utils"

type RegionId = "orchard" | "dhoby" | "changi"

interface VenueGroup {
  id: string
  label: string
  regionId: RegionId
  location: string
  drops: Drop[]
  x: number
  y: number
}

const REGIONS: Array<{
  id: RegionId
  name: string
  area: string
  x: number
  width: number
}> = [
  { id: "dhoby", name: "Dhoby Ghaut", area: "City centre", x: 16, width: 22 },
  { id: "orchard", name: "Orchard", area: "Retail core", x: 39, width: 24 },
  { id: "changi", name: "Changi", area: "Airport east", x: 66, width: 20 }
]

const REGION_DOTS: Record<RegionId, { x: number; y: number }> = {
  dhoby: { x: 28, y: 50 },
  orchard: { x: 51, y: 38 },
  changi: { x: 78, y: 58 }
}

export function SingaporeDropMap() {
  const [drops, setDrops] = useState<Drop[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadDrops() {
      const nextDrops = await getDrops()

      if (isMounted) {
        setDrops(nextDrops)
      }
    }

    loadDrops()

    return () => {
      isMounted = false
    }
  }, [])

  const venueGroups = useMemo(() => buildVenueGroups(drops), [drops])
  const regionSummaries = useMemo(
    () => REGIONS.map((region) => ({
      ...region,
      count: venueGroups
        .filter((group) => group.regionId === region.id)
        .reduce((sum, group) => sum + group.drops.length, 0)
    })),
    [venueGroups]
  )

  return (
    <section id="map" className="section-shell py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Singapore coverage
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Where drops are happening
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            A clean venue board grouped by the Singapore areas that matter for queue planning.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.3)] sm:p-6">
            <div className="relative min-h-[480px] overflow-hidden rounded-xl border border-[color:var(--border)] bg-[#11131A]">
              <div className="absolute inset-x-6 top-8 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                <span>West</span>
                <span>Central</span>
                <span>East</span>
              </div>

              <div className="absolute left-6 right-6 top-[86px] h-[104px] rounded-xl border border-white/10 bg-white/[0.03]">
                {REGIONS.map((region) => (
                  <div
                    key={region.id}
                    className="absolute top-0 h-full border-x border-white/10 bg-white/[0.02]"
                    style={{ left: `${region.x}%`, width: `${region.width}%` }}
                  >
                    <div className="p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        {region.area}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold text-white">
                        {region.name}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-white/25" />
              </div>

              <div className="absolute left-6 right-6 top-[238px] h-[188px] rounded-xl border border-white/10 bg-[var(--bg-surface)]">
                <div className="absolute inset-x-5 top-1/2 h-px bg-white/20" />
                <div className="absolute left-[28%] top-0 h-full w-px bg-white/10" />
                <div className="absolute left-[51%] top-0 h-full w-px bg-white/10" />
                <div className="absolute left-[78%] top-0 h-full w-px bg-white/10" />

                {venueGroups.map((group, index) => (
                  <VenueMarker key={group.id} group={group} index={index + 1} />
                ))}
              </div>

              <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
                {regionSummaries.map((region) => (
                  <div
                    key={region.id}
                    className="rounded-xl border border-white/10 bg-black/10 p-4"
                  >
                    <p className="font-display text-xl font-semibold text-white">
                      {region.count}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {region.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Active venues
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-white">
                  {venueGroups.length}
                </p>
              </div>
              <div className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white">
                Live
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {venueGroups.map((group, index) => (
                <a
                  key={group.id}
                  href="#drops"
                  className="grid rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-3 transition hover:border-white/20"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")} / {regionName(group.regionId)}
                  </span>
                  <span className="mt-1 text-sm font-medium text-white">
                    {group.label}
                  </span>
                  <span className="mt-1 text-xs text-[var(--text-muted)]">
                    {group.drops.length} {group.drops.length === 1 ? "drop" : "drops"}
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  )
}

function VenueMarker({ group, index }: { group: VenueGroup; index: number }) {
  const lineTarget = REGIONS.find((region) => region.id === group.regionId)
  const lineX = lineTarget ? lineTarget.x + lineTarget.width / 2 : group.x

  return (
    <div
      className="absolute"
      style={{ left: `${group.x}%`, top: `${group.y}%` }}
    >
      <div
        className="absolute h-px origin-left bg-white/30"
        style={{
          width: `${Math.abs(group.x - lineX) * 3.2}px`,
          transform: group.x > lineX ? "translateX(-100%)" : "translateX(0)"
        }}
      />
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-[#11131A] font-mono text-sm font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
          aria-label={`${regionName(group.regionId)} marker ${index}`}
          title={`${index}. ${group.label}`}
        >
          ({index})
        </div>
      </div>
    </div>
  )
}

function buildVenueGroups(drops: Drop[]): VenueGroup[] {
  const groups = new Map<string, Drop[]>()

  drops.forEach((drop) => {
    const key = venueKey(drop.location)
    groups.set(key, [...(groups.get(key) ?? []), drop])
  })

  return Array.from(groups.entries()).map(([location, groupedDrops]) => {
    const regionId = regionForLocation(location)
    const base = REGION_DOTS[regionId]
    const indexInRegion = Array.from(groups.keys())
      .filter((key) => regionForLocation(key) === regionId)
      .indexOf(location)
    const stagger = (indexInRegion % 3) - 1

    return {
      id: location,
      label: venueLabel(location),
      regionId,
      location,
      drops: groupedDrops,
      x: base.x + stagger * 5,
      y: base.y + indexInRegion * 12
    }
  })
}

function venueKey(location: string) {
  const lower = location.toLowerCase()

  if (lower.includes("changi airport terminal 3")) {
    return "Changi Airport Terminal 3"
  }

  if (lower.includes("changi airport terminal 2")) {
    return "Changi Airport Terminal 2"
  }

  if (lower.includes("ion orchard")) {
    return "ION Orchard"
  }

  if (lower.includes("ngee ann")) {
    return "Ngee Ann City"
  }

  if (lower.includes("orchard central")) {
    return "Orchard Central"
  }

  if (lower.includes("plaza singapura")) {
    return "Plaza Singapura"
  }

  return location
}

function venueLabel(location: string) {
  return location
}

function regionForLocation(location: string): RegionId {
  const lower = location.toLowerCase()

  if (lower.includes("changi")) {
    return "changi"
  }

  if (lower.includes("plaza singapura")) {
    return "dhoby"
  }

  return "orchard"
}

function regionName(regionId: RegionId) {
  return REGIONS.find((region) => region.id === regionId)?.name ?? "Central"
}
