const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  /* if we need more colors, go to https://tailwindcss.com/docs/customizing-colors  */
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.emerald,
      secondary: colors.white,
      gray: colors.gray,
      error: colors.red['500'],
    },
    textColor: {
      primary: colors.emerald,
      secondary: colors.white,
      error: colors.red['500'],
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      hover: ['disabled'],
    },
  },
  plugins: [],
};