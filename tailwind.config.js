/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    theme:{
      "colors":defaultColors+{
        "sfu-light-red":"#CC0633",
        "sfu-dark-red":"#A6192E",
        "sfu-dark-grey":"#54585A",
        "sfu-grey":"#54585A"
      }
    },
    extend: {},
  },
  plugins: [],
}
