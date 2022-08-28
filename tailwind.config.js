/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
      },
      colors: {
        zinc: {
          50: "#f8f9fa",
          100: "#eef1f2",
          200: "#dde4e6",
          300: "#c1ced2",
          400: "#95a0a3",
          500: "#434849",
          600: "#3a3e40",
          700: "#313537",
          800: "#252829",
          900: "#1f2223",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
