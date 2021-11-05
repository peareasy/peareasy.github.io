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
    },
    textColor: {
      primary: colors.indigo,
      secondary: colors.white,
      tertiary: colors.purple,
      error: colors.red,
    },
    extend: {
      backgroundImage: {
        pitch: "url('/src/img/background.jpg')",
      },
    },
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