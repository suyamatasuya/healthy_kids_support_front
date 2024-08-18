/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFE066',
          DEFAULT: '#FFD700',
          dark: '#FFA500',
        },
      },
      fontFamily: {
        sans: ['"Rounded M+", sans-serif'],
      },
      borderRadius: {
        'xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
