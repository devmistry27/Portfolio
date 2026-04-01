/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'var(--color-dark-bg)',
          primary: 'var(--color-dark-primary)',
          primaryAlt: 'var(--color-dark-primary-alt)',
          secondary: 'var(--color-dark-secondary)',
          tertiary: 'var(--color-dark-tertiary)',
          border: 'var(--color-dark-border)',
          midnight: 'var(--color-dark-midnight)',
        },
        light: {
          primary: 'var(--color-light-primary)',
          warm: 'var(--color-light-warm)',
          cream: 'var(--color-light-cream)',
          sand: 'var(--color-light-sand)',
          taupe: 'var(--color-light-taupe)',
        },
        brand: {
          red: 'var(--color-brand-red)',
          orange: 'var(--color-brand-orange)',
          green: 'var(--color-brand-green)',
        },
        btn: {
          'primary-hover': 'var(--color-btn-primary-hover)',
          'primary-text-hover': 'var(--color-btn-primary-text-hover)',
          'secondary-hover': 'var(--color-btn-secondary-hover)',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'marquee-left': 'marqueeLeft 30s linear infinite',
        'marquee-right': 'marqueeRight 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
