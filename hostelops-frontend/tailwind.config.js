/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFE9A7', // Matched yellow from screenshot
          orange: '#FFB300', // Slightly lighter orange
          dark: '#18181B',   // For dark backgrounds
          gray: '#23272F',   // For navbar/footer backgrounds
        },
      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}