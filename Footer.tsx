import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Leaf, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import Logo from './Logo';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-brand-paper">
      <div className="container-px mx-auto max-w-[1280px] pb-14 sm:pb-20">
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center pt-8 sm:pt-12"
        >
          <motion.div variants={fadeUp}>
            <Logo size={220} onClick={() => { window.location.hash = 'home'; }} />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Trusted Quality for Your Livestock
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 sm:mt-16 grid md:grid-cols-12 gap-y-8 gap-x-8 pt-8 border-t border-brand-line"
        >
          <motion.div variants={fadeUp} className="md:col-span-5">
            <p className="text-[14px] sm:text-[15px] text-brand-muted leading-relaxed max-w-sm">
              Premium feed, dairy supplies, and farming support — quietly serving Kashmir's
              farms from Fatehpora, Anantnag.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-muted">
              Navigate
            </h4>
            <ul className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-[14px] text-brand-ink/85 hover:text-brand-green transition-colors"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-editorial" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-muted">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+919622987445"
                  className="group flex items-center gap-3 text-[14px] text-brand-ink hover:text-brand-green"
                >
                  <Phone className="h-4 w-4 text-brand-muted group-hover:text-brand-green transition-colors" />
                  <span className="font-semibold tracking-tight">9622987445</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-brand-ink/75">
                <MapPin className="h-4 w-4 text-brand-muted" />
                Fatehpora, Anantnag, Kashmir
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="relative mt-12 overflow-hidden rounded-3xl bg-brand-cream ring-1 ring-brand-line"
        >
          {/* Decorative leaves — top-left accent */}
          <Leaf
            aria-hidden
            className="absolute -top-4 -left-3 h-16 w-16 text-brand-green/25 -rotate-45"
            strokeWidth={1.25}
          />
          <Leaf
            aria-hidden
            className="absolute -top-1 left-7 h-10 w-10 text-brand-green/20 rotate-12"
            strokeWidth={1.25}
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-5 sm:gap-8 p-6 sm:p-7">
            {/* Left — copyright */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white ring-1 ring-brand-line text-brand-green flex-shrink-0">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] sm:text-[14px] leading-snug text-brand-ink">
                © {year} Sultan Feed &amp; Dairy.
                <br />
                <span className="text-brand-muted">All rights reserved.</span>
              </p>
            </div>

            {/* Divider — horizontal on mobile, vertical on sm+ */}
            <div className="hidden sm:block h-12 w-px bg-brand-line" />
            <div className="sm:hidden h-px w-full bg-brand-line" />

            {/* Right — designed by */}
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white ring-1 ring-brand-line text-brand-green flex-shrink-0">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] sm:text-[14px] leading-snug text-brand-muted">
                Designed by
                <br />
                <span className="font-semibold tracking-wider text-brand-ink">
                  DAR BROTHERS
                </span>
                <br />
                with care, for the valley.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
