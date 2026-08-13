import { motion } from "framer-motion";
import { SiteHeader } from "@/components/ui/site-header";

const About = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--hero-light)",
        fontFamily: "'Host Grotesk', sans-serif",
        color: "var(--hero-paragraphs)",
      }}
    >
      <SiteHeader />

      <div className="px-6 md:px-12 lg:px-20 pt-32 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"
              alt="Artist studio"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4" }}
            />
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1
              className="text-4xl md:text-5xl mb-8"
              style={{
                fontFamily: "'Host Grotesk', sans-serif",
                color: "var(--hero-dark)",
                lineHeight: 1.15,
              }}
            >
              About me
            </h1>

            <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ maxWidth: 460 }}>
              <p>
                Frontend Developer specializing in React, Next.js, and TypeScript, with a strong focus on scalable SaaS applications, reusable architectures, and high-performance user experiences.
              </p>
              <p>
                Reduced development cycles by ~40% by introducing modular component architecture and reusable UI systems.
              </p>
              <p>
                Proven experience delivering production applications from concept to deployment, with end-to-end ownership of features and a strong focus on performance, maintainability, and product quality.
              </p>
            </div>

            <div className="mt-10 text-sm" style={{ color: "var(--hero-paragraphs)" }}>
              <p className="mb-1">For inquiries and commissions:</p>
              <a
                href="mailto:alisheydai137@gmail.com"
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--hero-dark)" }}
              >
                alisheydai137@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
