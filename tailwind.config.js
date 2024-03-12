/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'black': '#1A1C20',
        'gold': '#F0A500',
        'copper': '#CF7500',
        'silver': '#F4F4F4'
      }
    },
  },
  plugins: [],
}

