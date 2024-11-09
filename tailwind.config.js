/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        main_layout: 'auto 1fr',
      },
      gridTemplateRows: {
        main_layout: 'auto 1fr',
      },
    },
  },
  plugins: [],
};
