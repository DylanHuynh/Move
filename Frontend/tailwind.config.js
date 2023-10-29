/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-color': '#FFD978',
        'secondary-color': '#00A6A6',
        'background-color': '#F8F5EE'
      }
    },
  },
  plugins: [],
}

