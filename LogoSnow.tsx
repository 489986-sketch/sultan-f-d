import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

type Origin = { x: number; y: number } | null;

type Props = {
  /** Total number of logos to drop. Default 200. */
  count?: number;
  /** Lifetime of the snowfall before auto-cleanup (ms). Default 4000. */
  durationMs?: number;
  /** Screen-space origin (px). Flakes spawn here and spread out as they fall.
   *  If null, falls back to the top center of the viewport. */
  origin?: Origin;
  /** Called once the snowfall finishes so the parent can unmount us. */
  onComplete?: () => void;
};

type Flake = {
  id: number;
  /** Horizontal jitter offset from the origin (px). */
  jitterX: number;
  /** Vertical jitter offset from the origin (px). */
  jitterY: number;
  /** Horizontal drift across the fall (px). Negative = left, positive = right. */
  drift: number;
  /** Square size (px). */
  size: number;
  /** Fall duration (s). */
  duration: number;
  /** Stagger delay (s). */
  delay: number;
  /** Rotation across the fall (degrees). */
  rotate: number;
  /** Per-flake max opacity. */
  opacity: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Showers logo copies outward from a single origin point (the logo's screen
 * position at click time). Each flake spawns near that origin with a small
 * jitter, then falls past the bottom of the viewport with horizontal drift
 * so the column fans out as it descends.
 */
export default function LogoSnow({
  count = 200,
  durationMs = 4000,
  origin,
  onComplete,
}: Props) {
  // Fallback origin: top center of viewport
  const o: { x: number; y: number } = origin ?? {
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: 40,
  };

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  // Target a visible mid-fall spread of ~70% of viewport. Because flakes are
  // staggered (delays + varying durations), we set the theoretical max wider
  // so the spread during the visible window of the shower lands at ~70%.
  const driftRange = vw * 0.5;

  const flakes = useMemo<Flake[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        // Tight jitter around the logo — they emerge from the mark itself.
        jitterX: rand(-24, 24),
        jitterY: rand(-14, 14),
        // Wide horizontal drift over the fall — covers ~70% of the screen.
        drift: rand(-driftRange, driftRange),
        size: rand(54, 120),
        duration: rand(2.6, 4.0),
        delay: rand(0, 1.2),
        rotate: rand(-540, 540),
        opacity: rand(0.55, 1),
      })),
    [count, driftRange],
  );

  useEffect(() => {
    const t = window.setTimeout(() => onComplete?.(), durationMs);
    return () => window.clearTimeout(t);
  }, [durationMs, onComplete]);

  // How far each flake needs to fall vertically: from the origin to past the
  // viewport bottom. Computed once at mount.
  const fallDistance =
    (typeof window !== 'undefined' ? window.innerHeight : 800) - o.y + 160;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      {flakes.map((f) => (
        <motion.img
          key={f.id}
          src="/logo.png"
          alt=""
          draggable={false}
          initial={{ x: f.jitterX, y: f.jitterY, opacity: 0, rotate: 0 }}
          animate={{
            x: f.jitterX + f.drift,
            y: fallDistance,
            rotate: f.rotate,
            opacity: [0, f.opacity, f.opacity, f.opacity * 0.85, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            ease: [0.45, 0.05, 0.55, 0.95],
            opacity: {
              duration: f.duration,
              delay: f.delay,
              times: [0, 0.08, 0.55, 0.9, 1],
              ease: 'linear',
            },
          }}
          style={{
            position: 'absolute',
            // Anchor each flake at the logo's center (offset back by half-size).
            left: o.x - f.size / 2,
            top: o.y - f.size / 2,
            width: f.size,
            height: f.size,
            objectFit: 'contain',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}
