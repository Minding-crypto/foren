"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let previousY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      setIsVisible(currentY < 24 || currentY < previousY)
      previousY = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(15,17,23,0.86)] backdrop-blur-md transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="section-shell flex h-[72px] items-center justify-between py-4">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-normal text-[var(--text-primary)]"
          aria-label="QueueGod home"
        >
          QueueGod
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-white"
          >
            How it works
          </a>
          <Button asChild>
            <a href="#drops">Get Early Access</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition hover:border-[var(--accent)] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition",
                isOpen && "top-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition",
                isOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition",
                isOpen && "bottom-2 -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      <div
        className={cn(
          "grid border-t border-white/10 transition-all duration-300 md:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="section-shell grid gap-3 py-4">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[var(--text-secondary)]"
              onClick={() => setIsOpen(false)}
            >
              How it works
            </a>
            <Button asChild className="w-full">
              <a href="#drops" onClick={() => setIsOpen(false)}>
                Get Early Access
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
