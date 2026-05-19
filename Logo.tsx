import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type LogoProps = {
  /** Size in px (square). Default 36. */
  size?: number;
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Whether to react to clicks with a laugh animation. Default true. */
  interactive?: boolean;
  /** Optional click handler — fires after the laugh starts. */
  onClick?: () => void;
  /** Optional aria label. */
  label?: string;
};

/**
 * Sultan Feed & Dairy mark. Click to make the cow laugh —
 * a quick head-shake + bounce sequence using framer-motion.
 */
export default function Logo({
  size = 36,
  className = '',
  interactive = true,
  onClick,
  label = 'Sultan Feed & Dairy',
}: LogoProps) {
  const [laughKey, setLaughKey] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const trigger = (e?: { currentTarget: EventTarget & HTMLElement }) => {
    setLaughKey((k) => k + 1);
    if (!audioRef.current) {
      audioRef.current = new Audio('/logo-click.mp3');
      audioRef.current.preload = 'auto';
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
    // Capture the logo's screen position so the shower originates exactly from it.
    const r = e?.currentTarget?.getBoundingClientRect();
    const origin = r
      ? { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      : null;
    window.dispatchEvent(new CustomEvent('sultan:snow', { detail: { origin } }));
    onClick?.();
  };

  return (
    <motion.span
      key={laughKey}
      aria-label={label}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? (e) => trigger(e) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger(e);
              }
            }
          : undefined
      }
      whileHover={interactive ? { scale: 1.06 } : undefined}
      animate={
        laughKey > 0
          ? {
              rotate: [0, -14, 12, -10, 9, -6, 5, -3, 2, 0],
              y: [0, -3, 0, -2, 0, -1, 0, 0, 0, 0],
              scale: [1, 1.08, 1.04, 1.07, 1.03, 1.05, 1.02, 1.01, 1, 1],
            }
          : undefined
      }
      transition={{ duration: 1.0, ease: 'easeInOut' }}
      className={`inline-flex items-center justify-center ${interactive ? 'cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper rounded-full' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt=""
        draggable={false}
        className="h-full w-full object-contain"
      />
    </motion.span>
  );
}
