import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
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
      },
    },
  },
  darkMode: ['class'],
  plugins: [heroui(
    {
      themes: {
        light: {
          colors: {
          // primary: "#7828c8"
          },
        },
        dark: {
          colors: {
          // primary: "#ae7ede"

        },
      }
    },
  }
)],
} satisfies Config;
