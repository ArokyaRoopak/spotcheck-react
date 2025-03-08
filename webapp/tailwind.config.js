/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      noto: ["Noto Sans", "sans-serif"],
    },
    extend: {
      colors: {
        background: "#f3f9e8",
        primary: "#1a756a",
      },
    },
  },
  plugins: [],
};
