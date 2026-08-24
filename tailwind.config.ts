import type { Config } from 'tailwindcss'

/**
 * Every color the site is allowed to use lives here. Components reference the
 * names, never the hex values, so the palette can only change in one place.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0A1628',
          800: '#0F1F3D',
          700: '#16284F',
          600: '#1E3A6E',
          500: '#2B4F96',
          300: '#7D9FDB',
        },
        accent: {
          DEFAULT: '#38BDF8',
          2: '#34D399',
        },
        bg: '#FFFFFF',
        fg: '#0A1628',
        muted: {
          DEFAULT: '#64748B',
          fg: '#475569',
        },
        border: '#E2E8F0',
        card: {
          DEFAULT: '#F8FAFC',
          2: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '12px',
        md: '10px',
        sm: '8px',
      },
      fontSize: {
        eyebrow: ['0.5625rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        note: ['0.8125rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        shell: '1120px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        enclave: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
