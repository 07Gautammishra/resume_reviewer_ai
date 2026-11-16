import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({ checked, onChange, onCheckedChange, className, label, id }) {
  const handleChange = () => {
    const next = !checked;
    if (onChange) onChange(next);
    if (onCheckedChange) onCheckedChange(next);
  };

  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={handleChange}
      className={cn(
        "inline-flex items-center gap-2 select-none focus-visible:outline-none cursor-pointer group text-left",
        className
      )}
    >
      <span
        className={cn(
          "h-4 w-4 rounded-md border flex items-center justify-center transition-colors shrink-0",
          checked
            ? "bg-emerald-600 border-emerald-600 text-white"
            : "bg-surface-card border-border hover:border-ink-muted text-transparent"
        )}
      >
        <Check size={11} strokeWidth={3} />
      </span>
      {label && (
        <span className="text-xs text-ink-muted group-hover:text-ink transition-colors font-medium">
          {label}
        </span>
      )}
    </button>
  );
}
