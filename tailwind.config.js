const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans'],
      mono: ['"Roboto Mono"', 'monospaced'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      red: {
        extraLight: colors.red[100],
        light: colors.red[400],
        DEFAULT: colors.red[500],
        dark: colors.red[600],
      },
      orange: {
        light: colors.orange[400],
        DEFAULT: colors.orange[500],
        dark: colors.orange[600],
      },
      yellow: {
        light: colors.yellow[300],
        DEFAULT: colors.yellow[400],
        dark: colors.yellow[500],
      },
      green: {
        light: colors.green[400],
        DEFAULT: colors.green[500],
        dark: colors.green[600],
      },
      blue: {
        light: colors.blue[400],
        DEFAULT: colors.blue[500],
        dark: colors.blue[600],
      },
      purple: {
        light: colors.purple[400],
        DEFAULT: colors.purple[500],
        dark: colors.purple[600],
      },
    },
    variants: {
      extend: {},
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addComponents, theme }) {
      const buttons = {
        '.btn-purple': {
          backgroundColor: theme('colors.purple.DEFAULT'),
          color: '#fff',
          ':hover': {
            backgroundColor: '#2779bd',
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a',
          },
        },
      }

      addComponents(buttons)
    }),
  ],
}
