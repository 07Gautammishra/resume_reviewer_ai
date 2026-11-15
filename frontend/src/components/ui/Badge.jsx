import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight tabular",
  {
    variants: {
      tone: {
        neutral: "bg-[var(--surface-2)] text-[var(--ink-muted)] border border-[var(--border)]",
        accent: "bg-[var(--accent-soft)] text-[var(--accent-strong)] border border-[var(--accent)]/20",
        success: "bg-[var(--accent-soft)] text-[var(--success)] border border-[var(--success)]/20",
        warning: "bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/25 font-semibold",
        danger: "bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/25 font-semibold",
        ink: "bg-[var(--ink)] text-[var(--bg)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export function Badge({ className, tone, ...props }) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };
