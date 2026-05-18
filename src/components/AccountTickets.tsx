"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import type { AccountTicket } from "@/lib/types"

interface AccountTicketsProps {
  tickets: AccountTicket[]
  onReleaseTicket: (ticket: AccountTicket) => void
}

export function AccountTickets({ tickets, onReleaseTicket }: AccountTicketsProps) {
  return (
    <section id="account" className="section-shell pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h2 className="font-display text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Account
        </h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Your locked queue tickets for this browser.
        </p>
      </motion.div>

      {tickets.length > 0 ? (
        <div className="mt-12 grid gap-5">
          {tickets.map((ticket) => (
            <article
              key={ticket.id}
              className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            >
              <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Slot
                  </p>
                  <p className="font-mono text-5xl font-semibold leading-none text-white">
                    #{String(ticket.slotNumber).padStart(2, "0")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {ticket.brand}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {ticket.dropName}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {ticket.location}
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                    <TicketFact label="Arrive by" value={ticket.arriveBy} />
                    <TicketFact label="Leave by" value={ticket.leaveAt} />
                    <TicketFact label="Transport" value={ticket.transport} />
                    <TicketFact label="Weather" value={ticket.weather} />
                  </div>
                  {ticket.sourceUrl ? (
                    <a
                      href={ticket.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-medium text-[var(--accent)] transition hover:text-white"
                    >
                      Source: {ticket.sourceLabel ?? "Verified source"}
                    </a>
                  ) : null}
                </div>

                <div className="grid gap-3">
                  <p className="rounded-lg border border-[var(--success)]/35 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-[var(--success)]">
                    Locked in
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onReleaseTicket(ticket)}
                  >
                    Give up ticket
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="font-display text-xl font-semibold text-white">
            No locked tickets yet
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            Secure a live drop, then press &quot;Lock in spot&quot; to save it here.
          </p>
        </div>
      )}
    </section>
  )
}

function TicketFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-surface)] p-3">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </p>
      <p className="mt-1 font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  )
}
