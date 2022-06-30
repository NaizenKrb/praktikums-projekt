/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js}",
      "./img/**/*.{png,jpg,jpeg,gif,webp,svg}",
      "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "netzfactor": "#004B7C",
        "netzfactor-light": "#0068AD",
        "netzfactor-dark": "#1D4661",
        "web": "#00b0e6",
        "media": "#ce4c34",
        "network": "#08865f",
        "app": "#e8bb40",
        "research": "#884de1",
        "consulting": "#7e8e9f",
      },
  },
  plugins: ["tailwind-scrollbar"],
  }
}
