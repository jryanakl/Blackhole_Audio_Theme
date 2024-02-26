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
    extend: {},
  },
plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
}

