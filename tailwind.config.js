/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './snippets/customers/*.liquid',
    './templates/*.liquid',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000', // Example primary color variable (bg-black), Usage: bg-primary
        secondary: '#475569', // Example secondary color variable (bg-gray-600), Usage: bg-secondary
        bhaRed: {
          DEFAULT: '#EF2521', // Example custom bhaRed color variable, Usage: bg-bhaRed
          light: '#F54F10', // Example light variant of custom bhaRed color, Usage: bg-bhaRed-light
          dark: '#991714', // Example dark variant of custom bhaRed color, Usage: bg-bhaRed-dark
        },
      },
      height: {
        '92': '22rem' // Example custom 92 height variable, Usage: h-92
      }
    },
  },
  variants: {},
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
    // require('prettier-plugin-tailwindcss'),
  ],
}

