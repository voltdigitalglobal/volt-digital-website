import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1071FF",
        background: "#010C19",
        surface: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ['"Story Script"', "cursive"],
      },
      letterSpacing: {
        tight2: "-0.02em",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(60% 60% at 50% 40%, rgba(16,113,255,0.35) 0%, rgba(1,12,25,0) 70%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
