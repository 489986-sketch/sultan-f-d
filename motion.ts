import type { Variants } from 'framer-motion';

// Editorial easing — smooth deceleration, the gold standard for premium UI motion.
export const ease = [0.16, 1, 0.3, 1] as const;
export const easeSnappy = [0.4, 0, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease } },
};

export const stagger = (delay = 0.08, initial = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren: initial },
  },
});

export const viewportOnce = { once: true, margin: '-80px' } as const;

// Word-by-word reveal — used for editorial headlines.
// Wrap each word with `.word-mask` and use this as the inner motion span.
export const wordRise: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.95, ease },
  },
};

// Parent for word-rise sequences
export const wordContainer = (delay = 0.06, initial = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren: initial },
  },
});
