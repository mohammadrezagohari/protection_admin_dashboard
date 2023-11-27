/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'purple': '#820382',
        'darkBlue' : '#162C7C',
        'themeclr1':'#183087',
        'color20%':'#18308733',
        'hrcolor':'#1E88E5',
      },
    },
    fontFamily:{
        sans: ['vazir',"Roboto", "sans-serif"],
    }
  },
  plugins: [],
});
