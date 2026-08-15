import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { PRIORITY_IMAGES, DEFERRED_IMAGES } from "@/lib/image-manifest";

// ---------------------------------------------------------------------------
// Animated number counter — smoothly counts from 0 to target
// ---------------------------------------------------------------------------
function AnimatedCounter({ value }: { value: number }) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const target = value;
    const duration = 400; // ms
    const start = currentRef.current;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = Math.round(start + (target - start) * eased);
      currentRef.current = current;
      if (displayRef.current) {
        displayRef.current.textContent = String(current).padStart(3, "0");
      }
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <span ref={displayRef} style={{ fontVariantNumeric: "tabular-nums" }}>
      000
    </span>
  );
}

// ---------------------------------------------------------------------------
// Preloader component
// ---------------------------------------------------------------------------
interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const { progress, isReady } = useImagePreloader(PRIORITY_IMAGES, DEFERRED_IMAGES);

  // Notify parent when exit animation completes
  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isReady && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--hero-red, #9b2b34)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Big percentage counter */}
          <div
            style={{
              fontFamily: "'Host Grotesk', sans-serif",
              color: "rgba(255,255,255,0.92)",
              display: "flex",
              alignItems: "baseline",
              gap: 4,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontSize: "clamp(5rem, 18vw, 14rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              <AnimatedCounter value={progress} />
            </span>
            <span
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                fontWeight: 400,
                opacity: 0.6,
                letterSpacing: "-0.02em",
              }}
            >
              %
            </span>
          </div>

          {/* Thin progress line at the bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.85)",
                transformOrigin: "left center",
                scaleX: progress / 100,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
