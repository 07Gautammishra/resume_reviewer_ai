import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const SEV_TONE = { low: "neutral", medium: "warning", midium: "warning", high: "danger" };

const SEV_ICON_STYLE = {
  high: "bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/30",
  medium: "bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30",
  midium: "bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30",
  low: "bg-[var(--accent-soft)] text-[var(--accent-strong)] border border-[var(--accent)]/25",
};

function IssueItem({ issue }) {
  const [open, setOpen] = useState(false);
  const normalizedSeverity = (issue.severity === "midium" ? "medium" : issue.severity) || "medium";
  const iconStyle = SEV_ICON_STYLE[issue.severity] || SEV_ICON_STYLE.medium;

  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full text-left rounded-2xl bg-[var(--surface-2)] hover:bg-[var(--surface-2)]/80 border border-[var(--border)] p-4 transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors", iconStyle)}>
          <AlertCircle size={16} strokeWidth={2.2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="font-medium text-sm text-[var(--ink)]">{issue.title}</div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge tone={SEV_TONE[issue.severity] || "warning"}>
                {normalizedSeverity}
              </Badge>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={cn(
                  "text-[var(--ink-muted)] transition-transform",
                  open && "rotate-180"
                )}
              />
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="text-xs text-[var(--ink-muted)] mt-2">
                  {issue.explanation}
                </div>
                {issue.fix && (
                  <div className="mt-2 text-xs rounded-xl bg-[var(--accent-soft)] text-[var(--accent-strong)] px-3 py-2">
                    <strong className="font-semibold">Fix:</strong> {issue.fix}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </button>
  );
}

export function IssuesList({ issues }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">Top Issues</CardTitle>
          <CardDescription className="mt-1">
            What to fix first, ranked by impact
          </CardDescription>
        </div>
        <Badge tone="neutral">{issues.length}</Badge>
      </CardHeader>
      <div className="space-y-2">
        {issues.map((issue, i) => (
          <IssueItem key={i} issue={issue} />
        ))}
      </div>
    </Card>
  );
}
