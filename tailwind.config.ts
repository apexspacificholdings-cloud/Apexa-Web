import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode — warm ivory editorial
        ivory:   { DEFAULT: '#F5F0E8', 50: '#FDFBF8', 100: '#F5F0E8', 200: '#EDE4D5', 300: '#DDD0BB' },
        stone:   { DEFAULT: '#E0D5C5', 100: '#F0EBE0', 200: '#E0D5C5', 300: '#C8BAA5' },
        charcoal:{ DEFAULT: '#1C1917', 600: '#44403C', 700: '#292524', 800: '#1C1917', 900: '#0C0A09' },
        muted:   { DEFAULT: '#78716C', light: '#A8A29E' },
        bronze:  { DEFAULT: '#A07850', light: '#C4986A', dark: '#7A5830' },
        // Dark mode — rich near-black with warm undertones
        obsidian:{ DEFAULT: '#0F0E0C', 100: '#1A1916', 200: '#242220', 300: '#2E2C29' },
        // Accent — used sparingly
        gold:    { DEFAULT: '#C8A96E', light: '#DFC08A', dark: '#A08040' },
      },
      fontFamily: {
        // Display: editorial serif for headings
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Body: clean humanist sans
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // Mono: coordinates, metadata
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Custom editorial type scale
        'display-2xl': ['clamp(3.5rem, 8vw, 7rem)',    { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3.75rem)',   { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.5rem)',  { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-sm':  ['clamp(1.125rem, 2vw, 1.5rem)',{ lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'label-lg':    ['0.875rem',   { lineHeight: '1', letterSpacing: '0.12em' }],
        'label-md':    ['0.75rem',    { lineHeight: '1', letterSpacing: '0.15em' }],
        'label-sm':    ['0.6875rem',  { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      spacing: {
        'section': 'clamp(5rem, 10vw, 9rem)',
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
        'gutter': 'clamp(1.5rem, 5vw, 4rem)',
      },
      maxWidth: {
        'container': '1440px',
        'content': '1200px',
        'narrow': '760px',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'entry':   'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'exit':    'cubic-bezier(0.4, 0.0, 1, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
