import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ease, fadeUp, stagger, viewportOnce } from '../lib/motion';

type Review = {
  stars: 4 | 5;
  quote: string;
  name: string;
  role: string;
};

const reviews: Review[] = [
  {
    stars: 5,
    quote:
      'The cattle feed from Sultan transformed our yield. Cows are healthier, milk output is consistent, and the team always picks up the phone.',
    name: 'Bilal Ahmad',
    role: 'Dairy farmer · Anantnag',
  },
  {
    stars: 4,
    quote:
      "Best prices in the valley for the quality you get. They didn't try to upsell — just gave honest advice for my goat herd.",
    name: 'Rafiq Mir',
    role: 'Livestock owner · Bijbehara',
  },
  {
    stars: 5,
    quote:
      'Their delivery reaches us even during heavy snow. That kind of reliability is rare. Sultan understands the realities of Kashmir farming.',
    name: 'Mehraj Lone',
    role: 'Cattle farm · Pahalgam',
  },
  {
    stars: 5,
    quote:
      'I switched suppliers three times before finding Sultan. The feed mix is balanced, and my poultry are visibly stronger this season.',
    name: 'Shabir Hussain',
    role: 'Poultry farm · Kulgam',
  },
  {
    stars: 5,
    quote:
      'The team helped me pick the right milking kit and even came out to check the setup. Very few suppliers go that distance.',
    name: 'Aamir Khan',
    role: 'Dairy farmer · Anantnag',
  },
];

// Pastel palette cycled across the cards so each monogram chip has its own tone.
const TONES = [
  'bg-brand-butter',
  'bg-brand-sky',
  'bg-brand-peach',
  'bg-brand-green-soft',
  'bg-brand-cream',
] as const;

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function Stars({ count }: { count: 4 | 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'text-brand-ember fill-brand-ember' : 'text-brand-line fill-brand-line'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="relative bg-brand-paper py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="container-px mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease }}
          className="display-bold text-center text-[clamp(2rem,5vw,4.25rem)] text-brand-ink max-w-3xl mx-auto"
        >
          Trusted by farmers across the valley
        </motion.h2>

        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="rounded-3xl bg-white ring-1 ring-brand-line p-6 sm:p-7 flex flex-col gap-5"
            >
              <Stars count={r.stars} />
              <blockquote className="text-[14px] sm:text-[15px] leading-relaxed text-brand-ink/85">
                {r.quote}
              </blockquote>
              <figcaption className="mt-auto pt-2 flex items-center gap-3">
                <span
                  aria-hidden
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${TONES[i % TONES.length]} ring-1 ring-black/5 text-brand-ink text-[12px] font-bold tracking-tight`}
                >
                  {initialsOf(r.name)}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-brand-ink leading-tight">{r.name}</p>
                  <p className="text-[12px] text-brand-muted">{r.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
