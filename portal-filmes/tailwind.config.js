/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#2e2b24",
        primary_color: "#79ab7b",

        white: "#FFF",
        black: "#000",
        transparent: "#FFFFFF00"
      }
    },
  },
  plugins: [],
}