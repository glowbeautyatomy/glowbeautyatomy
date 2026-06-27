import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        atomy: {
          DEFAULT: '#00AEEF',
          dark: '#0072BC',
        },
        // Editorial Luxe palette — Atomy blue on cool neutral
        luxe: {
          cream: '#F6F8FA',
          paper: '#FFFFFF',
          ink: '#15181C',
          muted: '#5B6670',
          line: '#E4E9EE',
          accent: '#00AEEF', // Atomy blue
          'accent-dark': '#0091CC',
          blush: '#E3F1FB',
          sand: '#EAF1F7',
          promo: '#00AEEF', // Atomy blue promo bar
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1.5%)' },
        },
        'soft-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%,-4%,0) scale(1.06)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(150%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
        kenburns: 'kenburns 16s ease-in-out infinite alternate',
        'soft-drift': 'soft-drift 16s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,26,23,0.04), 0 14px 36px -20px rgba(28,26,23,0.22)',
        'card-hover': '0 2px 6px rgba(28,26,23,0.06), 0 28px 60px -28px rgba(28,26,23,0.3)',
        soft: '0 18px 50px -24px rgba(28,26,23,0.25)',
      },
    },
  },
  plugins: [typography],
}

export default config
