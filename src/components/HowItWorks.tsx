"use client"

import { motion } from "framer-motion"

import { steps } from "@/lib/mock-data"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Four agents. One perfect arrival time.
        </h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Our AI runs automatically the moment you register.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-10 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.article
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {step.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
