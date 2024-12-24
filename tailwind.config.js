/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./css/**/*.css"],
  theme: {
    extend: {
      colors: {
        kuromiBlack: "#363232",
        kuromiGreyDark: "#565656",
        kuromiGreyLight: "#6b6b6b",
        kuromiPink: "#eea1e3",
        kuromiLightPink: "#f4b5eb",
      },
      fontFamily: {
        Hachi: ["Hachi Maru Pop", "cursive"],
        Outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
