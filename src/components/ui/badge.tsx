import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.08em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-[var(--accent)]/40 bg-transparent text-[var(--accent)]",
        hot: "border-[var(--danger)]/45 bg-transparent text-[var(--danger)]",
        filling: "border-[var(--warning)]/45 bg-transparent text-[var(--warning)]",
        available: "border-[var(--success)]/45 bg-transparent text-[var(--success)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
