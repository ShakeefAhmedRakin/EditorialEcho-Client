/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#22262a",
        background: "#f9fafb",
        primary: "#353b41",
        secondary: "#6d767e",
        accent: "#adb5bd",
        textDark: "#d5d9dd",
        backgroundDark: "#040506",
        primaryDark: "#bec4ca",
        secondaryDark: "#818a92",
        accentDark: "#424a52",
      },
      fontFamily: {
        heading: ["Work Sans"],
        text: ["Merriweather"],
      },
    },
  },
  plugins: [require("daisyui")],
};
