import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n, opts = {}) {
  return new Intl.NumberFormat("en-US", opts).format(n);
}

export function relativeTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString();
}

/**
 * Robust cross-browser clipboard copy with legacy fallback.
 * Works across desktop, mobile Safari, in-app WebViews, and sandboxes.
 * @param {string} text - Content to copy
 * @returns {Promise<boolean>} - Whether copy succeeded
 */
export async function copyToClipboard(text) {
  if (!text) return false;

  // 1. Modern navigator.clipboard API (requires secure context)
  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback below on permission failure
    }
  }

  // 2. Fallback for mobile webviews, HTTP local testing, or restrictive sandboxes
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Computes a high-performance word-level LCS diff between original and rewritten text.
 * @param {string} original - Base text
 * @param {string} rewritten - Transformed text
 * @returns {Array<{type: 'same' | 'add' | 'remove', value: string}>}
 */
export function diffWords(original = "", rewritten = "") {
  const origTokens = (original || "").trim().split(/\s+/).filter(Boolean);
  const rewTokens = (rewritten || "").trim().split(/\s+/).filter(Boolean);

  const m = origTokens.length;
  const n = rewTokens.length;

  if (m === 0) return rewTokens.map((w) => ({ type: "add", value: w }));
  if (n === 0) return origTokens.map((w) => ({ type: "remove", value: w }));

  // Word normalization regex for punctuation-resilient matching
  const norm = (w) => (w || "").toLowerCase().replace(/[^\w]/g, "");

  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (norm(origTokens[i - 1]) === norm(rewTokens[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m;
  let j = n;
  const result = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && norm(origTokens[i - 1]) === norm(rewTokens[j - 1])) {
      result.unshift({ type: "same", value: rewTokens[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "add", value: rewTokens[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({ type: "remove", value: origTokens[i - 1] });
      i--;
    }
  }

  return result;
}
