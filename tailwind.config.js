/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'solar-yellow': '#FFD700',
        'solar-green': '#4CAF50',
      },
    },
  },
  plugins: [],
};