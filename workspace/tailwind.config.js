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
      },
      backgroundImage: {
        "split-halfday": "linear-gradient(to right bottom, #f8fafc 50% , #d4d4d4 50%);"
      }
  },
  safelist: ["bg-app", "bg-network", "bg-media", "bg-web","bg-netzfactor", "bg-netzfactor-light", "bg-netzfactor-dark"],
  plugins: [],
  }
}
