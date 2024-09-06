/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridAutoColumns: {
        "2fr": "minmax(0, 2fr)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
