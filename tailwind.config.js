const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans'],
      mono: ['"Roboto Mono"', 'monospaced'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
