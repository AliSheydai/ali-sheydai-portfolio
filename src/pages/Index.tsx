import { useRef } from "react";
import { useInView } from "framer-motion";
import { HeroSection } from "@/components/ui/hero-section";
import { HorizontalGallery } from "@/components/ui/horizontal-gallery";
import { SiteHeader } from "@/components/ui/site-header";

const Index = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { margin: "100% 0px 100% 0px" });

  return (
    <div
      className="min-h-screen"
      style={{
        color: "var(--hero-paragraphs)",
        fontFamily: "'Host Grotesk', sans-serif",
        fontSize: 18,
        lineHeight: "170%",
        letterSpacing: "0.35px",
      }}
    >
      <SiteHeader />
      <HeroSection gridInView={gridInView} />
      <div ref={gridRef}>
        <HorizontalGallery />
      </div>
    </div>
  );
};

export default Index;
