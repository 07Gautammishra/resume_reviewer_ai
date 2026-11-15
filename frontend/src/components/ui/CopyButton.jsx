import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard, cn } from "@/lib/utils";

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
  className = "",
  showText = false,
  size = 12,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className={cn(
        "inline-flex items-center gap-1.5 transition-all cursor-pointer select-none outline-none font-medium",
        copied
          ? "text-[var(--accent-strong)] bg-[var(--accent-soft)]"
          : "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)]",
        className
      )}
    >
      {copied ? (
        <Check size={size} className="shrink-0 stroke-[2.8] text-[var(--accent-strong)]" />
      ) : (
        <Copy size={size} className="shrink-0 stroke-[2]" />
      )}
      {showText && (
        <span className="text-[11px] font-medium leading-none">
          {copied ? copiedLabel : label}
        </span>
      )}
    </button>
  );
}
