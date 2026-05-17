"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function HeroSection() {
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
          QueueGod&apos;s AI agents analyze your location, MRT timings, and weather
          in real-time - then secure your queue slot and tell you exactly when to
          leave. You just show up.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#drops">Optimize My Queue</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </div>
        <p className="mt-6 text-sm font-medium text-[var(--text-secondary)]">
          2,400+ Singaporeans already queue smarter
        </p>
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
              Your queue slot
            </p>
            <div className="rounded-lg border border-[var(--accent)]/35 bg-[var(--accent-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--accent)]">
              AI Secured
            </div>
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-6">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Position</p>
              <p className="font-mono text-7xl font-semibold leading-none text-white">
                #07
              </p>
            </div>
            <div className="pb-1 text-right">
              <p className="text-sm font-medium text-[var(--text-muted)]">Arrive by</p>
              <p className="font-display text-2xl font-semibold text-[var(--accent)]">
                09:45 AM
              </p>
            </div>
          </div>

          <div className="mt-7 divide-y divide-[color:var(--border)] border-t border-[color:var(--border)]">
            <TicketRow label="Drop" value="Swatch Royal Pop - ION Orchard" />
            <TicketRow label="Transport" value="Circle Line to Orchard, 4 min wait" />
            <TicketRow label="Weather" value="Light rain - umbrella advised" />
          </div>
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
