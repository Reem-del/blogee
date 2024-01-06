/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",,
  ],
  theme: {
    extend: {
      screens:{
        xs:'640px'
      }
    },
  },
  plugins: [],
}