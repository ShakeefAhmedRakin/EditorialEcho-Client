/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#22262a",
        background: "#f9fafb",
        primary: "#131112",
        secondary: "#644125",
      },
      fontFamily: {
        heading: ["Work Sans"],
        text: ["Merriweather"],
      },
    },
  },
  plugins: [require("daisyui")],
};
