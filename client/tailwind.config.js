/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1a3c2a', dark: '#0d2818', light: '#2d5a40' },
        mint: { DEFAULT: '#a7f3d0', light: '#d1fae5' },
        gold: '#eab308',
        ink: '#1a1a1a',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        float: 'float 8s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
