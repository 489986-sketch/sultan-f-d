import { useState } from 'react';
import { motion } from 'framer-motion';
import { ease, fadeUp, viewportOnce } from '../lib/motion';

type Step = {
  num: string;
  title: string;
  desc: string;
  image: string;
  bg: string;
};

const steps: Step[] = [
  {
    num: '01',
    title: 'Sourcing & inspection',
    desc:
      'We hand-pick raw feed grains from local growers and certified mills, then inspect every batch for moisture, freshness, and grade.',
    image: '/process-01.jpg?v=4',
    bg: 'bg-brand-cream',
  },
  {
    num: '02',
    title: 'Formulation & blending',
    desc:
      'Each blend is formulated for the species and life stage — calves, milkers, layers, kids — using vet-approved ratios.',
    image: '/process-02.jpg?v=2',
    bg: 'bg-brand-butter',
  },
  {
    num: '03',
    title: 'Quality check',
    desc:
      'Random samples from every production run are tested for nutrient consistency before any sack leaves the warehouse.',
    image: '/process-03.jpg?v=3',
    bg: 'bg-brand-sky',
  },
  {
    num: '04',
    title: 'Delivery & after-care',
    desc:
      'We deliver to your farm and stay reachable for follow-ups — our team understands the local terrain, season, and herd.',
    image: '/process-04.jpg',
    bg: 'bg-brand-green-soft',
  },
];

export default function Process() {
  const [open, setOpen] = useState(0);

  return (
    <section id="process" className="relative bg-brand-paper py-20 sm:py-28 md:py-36">
      <div className="container-px mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease }}
          className="display-bold text-center text-[clamp(2rem,5.2vw,4.25rem)] text-brand-ink max-w-3xl mx-auto"
        >
          From sourcing to <span className="text-brand-green">your farm</span>
        </motion.h2>

        {/* Mobile: stacked cards */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid sm:grid-cols-2 gap-5 lg:hidden"
        >
          {steps.map((s) => (
            <motion.article
              key={s.num}
              variants={fadeUp}
              className={`relative overflow-hidden rounded-4xl ${s.bg} p-6`}
            >
              <span className="text-[11px] font-medium tracking-[0.32em] text-brand-ink/55">
                {s.num}
              </span>
              <h3 className="mt-2 font-display text-[22px] font-bold tracking-tight text-brand-ink leading-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] text-brand-ink/65 leading-relaxed">{s.desc}</p>
              <div className="mt-5 overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Desktop: horizontal accordion */}
        <div className="mt-14 hidden lg:flex gap-3 h-[520px]">
          {steps.map((s, i) => {
            const isOpen = i === open;
            return (
              <motion.div
                key={s.num}
                onClick={() => setOpen(i)}
                onMouseEnter={() => setOpen(i)}
                animate={{ flexGrow: isOpen ? 6 : 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                className={`relative cursor-pointer rounded-4xl overflow-hidden ${s.bg} flex-1 min-w-0`}
              >
                {/* Collapsed strip — vertical "OPEN" label */}
                {!isOpen && (
                  <div className="h-full flex flex-col items-center justify-between p-5">
                    <span className="text-[11px] font-medium tracking-[0.32em] text-brand-ink/55 [writing-mode:vertical-rl] rotate-180">
                      Step {s.num}
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.4em] text-brand-ink/70 [writing-mode:vertical-rl] rotate-180">
                      OPEN
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.32em] text-brand-ink/55 [writing-mode:vertical-rl] rotate-180">
                      {s.title.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Open panel */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease, delay: 0.15 }}
                    className="h-full flex flex-col p-8 lg:p-10"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-medium tracking-[0.32em] text-brand-ink/55">
                          Step {s.num}
                        </span>
                        <h3 className="mt-3 font-display text-[28px] font-bold tracking-tight text-brand-ink leading-tight max-w-md">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 max-w-lg text-[15px] text-brand-ink/65 leading-relaxed">
                      {s.desc}
                    </p>
                    <div className="mt-auto pt-6 flex-1 flex items-end">
                      <div className="w-full overflow-hidden rounded-3xl aspect-[16/9] bg-black/5">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
