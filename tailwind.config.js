const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  /* if we need more colors, go to https://tailwindcss.com/docs/customizing-colors  */
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.indigo,
      secondary: colors.white,
      tertiary: colors.purple,
      gray: colors.gray,
      error: colors.red,
      teal: colors.teal
    },
    textColor: {
      primary: colors.indigo,
      secondary: colors.white,
      tertiary: colors.purple,
      error: colors.red,
      teal: colors.teal
    },
    extend: {
      backgroundImage: {
        pitch: "url('/src/img/background.svg')",
      },
    },
    screens: {
      'mobile': '640px',
      'laptop': {'max': '2000px'},
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      hover: ['disabled', 'cursor-grab', 'cursor-default'],
    },
  },
  plugins: [],
};