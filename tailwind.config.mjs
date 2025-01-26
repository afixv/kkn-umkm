/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#FEE8D8",
          100: "#fdd9be",
          200: "#fdc79e",
          300: "#fcb47d",
          400: "#fba15d",
          500: "#fa8e3c",
          600: "#d07632",
          700: "#a75f28",
          800: "#7d471e",
          900: "#532f14",
          darkest: "#321c0c",
          DEFAULT: "#fa8e3c",
        },
      },
      boxShadow: {
        light: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        medium: "0px 2px 25px 0px rgba(0, 0, 0, 0.07)",
        dark: "0px 2px 7px 0px rgba(0, 0, 0, 0.15)",
        deep: "0px 2px 7px 0px rgba(0, 0, 0, 0.2)",
        bottom: "0px 4px 4px 0px rgba(0, 14, 51, 0.04)",
        up: "0px -4px 4px 0px rgba(0, 14, 51, 0.04)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), heroui()],
};
