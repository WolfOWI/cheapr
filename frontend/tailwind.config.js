/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // Ensures Tailwind takes precedence above Bootstrap
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C34534",
        priM1: "#9A3629",
        priP1: "#f2887c",
        highlight: "#F6D8D8",
        secondary: "#2F65A5",
        secM1: "#1E4B80",
      },
      fontFamily: {
        inter: ["Inter Variable", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
