/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', '../shared/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf9f0',
          100: '#f8efd9',
          200: '#efdcb2',
          300: '#e4c184',
          400: '#d9a45c',
          500: '#cf8c3f',
          600: '#b87132',
          700: '#99562b',
          800: '#7d4528',
          900: '#663a24',
        },
        emerald: {
          deep: '#0f3d2e',
        },
        night: '#101b16',
        gold: '#c9a227',
      },
      fontFamily: {
        sans: ['Cairo', 'Segoe UI', 'Tahoma', 'sans-serif'],
        display: ['Amiri', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(16, 27, 22, 0.35)',
      },
      backgroundImage: {
        'oriental-pattern':
          "radial-gradient(circle at 1px 1px, rgba(201, 162, 39, 0.18) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
