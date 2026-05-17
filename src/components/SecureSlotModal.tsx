"use client"

import { Button } from "@/components/ui/button"
import type { SecureSlotResponse } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SecureSlotModalProps {
  isOpen: boolean
  isLoading: boolean
  result: SecureSlotResponse | null
  onClose: () => void
}

export function SecureSlotModal({
  isOpen,
  isLoading,
  result,
  onClose
}: SecureSlotModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="secure-slot-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close secure slot modal"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                QueueGod Agent
              </p>
              <h2
                id="secure-slot-title"
                className="mt-2 font-display text-3xl font-semibold text-white"
              >
                {isLoading ? "Securing your slot..." : "Slot secured"}
              </h2>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:border-[var(--accent)] hover:text-white"
              aria-label="Close modal"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          {isLoading ? (
            <div className="mt-8 space-y-4">
              <div className="h-1.5 w-24 rounded-full bg-[var(--accent)]" />
              <p className="text-sm leading-6 text-[var(--text-secondary)]">
                Checking GPS, OneMap routing, LTA data, weather, and slot state.
              </p>
            </div>
          ) : result ? (
            <div className="mt-7">
              <div className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-muted)]">
                      Your queue slot
                    </p>
                    <p className="font-mono text-6xl font-semibold leading-none text-white">
                      #{String(result.optimization.slotNumber).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--text-muted)]">
                      Arrive by
                    </p>
                    <p className="font-display text-2xl font-semibold text-[var(--accent)]">
                      {result.optimization.arriveBy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-[var(--text-secondary)]">
                <ModalRow label="Drop" value={`${result.drop.brand} ${result.drop.name}`} />
                <ModalRow label="Leave by" value={result.optimization.leaveAt} />
                <ModalRow label="Transport" value={result.optimization.transport} />
                <ModalRow label="Weather" value={result.optimization.weather} />
                <ModalRow
                  label="Confidence"
                  value={`${result.optimization.confidence}% on-time arrival`}
                />
              </div>

              <div className="mt-5 rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Agent Log
                </p>
                <div className="mt-3 space-y-2 font-mono text-xs leading-6 text-[var(--text-secondary)]">
                  {result.agentLog.map((entry) => (
                    <p key={entry}>
                      <AgentLogLine entry={entry} />
                    </p>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">
                {result.optimization.message}
              </p>

              <Button type="button" className="mt-6 w-full" onClick={onClose}>
                Got It
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] pb-3 last:border-b-0">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </span>
      <span className="text-right font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  )
}

function AgentLogLine({ entry }: { entry: string }) {
  const label = entry.includes("[LIVE]")
    ? "[LIVE]"
    : entry.includes("[SIMULATED]")
      ? "[SIMULATED]"
      : ""

  if (!label) {
    return <>{entry}</>
  }

  const [before, after] = entry.split(label)

  return (
    <>
      {before}
      <span
        className={cn(
          "font-semibold",
          label === "[LIVE]" ? "text-[var(--success)]" : "text-[var(--warning)]"
        )}
      >
        {label}
      </span>
      {after}
    </>
  )
}
