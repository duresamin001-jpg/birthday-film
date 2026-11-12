/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080a24',
          900: '#0c1033',
          800: '#141846',
        },
        gold: {
          DEFAULT: '#f1cf86',
          light: '#fff3cf',
          bright: '#ffd875',
          deep: '#d4aa52',
        },
        rose: {
          DEFAULT: '#f6b6d6',
          light: '#fce2ee',
          soft: '#e89abf',
        },
        lavender: {
          DEFAULT: '#c9b7e9',
          light: '#e5dcfa',
        }
      },
      fontFamily: {
        decorative: ['"Cinzel Decorative"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 35px rgba(241, 207, 134, 0.45)',
        'rose-glow': '0 0 30px rgba(246, 182, 214, 0.35)',
        'deep-pool': '0 0 80px 40px rgba(8, 10, 36, 0.75)',
      }
    },
  },
  plugins: [],
}
