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
      slate: colors.slate,
      gray: colors.gray,
      error: colors.red,
      teal: colors.teal,
      zinc: colors.zinc,
    },
    textColor: {
      primary: colors.indigo,
      secondary: colors.white,
      gray: colors.gray,
      tertiary: colors.purple,
      error: colors.red,
      teal: colors.teal
    },
    extend: {
      backgroundImage: {
        pitch: "url('/src/img/background.svg')",
      },
      height: {
        'youtube-md': '385px',
        'youtube-lg': '505px'
      },
      width: {
        'youtube-md': '640px',
        'youtube-lg': '853px'
      },
      fontSize: {
        'tiny': '.6rem',
      },
    },

    screens: {
      'mobile': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'low-res': {'max': '1280px'},
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
