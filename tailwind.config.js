const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'LiserianPurple':'#DE6FA1',
        'CustomRed':'#D6545F',
        'pearlyPurple':'#B768A2',
        'BayernBlue':'#0066b2',
        'ByzantineBlue':'#3457D5',
        'CarolinaBlue':'#4B9CD3',
        'Cerulean':'#2a52be',
        'SunsetPurple':'#A865B5',
        'SavoyBlue':'#4B61D1',
        'SlateBlue':'#6A5ACD',
        'SteelBlue':'#4682B4',
        'UCLABlue':'#2774AE',
        'Purple':'#DE6FA1',
        'PompandandPower':'#86608E',
        'MediumPurple3':'#8968CD',
        'Mulberry':'#C54B8C',
        'lightCream':'#F5EEE6',
        'pink':'#E6A4B4',
        'red1':'#D9334C',
        'pinkishRed':'#e88493',
        'grayWhite':'#cbc2c9',
        'lightWhite':'#e7e6e8',
      },
  
      animation:{
        'bounce-slow': 'bounce 4s ease-in-out infinite'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

