import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface ContactOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function ContactOverlay({ open, onClose }: ContactOverlayProps) {
  const [submitted, setSubmitted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const messageId = `${uid}-message`;

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: "var(--hero-light)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${uid}-title`}
        >
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute top-8 right-8 hover:opacity-60 transition-opacity"
            style={{ color: "var(--hero-dark)" }}
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full max-w-md px-8"
            style={{ fontFamily: "'Host Grotesk', sans-serif" }}
          >
            <h2
              id={`${uid}-title`}
              className="text-3xl md:text-4xl mb-10"
              style={{ fontFamily: "'Host Grotesk', sans-serif", color: "var(--hero-dark)" }}
            >
              Get in touch
            </h2>

            {submitted ? (
              <p className="text-sm" style={{ color: "var(--hero-dark)" }}>
                Thank you for reaching out. We'll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor={nameId} className="block text-sm font-medium mb-2" style={{ color: "var(--hero-dark)" }}>
                    Name <span style={{ color: "var(--hero-red)" }}>*</span>
                  </label>
                  <input
                    id={nameId}
                    required
                    type="text"
                    name="name"
                    placeholder="Your name"
                    maxLength={100}
                    className="w-full border-0 border-b py-3 text-sm bg-transparent outline-none"
                    style={{ borderColor: "var(--hero-border)", color: "var(--hero-dark)" }}
                  />
                </div>
                <div>
                  <label htmlFor={emailId} className="block text-sm font-medium mb-2" style={{ color: "var(--hero-dark)" }}>
                    Email <span style={{ color: "var(--hero-red)" }}>*</span>
                  </label>
                  <input
                    id={emailId}
                    required
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    maxLength={255}
                    className="w-full border-0 border-b py-3 text-sm bg-transparent outline-none"
                    style={{ borderColor: "var(--hero-border)", color: "var(--hero-dark)" }}
                  />
                </div>
                <div>
                  <label htmlFor={messageId} className="block text-sm font-medium mb-2" style={{ color: "var(--hero-dark)" }}>
                    Message
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="Tell us about your interest..."
                    className="w-full border-0 border-b py-3 text-sm bg-transparent outline-none resize-none"
                    style={{ borderColor: "var(--hero-border)", color: "var(--hero-dark)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="self-end mt-4 px-8 py-3.5 text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--hero-dark)", color: "var(--hero-light)" }}
                >
                  Send
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
