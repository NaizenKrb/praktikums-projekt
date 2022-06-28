/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js}",
      "./img/**/*.{png,jpg,jpeg,gif,webp,svg}"
  ],
  theme: {
    extend: {},
  },
  plugins: ["tailwind-scrollbar"],
}
