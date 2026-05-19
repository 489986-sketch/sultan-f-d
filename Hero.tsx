import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { ease, fadeUp, stagger, wordContainer, wordRise } from '../lib/motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-brand-paper text-brand-ink h-[100svh] min-h-[600px] lg:min-h-[680px] overflow-hidden"
    >
      {/* Full-bleed video background — desktop video, mobile/reduced-motion poster */}
      <HeroBackdrop />

      {/* Mobile-only blending overlays — readable left wash + clean dissolve at bottom */}
      <div
        aria-hidden
        className="md:hidden absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 25%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0.05) 80%, rgba(255,255,255,0) 100%)',
        }}
      />
      <div
        aria-hidden
        className="md:hidden absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.85) 75%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* Desktop readability overlays — unchanged */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(250,250,247,0.92) 0%, rgba(250,250,247,0.78) 30%, rgba(250,250,247,0.40) 55%, rgba(250,250,247,0.05) 80%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(250,250,247,0.6) 0%, transparent 18%, transparent 78%, rgba(250,250,247,0.55) 100%)',
        }}
      />
      {/* Subtle green tint — pulls the brand into the imagery */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(14,92,58,0.06)' }}
      />

      {/* Left-edge "Scroll" */}
      <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-3 text-brand-green/70 z-[2]">
        <span
          className="text-[10px] tracking-[0.4em] font-mono uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        variants={stagger(0.1, 0.2)}
        initial="hidden"
        animate="show"
        className="relative h-full container-px mx-auto max-w-[1280px] flex flex-col justify-end lg:grid lg:grid-cols-12 lg:items-center lg:justify-normal gap-x-10 gap-y-6 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-24 lg:pb-40"
      >
        {/* Mobile-only h1 pinned at top */}
        <h1
          className="lg:hidden mb-auto relative z-10 font-display font-extrabold tracking-display leading-[1.05] text-[28px]"
          style={{
            color: '#111',
            opacity: 1,
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          <span className="block whitespace-nowrap">WHERE SERIOUS FARMING</span>
          <span className="block whitespace-nowrap">BEGINS WITH QUALITY</span>
          <span className="block whitespace-nowrap" style={{ color: '#0E5C3A' }}>
            YOU CAN TRUST
          </span>
        </h1>

        {/* LEFT — Sultan headline + tagline + CTA */}
        <div className="lg:col-span-5 z-10">
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.08em] sm:tracking-[0.32em] text-brand-green whitespace-nowrap"
            style={{ opacity: 1 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green flex-shrink-0" />
            <span>pure nutrition, healthy livestock, better tomorrow.</span>
          </motion.div>

          <motion.h1
            variants={wordContainer(0.07, 0.15)}
            className="hidden lg:block mt-3 sm:mt-5 font-display font-extrabold tracking-display leading-[1.05] sm:leading-[0.95] text-[22px] sm:text-[clamp(1rem,3.1vw,2.5rem)] text-brand-ink"
          >
            <span className="block whitespace-nowrap">
              <span className="word-mask mr-[0.18em]">
                <motion.span variants={wordRise}>WHERE</motion.span>
              </span>
              <span className="word-mask mr-[0.18em]">
                <motion.span variants={wordRise}>SERIOUS</motion.span>
              </span>
              <span className="word-mask">
                <motion.span variants={wordRise}>FARMING</motion.span>
              </span>
            </span>
            <span className="block whitespace-nowrap">
              <span className="word-mask mr-[0.18em]">
                <motion.span variants={wordRise}>BEGINS</motion.span>
              </span>
              <span className="word-mask mr-[0.18em]">
                <motion.span variants={wordRise}>WITH</motion.span>
              </span>
              <span className="word-mask">
                <motion.span variants={wordRise}>QUALITY</motion.span>
              </span>
            </span>
            <span className="block whitespace-nowrap text-brand-green">
              <span className="word-mask mr-[0.18em]">
                <motion.span variants={wordRise}>YOU</motion.span>
              </span>
              <span className="word-mask mr-[0.18em]">
                <motion.span variants={wordRise}>CAN</motion.span>
              </span>
              <span className="word-mask">
                <motion.span variants={wordRise}>TRUST</motion.span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 sm:mt-7 max-w-[440px] text-[13px] sm:text-[16px] text-brand-green/85 leading-[1.55] sm:leading-relaxed"
          >
            Sultan Feed & Dairy crafts premium feed and dairy supplies for farms across the
            valley. Reliable nutrition, fair pricing, and people who actually know livestock.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 sm:mt-9 flex items-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-brand-green text-white px-6 sm:px-7 py-3.5 sm:py-3.5 text-[14px] sm:text-[13px] font-semibold tracking-wide transition-colors duration-500 ease-editorial hover:bg-brand-green-deep"
            >
              Browse products
              <span className="inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition">
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>
            <a
              href="tel:+919622987445"
              className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-brand-line text-brand-ink px-6 sm:px-5 py-3.5 sm:py-3 text-[14px] sm:text-[13px] font-semibold transition-colors hover:bg-brand-green-soft"
            >
              Call us
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Premium feed image with corner notches + green glow + callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease, delay: 0.5 }}
          className="hidden lg:flex lg:col-span-7 relative h-full items-center justify-center min-h-[300px]"
        >
          {/* Green glow */}
          <motion.div
            aria-hidden
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.04, 1] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            className="absolute left-1/2 bottom-[8%] -translate-x-1/2 h-[260px] w-[480px] sm:h-[340px] sm:w-[620px] rounded-full bg-brand-green/40 blur-[100px]"
          />
        </motion.div>
      </motion.div>

      {/* "100/100" strip — desktop only, pinned to the bottom anchor */}
      <div className="hidden lg:block absolute inset-x-0 lg:bottom-10 z-[2]">
        <div className="container-px mx-auto max-w-[1280px] grid grid-cols-12 gap-3 sm:gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.2 }}
            className="col-span-7 flex items-start gap-2 sm:gap-3"
          >
            <span className="hidden sm:inline-flex flex-shrink-0">
              <Logo size={36} interactive={false} />
            </span>
            <p className="font-mono text-[9px] sm:text-[12px] text-brand-muted leading-snug sm:leading-relaxed max-w-[380px]">
              Premium feed and dairy crafted for the valley. Honest pricing, dependable
              supply, and a team that knows livestock.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.35 }}
            className="col-span-5 text-right"
          >
            <div className="flex justify-end items-center gap-1.5 sm:gap-3">
              <span className="font-techno font-bold text-[clamp(1.5rem,5vw,4.25rem)] leading-none tracking-tight text-brand-ink">
                100<span className="text-brand-green/60">/</span>
                <span className="text-brand-green">100</span>
              </span>
              <Gauge />
            </div>
            <p className="mt-1 sm:mt-2 font-mono text-[9px] sm:text-[12px] text-brand-muted leading-snug sm:leading-relaxed">
              Commitment to quality.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function HeroBackdrop() {
  const reduced = useReducedMotion();
  const [loadVideo, setLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => setLoadVideo(true), isMobile ? 0 : 1200);
    return () => clearTimeout(timer);
  }, [reduced, isMobile]);

  const videoSrc = isMobile ? '/hero-mobile.mp4' : '/hero.mp4';

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <img
        src="/hero-poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        style={
          isMobile
            ? {
                filter: 'brightness(1.03) contrast(0.97) saturate(0.95)',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }
            : undefined
        }
      />
      {loadVideo && !reduced && (
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={
            isMobile
              ? {
                  filter: 'brightness(1.03) contrast(0.97) saturate(0.95)',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Gauge() {
  return (
    <svg
      aria-hidden
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className="text-brand-green"
    >
      <path d="M 8 32 A 16 16 0 0 1 40 32" strokeWidth="2" opacity="0.85" />
      <line x1="24" y1="32" x2="32" y2="20" strokeWidth="2" />
      <circle cx="24" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}
