import { useParams, Link } from "react-router-dom";
import { getArtworkBySlug, getAdjacentArtworks } from "@/lib/artworks";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useId, useState } from "react";
import { SiteHeader } from "@/components/ui/site-header";

const ArtworkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const artwork = getArtworkBySlug(slug || "");
  const { prev, next } = getAdjacentArtworks(slug || "");
  const [submitted, setSubmitted] = useState(false);
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const remarksId = `${uid}-remarks`;

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--hero-light)", fontFamily: "'Host Grotesk', sans-serif" }}>
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ fontFamily: "'Host Grotesk', sans-serif", color: "var(--hero-dark)" }}>Artwork not found</h1>
          <Link to="/" className="underline" style={{ color: "var(--hero-paragraphs)" }}>Return home</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--hero-light)",
        fontFamily: "'Host Grotesk', sans-serif",
        color: "var(--hero-paragraphs)",
      }}
    >
      <SiteHeader />

      {/* Close / Back to home */}
      <div className="absolute top-6 right-6 z-10 md:hidden">
        <Link to="/" aria-label="Back to home" className="hover:opacity-60 transition-opacity" style={{ color: "var(--hero-dark)" }}>
          <X size={28} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Split layout */}
      <div className="flex-1 flex flex-col md:flex-row min-h-screen">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-[50vh] md:h-full object-cover"
          />
        </div>

        {/* Right: Info + Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between px-8 md:px-14 lg:px-20 py-12 md:py-16 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Artwork details */}
            <div className="mb-10 text-sm leading-loose" style={{ color: "var(--hero-paragraphs)" }}>
              <p style={{ color: "var(--hero-dark)", fontFamily: "'Host Grotesk', sans-serif", fontSize: "1.25rem" }}>
                {artwork.title}
              </p>
              <p className="mt-1">{artwork.medium} ({artwork.year})</p>
              <p>{artwork.dimensions}</p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-12" style={{ color: "var(--hero-paragraphs)", maxWidth: 440 }}>
              {artwork.description}
            </p>

            {/* Form */}
            <h2
              className="text-lg mb-8 font-medium"
              style={{ color: "var(--hero-dark)", fontFamily: "'Host Grotesk', sans-serif" }}
            >
              Request artwork
            </h2>

            {submitted ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
                style={{ color: "var(--hero-dark)" }}
              >
                Thank you for your inquiry. We'll be in touch soon.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor={nameId} className="block text-sm font-medium mb-2" style={{ color: "var(--hero-dark)" }}>
                    Full name <span style={{ color: "var(--hero-red)" }}>*</span>
                  </label>
                  <input
                    id={nameId} required type="text" name="name" placeholder="Full name" maxLength={100}
                    className="w-full border-0 border-b py-3 text-sm bg-transparent outline-none focus:ring-0"
                    style={{ borderColor: "var(--hero-border)", color: "var(--hero-dark)" }}
                  />
                </div>
                <div>
                  <label htmlFor={emailId} className="block text-sm font-medium mb-2" style={{ color: "var(--hero-dark)" }}>
                    Email <span style={{ color: "var(--hero-red)" }}>*</span>
                  </label>
                  <input
                    id={emailId} required type="email" name="email" placeholder="Email" maxLength={255}
                    className="w-full border-0 border-b py-3 text-sm bg-transparent outline-none focus:ring-0"
                    style={{ borderColor: "var(--hero-border)", color: "var(--hero-dark)" }}
                  />
                </div>
                <div>
                  <label htmlFor={remarksId} className="block text-sm font-medium mb-2" style={{ color: "var(--hero-dark)" }}>
                    Remarks
                  </label>
                  <textarea
                    id={remarksId} name="remarks" rows={4} maxLength={1000}
                    placeholder="Hi, I'm interested in purchasing this work. Could you please provide more information about the piece?"
                    className="w-full border-0 border-b py-3 text-sm bg-transparent outline-none focus:ring-0 resize-none"
                    style={{ borderColor: "var(--hero-border)", color: "var(--hero-dark)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="self-end mt-4 px-8 py-3.5 text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--hero-dark)", color: "var(--hero-light)" }}
                >
                  Submit
                </button>
              </form>
            )}
          </motion.div>

          {/* Prev / Next */}
          <div
            className="mt-16 pt-8 flex justify-between items-center"
            style={{ borderTop: "1px solid var(--hero-border)" }}
          >
            {prev ? (
              <Link
                to={`/artwork/${prev.slug}`}
                className="inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-70 transition-opacity group"
                style={{ color: "var(--hero-paragraphs)" }}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="block text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.5 }}>Previous</span>
                  <span style={{ color: "var(--hero-dark)", fontFamily: "'Host Grotesk', sans-serif" }}>{prev.title}</span>
                </span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                to={`/artwork/${next.slug}`}
                className="inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-70 transition-opacity text-right group"
                style={{ color: "var(--hero-paragraphs)" }}
              >
                <span>
                  <span className="block text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.5 }}>Next</span>
                  <span style={{ color: "var(--hero-dark)", fontFamily: "'Host Grotesk', sans-serif" }}>{next.title}</span>
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkDetail;
