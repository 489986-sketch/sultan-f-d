import { motion } from 'framer-motion';
import { Milk, Sprout, Tractor, Wheat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeUp, stagger, viewportOnce, wordContainer, wordRise } from '../lib/motion';

type Tile = {
  title: string;
  desc: string;
  icon?: LucideIcon;
  bg: string;       // tailwind bg class
  ink?: string;     // tailwind text class
  span: string;     // grid span class
  blob?: 'a' | 'b' | 'c'; // decorative blob variants
};

const tiles: Tile[] = [
  {
    title: 'Healthy livestock',
    desc: 'Balanced feed that keeps cattle, goats and poultry strong.',
    icon: Wheat,
    bg: 'bg-brand-butter',
    span: 'lg:col-span-4 lg:row-span-1',
  },
  {
    title: 'Fresh dairy',
    desc: 'Reliable supplies for farms with milking herds.',
    icon: Milk,
    bg: 'bg-brand-sky',
    span: 'lg:col-span-4 lg:row-span-1',
  },
  {
    title: 'Modern tools',
    desc: 'Equipment that makes the day shorter, the harvest larger.',
    icon: Tractor,
    bg: 'bg-brand-peach',
    span: 'lg:col-span-4 lg:row-span-1',
  },
  {
    title: 'Local know-how',
    desc: 'Advice from people who farm where you farm — Anantnag, valley-wide.',
    icon: Sprout,
    bg: 'bg-brand-green-soft',
    span: 'lg:col-span-6',
  },
  {
    title: 'Fair pricing',
    desc: 'Honest, farmer-friendly costs. No premium markup, no surprises.',
    bg: 'bg-brand-cream',
    span: 'lg:col-span-6',
    blob: 'a',
  },
];

const headingWords = ['Reimagining', 'livestock', 'care', 'with', 'purpose'];

export default function Services() {
  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-36 bg-brand-paper">
      <div className="container-px mx-auto max-w-[1280px]">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid lg:grid-cols-12 gap-y-8 gap-x-10 items-end"
        >
          <motion.h2
            variants={wordContainer(0.06, 0.05)}
            className="lg:col-span-8 display-bold text-[clamp(2rem,5.5vw,4.5rem)] text-brand-ink"
          >
            {headingWords.map((w, i) => (
              <span key={i} className="word-mask mr-[0.16em] last:mr-0">
                <motion.span variants={wordRise}>{w}</motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="lg:col-span-4 text-[15px] sm:text-[16px] text-brand-muted leading-relaxed max-w-md lg:pb-2"
          >
            Sultan Feed & Dairy combines quality feed, dairy supplies, and connected support
            so farmers can focus on what they do best.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[minmax(220px,auto)]"
        >
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className={`relative overflow-hidden rounded-4xl p-7 sm:p-8 ${t.bg} ${t.span}`}
              >
                {Icon && (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/55 ring-1 ring-black/5 text-brand-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                )}

                {/* Decorative blob */}
                {t.blob === 'a' && (
                  <svg
                    aria-hidden
                    viewBox="0 0 200 200"
                    className="absolute right-0 bottom-0 h-36 w-36 sm:h-44 sm:w-44 translate-y-4 text-white/40"
                  >
                    <path
                      fill="currentColor"
                      d="M44.6,-58.3C57.6,-49.4,67.7,-34.7,72.5,-18.1C77.3,-1.5,76.6,17,68.7,30.6C60.7,44.2,45.5,52.9,30.1,59.1C14.6,65.3,-1.1,69,-18.4,66.9C-35.7,64.7,-54.6,56.7,-65.3,42.8C-76,28.9,-78.5,9.1,-73.6,-7.3C-68.6,-23.7,-56.2,-36.6,-42.4,-46.2C-28.6,-55.9,-13.4,-62.2,1.5,-64.1C16.4,-66,32.7,-67.5,44.6,-58.3Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                )}

                <div className={`relative ${Icon ? 'mt-12 sm:mt-16' : 'mt-2'}`}>
                  <h3 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] font-bold tracking-tight leading-tight text-brand-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-brand-ink/65 leading-relaxed max-w-sm">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
