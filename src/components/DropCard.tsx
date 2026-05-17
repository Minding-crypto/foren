"use client"

import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Drop } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DropCardProps {
  drop: Drop
  index: number
  onSecureSlot: (drop: Drop) => void
}

const statusLabel: Record<Drop["status"], string> = {
  hot: "HOT",
  filling: "FILLING",
  available: "AVAILABLE"
}

export function DropCard({ drop, index, onSecureSlot }: DropCardProps) {
  const currentSlot = drop.currentSlot
  const totalSlots = drop.totalSlots
  const hasCapacity =
    typeof currentSlot === "number" &&
    typeof totalSlots === "number" &&
    totalSlots > 0
  const progress = hasCapacity
    ? Math.min((currentSlot / totalSlots) * 100, 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Card className="h-full transition duration-200 hover:border-white/16">
        <CardContent className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {drop.brand}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                {drop.name}
              </h3>
            </div>
            <Badge variant={drop.status}>{statusLabel[drop.status]}</Badge>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
            {drop.location}
          </p>
          {drop.sourceUrl ? (
            <a
              href={drop.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-sm font-medium text-[var(--accent)] transition hover:text-white"
            >
              Source: {drop.sourceLabel ?? "Web search"}
            </a>
          ) : null}

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-[var(--text-secondary)]">
                Queue progress
              </span>
              <span className="font-medium text-[var(--text-primary)]">
                {hasCapacity ? `${currentSlot}/${totalSlots}` : "Source verified"}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[var(--bg-surface)]">
              <div
                className={cn(
                  "h-full rounded-full bg-[var(--accent)]",
                  hasCapacity && progress < 8 && "min-w-1"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-3">
              <p className="text-[var(--text-muted)]">Est. wait</p>
              <p className="mt-1 font-medium text-white">{drop.estimatedWait}</p>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-3">
              <p className="text-[var(--text-muted)]">Drop time</p>
              <p className="mt-1 font-medium text-white">{drop.dropTime}</p>
            </div>
          </div>

          <Button
            type="button"
            className="mt-7 w-full"
            onClick={() => onSecureSlot(drop)}
          >
            Secure My Slot -&gt;
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
