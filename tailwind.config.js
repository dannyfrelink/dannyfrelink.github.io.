/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFF8F2",
        secondary: "#687B68",
        tertair: "#868198",
        background: "#E8DFD1",
      },
      keyframes: {
        menuFadeIn: {
          "0%": { transform: "translate(-100vw)" },
          "100%": { transform: "translate(0)" },
        },
        blogsFadeIn: {
          "0%": { top: "-15rem" },
          "100%": { top: "3rem" },
        },
      },
      boxShadow: {
        subtle: "0px 3px 15px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
