/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rtw: "#3daaa3",
        hoverrtw: "#30847f",
        açıkrtw: "#eefaf9",
      },
      fontFamily: {
        mono: ["Monofonto", "sans-serif"],
        
      },
    },
    screens: {
      xs: "412px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "1xl": "413px",
      "2xl": "1500px",
      "3xl": "1800px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
