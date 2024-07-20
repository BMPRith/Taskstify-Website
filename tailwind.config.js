/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,css,js,jsx}"],
  theme: {
    extend: {
      animation: {
        rotateRightToLeft: 'rotateRightToLeft 2s linear infinite',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}