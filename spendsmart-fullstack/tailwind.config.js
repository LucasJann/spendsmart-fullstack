/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #F1AA03 0%, #F1AA03 50%, #FFFF00 50%, #FFFF00 100%)',
      },
    },
  },
  plugins: [],
};