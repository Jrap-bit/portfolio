import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        glow: 'url("/images/glow-cursor.svg"), pointer',
      }
    },
  },
  plugins: [],
};

export default config;