import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { artworks, type Artwork } from "@/lib/artworks";

const COL_1_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const COL_2_IDS = [10, 11, 12, 13, 14, 15, 16, 17];
const COL_3_IDS = [18, 19, 20, 21, 22, 23, 24, 25];

const getByIds = (ids: number[]) => ids.map((id) => artworks.find((a) => a.id === id)!);

function FadeUpOnScroll({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0, margin: "100% 0px 100% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function PhotoColumn({ photos, startDelay }: { photos: Artwork[]; startDelay: number }) {
  return (
    <div
      className="flex flex-col w-full md:w-1/2 lg:w-1/3"
      style={{ gap: 40, paddingLeft: 20, paddingRight: 20, position: "relative", minHeight: 1 }}
    >
      {photos.map((photo, i) => (
        <FadeUpOnScroll key={photo.id} delay={i % 2 === 0 ? startDelay : startDelay + 0.1}>
          <Link to={`/artwork/${photo.slug}`} className="block">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full object-cover hover:opacity-90 transition-opacity duration-300"
              style={{ aspectRatio: `${photo.w}/${photo.h}`, maxWidth: 415 }}
              loading="lazy"
            />
          </Link>
        </FadeUpOnScroll>
      ))}
    </div>
  );
}

export function PhotoGrid() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        maxWidth: 1365,
        margin: "4vw auto",
        position: "relative",
      }}
    >
      <div className="flex flex-col md:flex-row" style={{ maxWidth: "100%", width: "100%" }}>
        <PhotoColumn photos={getByIds(COL_1_IDS)} startDelay={0.2} />
        <PhotoColumn photos={getByIds(COL_2_IDS)} startDelay={0.3} />
        <PhotoColumn photos={getByIds(COL_3_IDS)} startDelay={0.2} />
      </div>
    </section>
  );
}
