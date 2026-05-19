import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Navigation, Phone } from 'lucide-react';
import { ease, fadeUp, stagger, viewportOnce } from '../lib/motion';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Fatehpora+Anantnag+Kashmir';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdbjqwe';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || submitted) return;
    const form = e.currentTarget;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setSubmitted(true);
      form.reset();
    } catch {
      setError("Couldn't send right now. Please try again, or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-brand-paper">
      <div className="container-px mx-auto max-w-[1280px] py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease }}
          className="relative overflow-hidden rounded-5xl bg-brand-green text-white"
        >
          <div className="grid lg:grid-cols-12 gap-y-10 gap-x-10 p-7 sm:p-10 md:p-14">
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="lg:col-span-7"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-ember" />
                Get in touch
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="mt-5 sm:mt-6 display-mega text-[clamp(2.25rem,7vw,5.5rem)]"
              >
                Visit us, or just call.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-md text-[15px] sm:text-[16px] text-white/75 leading-relaxed"
              >
                We're happy to help with feed advice, dairy supplies, or any farming need.
                Drop in to the shop in Fatehpora, or pick up the phone — we answer.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+919622987445"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-ink px-6 py-3.5 text-[13px] font-semibold transition hover:bg-brand-cream"
                >
                  <Phone className="h-4 w-4" />
                  Call 9622987445
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/25 text-white px-6 py-3.5 text-[13px] font-semibold hover:bg-white/15"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl">
                <div className="rounded-3xl bg-white/10 backdrop-blur ring-1 ring-white/15 p-5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/55">
                    <Phone className="h-3 w-3" />
                    Phone
                  </div>
                  <p className="mt-2 font-display text-[24px] font-bold tracking-tight">
                    9622987445
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 backdrop-blur ring-1 ring-white/15 p-5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/55">
                    <MapPin className="h-3 w-3" />
                    Address
                  </div>
                  <p className="mt-2 text-[15px] leading-snug">
                    Fatehpora, Anantnag<br />
                    <span className="text-white/65">Kashmir</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              onSubmit={onSubmit}
              className="lg:col-span-5 rounded-4xl bg-white text-brand-ink p-6 sm:p-7 self-start"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-brand-muted">
                Send a message
              </p>
              <h3 className="mt-3 font-display text-[22px] sm:text-[24px] font-bold tracking-tight leading-tight">
                Tell us what you need.
              </h3>

              <div className="mt-5 space-y-4">
                {[
                  { id: 'name', label: 'Your name', type: 'text', placeholder: 'e.g. Bilal Ahmad' },
                  { id: 'phone', label: 'Phone number', type: 'tel', placeholder: '10-digit mobile' },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      className="mt-2 w-full bg-transparent border-b border-brand-line px-0 py-2.5 text-[16px] text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-green outline-none transition-colors duration-500 ease-editorial"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="What do you need help with?"
                    className="mt-2 w-full bg-transparent border-b border-brand-line px-0 py-2.5 text-[16px] text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-green outline-none transition-colors duration-500 ease-editorial resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || submitted}
                className="group mt-6 w-full inline-flex items-center justify-between gap-2 rounded-full bg-brand-ink text-white px-5 py-3.5 text-[13px] font-semibold transition hover:bg-brand-green disabled:opacity-70"
              >
                <span>
                  {submitted
                    ? "Thanks — we'll call you back"
                    : submitting
                      ? 'Sending…'
                      : 'Send message'}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              {error && (
                <p className="mt-2 text-[12px] text-red-600" role="alert">
                  {error}
                </p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
