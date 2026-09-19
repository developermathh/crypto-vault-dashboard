/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0B0C0E',
          900: '#0E1013',
          850: '#13151A',
          800: '#171A21',
          700: '#1C1F28',
          600: '#222630',
          500: '#2A2E3A',
          400: '#3A3F4D',
        },
        pos: { DEFAULT: '#10B981', dim: '#0B6B4F' },
        neg: { DEFAULT: '#EF4444', dim: '#9B2D2D' },
        gold: { DEFAULT: '#F59E0B', dim: '#92590A' },
        info: { DEFAULT: '#3B82F6', dim: '#1E4F8F' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        flashUp: { '0%': { color: '#10B981' }, '100%': { color: 'inherit' } },
        flashDown: { '0%': { color: '#EF4444' }, '100%': { color: 'inherit' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        flashUp: 'flashUp 0.6s ease-out',
        flashDown: 'flashDown 0.6s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
