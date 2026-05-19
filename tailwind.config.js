/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary brand
          green: {
            DEFAULT: '#0E5C3A',
            deep: '#072B1B',
            soft: '#E8F1E5',
            mist: '#F1F6EE',
            line: '#D6E2D9',
          },
          // Dark-theme forest greens — used for the rich, deep green page theme.
          forest: {
            DEFAULT: '#1a3d2b',
            deep: '#14532d',
            light: '#1e4d35',
            dark: '#163a28',
            darker: '#0f2a1c',
          },
          // Bright accent for headline pops on dark surfaces.
          lime: '#4ade80',
          // Warm cream for body text on dark backgrounds.
          linen: '#F5F5F0',
          // Editorial pastel companions
          cream: '#F5EFE3',
          peach: '#F7DDD0',
          butter: '#FCF1D2',
          sky: '#DCE7F0',
          lilac: '#E8E2EE',
          // Surfaces
          bg: '#FAFAF7',
          paper: '#FFFFFF',
          ink: '#0A0A0A',
          muted: '#6B6F6A',
          line: '#E8E8E3',
          // Highlight
          ember: '#F4A37A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Funnel Display"', 'Inter', 'system-ui', 'sans-serif'],
        techno: ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        display: '-0.055em',
        mega: '-0.06em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        soft: '0 24px 48px -28px rgba(7, 43, 27, 0.18), 0 6px 16px -10px rgba(7, 43, 27, 0.12)',
        card: '0 1px 0 rgba(0,0,0,0.04), 0 4px 16px -4px rgba(7,43,27,0.08)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
