import { useEffect } from "react";

const BRAND_NAME = "ScanMyCv";

/**
 * Custom hook to dynamically update document title.
 * @param {string} [title] - Page title prefix (e.g. "Dashboard", "Sign In")
 * @param {boolean} [full=false] - If true, uses title as-is without appending the brand name
 */
export function useDocumentTitle(title, full = false) {
  useEffect(() => {
    if (!title) {
      document.title = BRAND_NAME;
      return;
    }
    document.title = full ? title : `${title} · ${BRAND_NAME}`;
  }, [title, full]);
}
