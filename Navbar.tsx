import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const leftLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
];
const rightLinks = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-brand-line'
          : 'bg-white/0'
      }`}
    >
      <div className="container-px mx-auto max-w-[1280px] flex items-center justify-between h-20">
        {/* Left links */}
        <nav className="hidden md:flex items-center gap-6 text-brand-ink">
          {leftLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium tracking-tight hover:text-brand-green transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Centered logo at every breakpoint */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="md:hidden">
            <Logo size={72} onClick={() => { window.location.hash = 'home'; }} />
          </div>
          <div className="hidden md:block">
            <Logo size={64} onClick={() => { window.location.hash = 'home'; }} />
          </div>
        </div>

        {/* Right links */}
        <nav className="hidden md:flex items-center gap-6 text-brand-ink">
          {rightLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium tracking-tight hover:text-brand-green transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+919622987445"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-brand-ink text-white px-4 py-2 text-[12.5px] font-semibold transition-colors hover:bg-brand-green"
          >
            Call now
          </a>
        </nav>

        {/* Mobile menu button — pinned right (logo is absolute-centered) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-ink hover:bg-brand-green/10 transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white border-t border-brand-line"
          >
            <nav className="container-px mx-auto max-w-[1280px] flex flex-col py-3">
              {[...leftLinks, ...rightLinks].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-base font-medium text-brand-ink hover:text-brand-green border-b border-brand-line last:border-0 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+919622987445"
                onClick={() => setOpen(false)}
                className="mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink text-white px-4 py-3 text-sm font-semibold"
              >
                Call 9622987445
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
