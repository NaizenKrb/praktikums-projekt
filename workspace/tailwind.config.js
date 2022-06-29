/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js}",
      "./img/**/*.{png,jpg,jpeg,gif,webp,svg}",
      "./js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: ["tailwind-scrollbar"],
}
