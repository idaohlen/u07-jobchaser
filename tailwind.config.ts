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
            primary: {
              50: '#f3e8ff',
              100: '#e9d5ff',
              200: '#d8b4fe',
              300: '#c084fc',
              400: '#a855f7',
              500: '#9333ea',
              600: '#7e22ce',
              700: '#6b21a8',
              800: '#581c87',
              900: '#4c1d95',
            },
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
