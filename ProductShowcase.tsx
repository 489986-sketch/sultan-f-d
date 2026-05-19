import { useEffect, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ease, viewportOnce } from '../lib/motion';


type Media =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string; poster?: string; loopAt?: number };

type Product = {
  id: string;
  title: string;
  tagline: string;
  bg: string;        // pastel section color
  pillBg: string;    // primary pill color (the orange one in reference)
  media: Media;
  pills: string[];   // category badges shown above the detail card
  meta: string;      // "1—3 Bedroom Apartments / Penthouses..."
  priceLabel: string;
  priceValue: string;
  dateLabel: string;
  dateValue: string;
  status: string;
};

const products: Product[] = [
  {
    id: 'dairy',
    title: 'DAIRY ESSENTIALS',
    tagline: 'Fresh / Trusted / Local',
    bg: 'bg-brand-sky',
    pillBg: 'bg-brand-green',
    media: { kind: 'video', src: '/dairy.mp4', loopAt: 4 },
    pills: ['Farm-fresh', 'Cold-chain'],
    meta: 'Milk / Butter / Curd / Paneer',
    priceLabel: 'Price range',
    priceValue: '₹60 — ₹420 / unit',
    dateLabel: 'Delivery',
    dateValue: 'Same-day',
    status: 'Fresh today',
  },
  {
    id: 'feed',
    title: 'PREMIUM FEED',
    tagline: 'Cattle / Goat / Poultry',
    bg: 'bg-brand-cream',
    pillBg: 'bg-brand-ember',
    media: { kind: 'video', src: '/feed.mp4' },
    pills: ['Daily Mix', 'Vet-approved'],
    meta: 'Cattle / Goat / Poultry / Custom blends',
    priceLabel: 'Price range',
    priceValue: '₹850 — ₹2,400 / sack',
    dateLabel: 'Availability',
    dateValue: 'In stock',
    status: 'Stocked daily',
  },
  {
    id: 'tools',
    title: 'FARM TOOLS',
    tagline: 'Modern / Durable / Smart',
    bg: 'bg-brand-butter',
    pillBg: 'bg-brand-ember',
    media: { kind: 'video', src: '/tools.mp4' },
    pills: ['Workshop-tested', 'Warranty'],
    meta: 'Tillers / Sprayers / Milking kits / Storage',
    priceLabel: 'Price range',
    priceValue: '₹1,200 — ₹85,000',
    dateLabel: 'Warranty',
    dateValue: '12–24 months',
    status: 'In showroom',
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const product = products[active];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px', threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative bg-brand-paper">
      <div className="container-px mx-auto max-w-[1280px] py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease }}
          key={product.id}
          className={`relative overflow-hidden rounded-5xl ${product.bg} transition-colors duration-700 ease-editorial`}
        >
          <div className="grid lg:grid-cols-12 gap-y-10 gap-x-8 p-7 sm:p-10 md:p-14">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 flex-wrap text-[10px] uppercase tracking-[0.28em] text-brand-ink/65">
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActive(i)}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-tight transition-colors ${
                      i === active
                        ? 'bg-brand-ink text-white'
                        : 'bg-white/70 text-brand-ink/70 hover:bg-white'
                    }`}
                  >
                    {p.title.toLowerCase().replace(' ', ' / ')}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={product.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease }}
                  className="mt-8 sm:mt-12 display-mega text-[clamp(2.75rem,8vw,7rem)] text-brand-ink"
                >
                  {product.title}
                </motion.h2>
              </AnimatePresence>

              <p className="mt-3 sm:mt-4 text-[12px] uppercase tracking-[0.3em] text-brand-ink/55">
                {product.tagline}
              </p>

              <div className="mt-10 sm:mt-12 relative overflow-hidden rounded-4xl bg-black/5 ring-1 ring-black/5 aspect-[16/10]">
                {/* Cinematic vignette — soft top & bottom darkening for film-frame feel */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5 z-10"
                />
                {/* All three product media stacks always mounted so switching
                 *  tabs is instant — no remount, no buffering gap. Only the
                 *  active one is visible (opacity 1) and its video is playing. */}
                {products.map((p) => {
                  const isActive = p.id === product.id;
                  return (
                    <div
                      key={p.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-opacity duration-700 ease-editorial ${
                        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {p.media.kind === 'video' ? (
                        <SeamlessVideo
                          src={p.media.src}
                          loopAt={p.media.loopAt}
                          active={isActive && inView}
                        />
                      ) : (
                        <img
                          src={p.media.src}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="eager"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail card column */}
            <div className="lg:col-span-5 lg:pl-4 flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                {product.pills.map((p, i) => (
                  <span
                    key={p}
                    className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
                      i === 0
                        ? 'bg-white text-brand-ink ring-1 ring-black/5'
                        : 'bg-white/40 text-brand-ink/70'
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.55, ease }}
                  className="mt-6 rounded-3xl bg-white/55 backdrop-blur-md ring-1 ring-black/5 p-5 sm:p-6"
                >
                  <h3 className="font-display text-[20px] sm:text-[22px] font-bold tracking-tight text-brand-ink">
                    {product.title.split(' ').map((w, i) => (
                      <span key={i}>
                        {i === 0 ? w[0] + w.slice(1).toLowerCase() : ' ' + w.toLowerCase()}
                      </span>
                    ))}
                    <span className="text-brand-muted text-[12px] align-top ml-1">™</span>
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] text-brand-muted leading-relaxed">
                    {product.meta}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div
                      className={`rounded-2xl ${product.pillBg} px-4 py-3.5 ${
                        product.pillBg === 'bg-brand-green' ? 'text-white' : 'text-brand-ink'
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                        {product.priceLabel}
                      </p>
                      <p className="mt-1 text-[14px] sm:text-[15px] font-bold tracking-tight leading-tight">
                        {product.priceValue}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/85 ring-1 ring-black/5 px-4 py-3.5 text-brand-ink">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted">
                        {product.dateLabel}
                      </p>
                      <p className="mt-1 text-[14px] sm:text-[15px] font-bold tracking-tight leading-tight">
                        {product.dateValue}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/85 ring-1 ring-black/5 px-4 py-3.5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted">Status</p>
                    <p className="mt-1 text-[14px] font-medium text-brand-ink">{product.status}</p>
                  </div>

                  <a
                    href="#contact"
                    className="group mt-5 inline-flex w-full items-center justify-between gap-2 rounded-full bg-brand-ink text-white px-5 py-3 text-[13px] font-semibold transition hover:bg-brand-green"
                  >
                    Enquire about this product
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Tab dots / preview pills */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              aria-label={`Show ${p.title}`}
              className={`h-1.5 rounded-full transition-all duration-500 ease-editorial ${
                i === active ? 'w-8 bg-brand-ink' : 'w-3 bg-brand-line hover:bg-brand-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quote/text reveal */}
      <QualityReveal />
    </section>
  );
}

/**
 * Seamless video loop via dual-element crossfade. Renders two <video>
 * elements playing the same source; when one approaches its loop point,
 * the other is started at t=0 and the opacity crossfades over FADE_MS,
 * hiding the snap-back.
 */
function SeamlessVideo({
  src,
  loopAt,
  active,
}: {
  src: string;
  loopAt?: number;
  /** Whether this product is currently visible. When false, both videos pause
   *  but stay mounted (so the data stays buffered and re-activation is instant). */
  active: boolean;
}) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [layer, setLayer] = useState<'a' | 'b'>('a');
  const swapping = useRef(false);
  const FADE_MS = 700;

  const handleTimeUpdate =
    (which: 'a' | 'b') => (e: SyntheticEvent<HTMLVideoElement>) => {
      if (which !== layer || swapping.current) return;
      const v = e.currentTarget;
      const end = loopAt ?? v.duration;
      if (!isFinite(end)) return;
      // Trigger swap when we're FADE_MS away from the end.
      if (v.currentTime >= end - FADE_MS / 1000) {
        swapping.current = true;
        const other = which === 'a' ? refB.current : refA.current;
        if (other) {
          other.currentTime = 0;
          other.play().catch(() => {});
        }
        setLayer(which === 'a' ? 'b' : 'a');
        // After the fade completes, reset the just-faded video so it's
        // pre-positioned for next time it becomes active.
        window.setTimeout(() => {
          v.pause();
          v.currentTime = 0;
          swapping.current = false;
        }, FADE_MS);
      }
    };

  // Play / pause based on active prop. When inactive, both videos pause but
  // stay mounted so their data remains buffered for instant resume.
  useEffect(() => {
    const a = refA.current;
    const b = refB.current;
    if (active) {
      swapping.current = false;
      setLayer('a');
      if (a) {
        a.currentTime = 0;
        a.play().catch(() => {});
      }
      if (b) {
        b.currentTime = 0;
        b.pause();
      }
    } else {
      a?.pause();
      b?.pause();
    }
  }, [active, src]);

  const baseClass = 'absolute inset-0 h-full w-full object-cover';
  const fadeTransition = { duration: FADE_MS / 1000, ease: 'linear' as const };

  return (
    <>
      <motion.video
        ref={refA}
        src={src}
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate('a')}
        initial={{ opacity: 1 }}
        animate={{ opacity: layer === 'a' ? 1 : 0 }}
        transition={fadeTransition}
        className={baseClass}
      />
      <motion.video
        ref={refB}
        src={src}
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate('b')}
        initial={{ opacity: 0 }}
        animate={{ opacity: layer === 'b' ? 1 : 0 }}
        transition={fadeTransition}
        className={baseClass}
      />
    </>
  );
}

function QualityReveal() {
  return (
    <div className="container-px mx-auto max-w-[1280px] py-24 sm:py-32 md:py-40 text-center">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.2, ease }}
        className="display-mega text-[clamp(2rem,7vw,6rem)] text-brand-ink/15"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-160px' }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
          className="text-brand-ink"
        >
          Where quality meets the valley
        </motion.span>
      </motion.h3>
    </div>
  );
}
