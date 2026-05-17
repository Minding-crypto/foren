"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import type { SecureSlotResponse } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SecureSlotModalProps {
  isOpen: boolean
  isLoading: boolean
  isActionPending: boolean
  result: SecureSlotResponse | null
  reservationState: "review" | "confirmed" | "released"
  onClose: () => void
  onConfirm: () => void
  onRelease: () => void
}

export function SecureSlotModal({
  isOpen,
  isLoading,
  isActionPending,
  result,
  reservationState,
  onClose,
  onConfirm,
  onRelease
}: SecureSlotModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--bg-primary)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="secure-slot-title"
    >
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] pb-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                QueueForMe Agent
              </p>
              <h2
                id="secure-slot-title"
                className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl"
              >
                {isLoading ? "Securing your slot..." : titleForState(reservationState)}
              </h2>
            </div>
            <Button type="button" variant="outline" onClick={onClose}>
              Back to drops
            </Button>
          </header>

          {isLoading ? (
            <LoadingState />
          ) : result ? (
            <ReservationResult
              result={result}
              reservationState={reservationState}
              isActionPending={isActionPending}
              onClose={onClose}
              onConfirm={onConfirm}
              onRelease={onRelease}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="grid flex-1 place-items-center py-20">
      <div className="w-full max-w-xl rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-8">
        <div className="h-1.5 w-24 rounded-full bg-[var(--accent)]" />
        <h3 className="mt-8 font-display text-2xl font-semibold text-white">
          Running live checks
        </h3>
        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
          Checking GPS, OneMap routing, weather, and session slot state.
        </p>
      </div>
    </div>
  )
}

function ReservationResult({
  result,
  reservationState,
  isActionPending,
  onClose,
  onConfirm,
  onRelease
}: {
  result: SecureSlotResponse
  reservationState: "review" | "confirmed" | "released"
  isActionPending: boolean
  onClose: () => void
  onConfirm: () => void
  onRelease: () => void
}) {
  const isReleased = reservationState === "released"
  const isConfirmed = reservationState === "confirmed"

  return (
    <div className="grid flex-1 gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <section className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
        <StatusBanner state={reservationState} />

        <div className="mt-8 rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Your queue slot
              </p>
              <p className="font-mono text-7xl font-semibold leading-none text-white sm:text-8xl">
                #{String(result.optimization.slotNumber).padStart(2, "0")}
              </p>
            </div>
            <div className="pb-1 text-right">
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Arrive by
              </p>
              <p className="font-display text-3xl font-semibold text-[var(--accent)]">
                {result.optimization.arriveBy}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-[var(--text-secondary)]">
          <ResultRow label="Drop" value={`${result.drop.brand} ${result.drop.name}`} />
          <ResultRow label="Location" value={result.drop.location} />
          <ResultRow label="Leave by" value={result.optimization.leaveAt} />
          <ResultRow label="Transport" value={result.optimization.transport} />
          <ResultRow label="Weather" value={result.optimization.weather} />
          <ResultRow
            label="Confidence"
            value={`${result.optimization.confidence}% on-time arrival`}
          />
        </div>

        {result.drop.sourceUrl ? (
          <a
            href={result.drop.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex text-sm font-medium text-[var(--accent)] transition hover:text-white"
          >
            Source: {result.drop.sourceLabel ?? "Verified source"}
          </a>
        ) : null}
      </section>

      <section className="flex min-h-full flex-col rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Agent Log
          </p>
          <div className="mt-4 max-h-[44vh] space-y-3 overflow-y-auto rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-4 font-mono text-xs leading-6 text-[var(--text-secondary)] sm:max-h-[52vh]">
            {result.agentLog.map((entry) => (
              <p key={entry}>
                <AgentLogLine entry={entry} />
              </p>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-[var(--text-secondary)]">
          {result.optimization.message}
        </p>

        <div className="mt-auto pt-8">
          {isReleased ? (
            <Button type="button" className="w-full" onClick={onClose}>
              Back to live drops
            </Button>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                disabled={isActionPending || isConfirmed}
                onClick={onConfirm}
              >
                {isConfirmed ? "Spot locked in" : "Lock in spot"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isActionPending}
                onClick={onRelease}
              >
                Give up ticket
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function StatusBanner({ state }: { state: "review" | "confirmed" | "released" }) {
  const content = {
    review: {
      label: "Review your reservation",
      text: "This slot is being held in the current session. Lock it in or release it.",
      className: "border-[var(--accent)]/35 bg-[var(--accent-subtle)] text-[var(--accent)]"
    },
    confirmed: {
      label: "Spot locked in",
      text: "Your queue slot is confirmed for this session.",
      className: "border-[var(--success)]/35 bg-emerald-500/10 text-[var(--success)]"
    },
    released: {
      label: "Ticket released",
      text: "This slot has been returned and can be assigned again.",
      className: "border-[var(--warning)]/35 bg-amber-500/10 text-[var(--warning)]"
    }
  }[state]

  return (
    <div className={cn("rounded-xl border p-4", content.className)}>
      <p className="font-display text-lg font-semibold">{content.label}</p>
      <p className="mt-1 text-sm opacity-90">{content.text}</p>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-b border-[color:var(--border)] pb-3 last:border-b-0 sm:grid-cols-[140px_1fr]">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </span>
      <span className="font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  )
}

function titleForState(state: "review" | "confirmed" | "released") {
  if (state === "confirmed") {
    return "Reservation confirmed"
  }

  if (state === "released") {
    return "Ticket released"
  }

  return "Review your queue slot"
}

function AgentLogLine({ entry }: { entry: string }) {
  const label = entry.includes("[LIVE]")
    ? "[LIVE]"
    : entry.includes("[SIMULATED - permission denied]")
      ? "[SIMULATED - permission denied]"
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
