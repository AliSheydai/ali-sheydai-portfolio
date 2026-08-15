import { useState, useEffect, useRef } from "react";

interface PreloaderState {
  progress: number;  // 0–100
  isReady: boolean;
}

/**
 * Preloads a list of images concurrently.
 * Priority images are tracked for the progress bar.
 * Deferred images are kicked off immediately but don't affect progress.
 */
export function useImagePreloader(
  priorityImages: string[],
  deferredImages: string[] = [],
): PreloaderState {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (priorityImages.length === 0) {
      setProgress(100);
      setIsReady(true);
      return;
    }

    let loaded = 0;
    const total = priorityImages.length;

    const loadImage = (src: string): Promise<void> =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = img.onerror = () => {
          if (!mountedRef.current) return;
          loaded++;
          // Smooth progress: update percentage as each image completes
          const pct = Math.round((loaded / total) * 100);
          setProgress(pct);
          if (loaded >= total) {
            setIsReady(true);
          }
          resolve();
        };
        img.src = src;
      });

    // Kick off priority loads in parallel
    Promise.all(priorityImages.map(loadImage)).catch(() => {
      // Even on errors, mark ready so the site doesn't hang
      if (mountedRef.current) {
        setProgress(100);
        setIsReady(true);
      }
    });

    // Deferred: fire-and-forget so browser caches them in the background
    deferredImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    return () => {
      mountedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progress, isReady };
}
