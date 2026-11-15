import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollNavButton() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;

      setScrollY(currentScrollY);
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsNearBottom(totalHeight - currentScrollY < 120);
      setVisible(currentScrollY > 180);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-center"
          aria-label="Page scroll navigation"
        >
          {/* Glassmorphic Capsule */}
          <div className="relative flex flex-col items-center p-1.5 rounded-full bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--border)] shadow-lg hover:border-[var(--accent)]/40 transition-colors duration-300">
            {/* Scroll Up Button */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              disabled={scrollY < 120}
              aria-label="Scroll to top"
              title="Scroll to top"
              className={cn(
                "relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer outline-none",
                scrollY >= 120
                  ? "text-[var(--ink)] hover:text-[var(--accent-strong)] hover:bg-[var(--accent-soft)]"
                  : "opacity-30 cursor-not-allowed text-[var(--ink-muted)]"
              )}
            >
              <ChevronUp className="w-5 h-5 transition-transform duration-200" />
            </motion.button>

            {/* Subtle Divider with Progress Track */}
            <div className="relative w-5 my-1 flex items-center justify-center">
              <div className="w-4 h-[1px] bg-[var(--border)]" />
              {/* Active scroll indicator dot */}
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)] transition-all duration-150"
                style={{
                  opacity: scrollProgress > 0 ? 0.85 : 0.3,
                  boxShadow:
                    scrollProgress > 0
                      ? "0 0 6px var(--accent)"
                      : "none",
                }}
              />
            </div>

            {/* Scroll Down Button */}
            <motion.button
              type="button"
              onClick={scrollToBottom}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              disabled={isNearBottom}
              aria-label="Scroll to bottom"
              title="Scroll to bottom"
              className={cn(
                "relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer outline-none",
                !isNearBottom
                  ? "text-[var(--ink)] hover:text-[var(--accent-strong)] hover:bg-[var(--accent-soft)]"
                  : "opacity-30 cursor-not-allowed text-[var(--ink-muted)]"
              )}
            >
              <ChevronDown className="w-5 h-5 transition-transform duration-200" />
            </motion.button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default ScrollNavButton;
