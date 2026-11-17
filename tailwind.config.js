/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'locos-black': '#090b10',
        'locos-surface': '#11141c',
        'locos-gold': '#d4af37',
        'locos-gold-bright': '#e8c75a',
        'locos-paper': '#f5f4f0',
      },
      fontFamily: {
        sans: ['"Darker Grotesque"', 'Arial', 'sans-serif'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}
