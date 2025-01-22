/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        wood: "#9D6C3C",
        blacky: "#0c0a09",
        blackBG: "#000914",
        maroon: "#6E260E",
        saddle: "#8B4513",
        blueish: "#0173bc",
        mainColor: "#007BC4",
        columbiaBlue: "#B9D9EB",
        russet: {
          DEFAULT: "#80461B",
          50: "rgba(128, 70, 27, 0.3)",
        },
        sienna: "#A0522D",
        smokyblack: "#100C08",
        whity: "#f5f5f5",
        wooden: "#A0522D",
        blackCustom: "#1f1f24",
        blackCustomBg: "#0A0A0A",
        greyCustom: "#A5A5A5",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        sourceSans: ['"Source Sans 3"', "sans-serif"],
        garamond: ["EB Garamond", "serif"],
        playfair: ["Playfair Display", "serif"],
        cinzel: ["Cinzel", "serif"],
        baskerville: ["Libre Baskerville", "serif"], // Baskerville is often found as Libre Baskerville
        caslon: ["DM Serif Text", "serif"], // Caslon alternative, not exact but close in style
        cormorant: ["Cormorant Garamond", "serif"],
        greatVibes: ["Great Vibes", "cursive"],
        lora: ["Lora", "serif"],
      },
      screens: {
        1160: "1160px",
        950: "950px",
        940: "940px",
        950: "950px",
      },
    },
  },
  plugins: [flowbitePlugin],
};