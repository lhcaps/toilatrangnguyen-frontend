/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#eaeaea',
        midBg: '#acaba9',
        darkBg: '#75706f',
        darkerBg: '#2c2c2c',
        blackBg: '#121212',
        accent: '#8e05c2',
        'surface': '#1c1c1c',
        'surface-dark': '#181818',
      },
      fontFamily: {
        valky: ['Valky', 'serif'],
        sans: ['Cabin', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0,0,0,0.1)',
        'md-dark': '0 2px 6px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
