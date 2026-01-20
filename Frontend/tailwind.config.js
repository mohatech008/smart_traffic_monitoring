/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#003366',
        accent:'#ff6b6b',
      },
      fontFamily:{
        sans: ['"Lexend"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

