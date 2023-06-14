/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      white: "#ffffff",
      black: "#000000",

      accent: {
        50 : "#f9f9ff",
        100: "#f1edff",
        200: "#d6c9fe",
        300: "#986af3",
        400: "#8d53f0",
        500: "#8338ec",
        600: "#712fcd",
        700: "#6027af",
        800: "#4f1f92",
        900: "#3f1776",
      },

      primary: {
        100: "#fff9ed",
        200: "#ffedc9",
        300: "#ffd98f",
        400: "#ffcc61",
        500: "#ffbe0b",
        600: "#dea508",
        700: "#be8c06",
        800: "#9e7504",
        900: "#805e02",
      },

      secondary: {
        50: "#ffecf0",
        100: "#ffc7d2",
        200: "#ffa0b4",
        300: "#ff7698",
        400: "#ff3f7c",
        500: "#ff006e",
        600: "#de005f",
        700: "#be0050",
        800: "#9e0041",
        900: "#7f0033",
      },

      tertiary: {
        10: "#FAFCFF",
        20: "#F5F9FF",
        50: "#ebf4ff",
        100: "#c5ddff",
        200: "#9ec5ff",
        300: "#78adff",
        400: "#5093ff",
        500: "#3a86ff",
        600: "#3174de",
        700: "#2862be",
        800: "#184080",
        900: "#092148",
      },

      dark: {
        10: "#f7f8fa",
        50: "#e6e8eb",
        100: "#cdd1d8",
        200: "#87909f",
        300: "#465369",
        400: "#324058",
        500: "#1f2e47",
        600: "#19273d",
        700: "#141f32",
        800: "#0f1828",
        900: "#0a121f",
      },

      green: {
        10: "#effbf3",
        50: "#def7e7",
        100: "#cef3db",
        200: "#abebc3",
        300: "#85e2ab",
        400: "#56d993",
        500: "#34d487",
        600: "#2cb875",
        700: "#249d63",
        800: "#156941",
        900: "#0e5131",
      },
    },

    extend: {
      borderRadius: {
        none: "0",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },


      boxShadow: {
        sm: "0 0 10px 0px rgba(0, 0, 0, 0.05)",
        md: "0 0 20px 5px rgba(0, 0, 0, 0.05)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },

      strokeWidth: {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
      },

      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        html: { color: theme("colors.dark.500") },
        "*": { fontFamily: "Satoshi, sans-serif" },
      });
    },
  ],
};
