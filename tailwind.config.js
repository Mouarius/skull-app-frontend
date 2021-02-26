/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans'],
      mono: ['"Roboto Mono"', 'monospaced'],
      display: ['Poppins', 'sans'],
    },
    extend: {
      keyframes: {
        fadeSlide: {
          from: { transform: 'translateY(-5em)', opacity: '0%' },
          to: { transform: 'translateY(0)', opacity: '100%' },
        },
      },
      animation: {
        'fade-slide-in': 'fadeSlide 1.5s ease-out 5s',
      },
      backgroundImage: (theme) => ({
        'app-dots': "url('./assets/body_background.svg')",
      }),
      borderWidth: {
        10: '10px',
        12: '12px',
        18: '18px',
      },
      colors: {
        white: colors.white,
        black: colors.black,
        content: {
          100: colors.gray[100],
          200: colors.gray[200],
          300: colors.gray[300],
          400: colors.gray[400],
          500: colors.gray[500],
          600: colors.gray[600],
          700: colors.gray[700],
          800: colors.gray[800],
        },
        red: {
          extraLight: colors.red[100],
          light: colors.red[400],
          DEFAULT: '#f94144',
          dark: colors.red[600],
        },
        orange: {
          light: colors.orange[400],
          DEFAULT: '#f3722c',
          dark: colors.orange[600],
        },
        yellow: {
          light: colors.yellow[300],
          DEFAULT: '#f9c74f',
          dark: colors.yellow[500],
        },
        green: {
          light: colors.green[400],
          DEFAULT: '#90be6d',
          dark: colors.green[600],
        },
        blue: {
          light: colors.blue[400],
          DEFAULT: '#277da1',
          dark: colors.blue[600],
        },
        purple: {
          light: colors.purple[400],
          DEFAULT: '#577590',
          dark: colors.purple[600],
        },
        primary: {
          dark: '#f58a08',
          DEFAULT: '#f3722c',
        },
      },
    },
  },
  variants: {
    extend: {
      transform: ['active'],
      scale: ['active'],
      translate: ['active', 'group-hover'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      borderColor: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['hover'],
    },
  },
  plugins: [
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
      };

      addComponents(buttons);
    }),
  ],
};
