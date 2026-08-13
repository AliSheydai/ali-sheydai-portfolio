import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artworks, type Artwork } from "@/lib/artworks";
import TiltedCard from "@/components/ui/tilted-card";


gsap.registerPlugin(ScrollTrigger);

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

function Slide({
  art,
  index,
  active,
  priority,
}: {
  art: Artwork;
  index: number;
  active: boolean;
  priority: boolean;
}) {
  return (
    <Link
      to={`/artwork/${art.slug}`}
      className="gallery-slide block shrink-0"
      style={{ scrollSnapAlign: "center" }}
      aria-label={art.title}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          width: "100%",
          willChange: "transform, opacity",
          transform: active ? "scale(1)" : "scale(0.92)",
          opacity: active ? 1 : 0.45,
          transition: `transform 500ms ${EASE}, opacity 500ms ${EASE}`,
        }}
      >
        <TiltedCard
          imageSrc={art.image}
          altText={`${art.title} — ${art.medium}`}
          captionText={`${art.title} · ${art.medium}`}
          containerWidth="100%"
          containerHeight="100%"
          imageWidth="100%"
          imageHeight="100%"
          rotateAmplitude={10}
          scaleOnHover={1.04}
          showMobileWarning={false}
          showTooltip
          loading={priority ? "eager" : "lazy"}
          displayOverlayContent
          overlayContent={
            <span
              className="hidden sm:inline-block"
              style={{
                margin: 20,
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,0.9)",
                color: "var(--hero-dark)",
                opacity: active ? 1 : 0,
                transition: `opacity 400ms ${EASE}`,
              }}
            >
              View project
            </span>
          }
        />
      </div>

      <div
        style={{
          marginTop: 18,
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 500ms ${EASE}, transform 500ms ${EASE}`,
        }}
      >
        <h3 style={{ fontSize: 22, lineHeight: 1.3, color: "var(--hero-dark)" }}>
          <span style={{ opacity: 0.5, marginRight: 12, fontSize: 15 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          {art.title}
        </h3>
        <p style={{ fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>
          {art.medium} · {art.year}
        </p>
      </div>
    </Link>
  );
}

function ProgressBar({ progress, count, activeIndex }: { progress: number; count: number; activeIndex: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: "min(420px, 70vw)",
      }}
    >
      <span style={{ fontSize: 13, letterSpacing: "0.08em" }}>
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <div style={{ flex: 1, height: 2, background: "var(--hero-border)", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "left center",
            transform: `scaleX(${Math.min(1, Math.max(0.02, progress))})`,
            background: "var(--hero-red)",
            willChange: "transform",
          }}
        />
      </div>
      <span style={{ fontSize: 13, letterSpacing: "0.08em" }}>{String(count).padStart(2, "0")}</span>
    </div>
  );
}

const MOBILE_QUERY = "(max-width: 767px)";

function useIsMobileSync() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

export function HorizontalGallery() {
  const isMobile = useIsMobileSync();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Desktop: pinned horizontal scroll-jacking
  useLayoutEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;

    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActiveIndex(Math.round(self.progress * (artworks.length - 1)));
          },
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  // Mobile: scroll-snap carousel active detection
  useEffect(() => {
    if (!isMobile) return;
    // Ensure no desktop pin-spacing height is left reserved on mobile
    ScrollTrigger.getAll().forEach((t) => t.kill(true));
    ScrollTrigger.refresh();
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = el.scrollWidth - el.clientWidth;
        const p = max > 0 ? el.scrollLeft / max : 0;
        setProgress(p);
        setActiveIndex(Math.round(p * (artworks.length - 1)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const isPriority = (i: number) => Math.abs(i - activeIndex) <= 1;

  if (isMobile) {
    return (
      <section style={{ position: "relative", padding: "12vw 0 90px" }} aria-label="Selected works">
        <div
          ref={scrollerRef}
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "0 12vw",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {artworks.map((art, i) => (
            <div key={art.id} style={{ width: "76vw", flex: "0 0 auto" }}>
              <Slide art={art} index={i} active={i === activeIndex} priority={isPriority(i)} />
            </div>
          ))}
        </div>
        <ProgressBar progress={progress} count={artworks.length} activeIndex={activeIndex} />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      aria-label="Selected works"
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "6vw",
          padding: "0 15vw",
          willChange: "transform",
        }}
      >
        {artworks.map((art, i) => (
          <div key={art.id} style={{ width: "68vw", flex: "0 0 auto" }}>
            <Slide art={art} index={i} active={i === activeIndex} priority={isPriority(i)} />
          </div>
        ))}
      </div>
      <ProgressBar progress={progress} count={artworks.length} activeIndex={activeIndex} />
    </section>
  );
}
