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
        background: "#fafaf2",
        primary: "#066666",
      },
      animation: {
        "bounce-slow": "bounceSlow 8s ease-in-out infinite",
        "delay-2000": "bounceSlow 8s ease-in-out infinite 2s",
        "delay-3000": "bounceSlow 8s ease-in-out infinite 3s",
        "delay-4000": "bounceSlow 8s ease-in-out infinite 4s",
        "delay-5000": "bounceSlow 8s ease-in-out infinite 5s",
        "delay-6000": "bounceSlow 8s ease-in-out infinite 6s",
      },
      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(-20px)" },
          "50%": { transform: "translateY(20px)" },
        },
      },
    },
  },
  plugins: [],
};
