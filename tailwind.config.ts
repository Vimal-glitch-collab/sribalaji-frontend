// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          charcoal: "#141414",
          charcoal2: "#1E1E1E",
          charcoal3: "#2A2A2A",
          yellow: "#F5A623",
          "yellow-dark": "#D4891A",
          "yellow-light": "#FFB84D",
          gray: "#888888",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
        sans: ["Barlow", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-in": "fadeIn 0.5s ease both",
        "float": "float 4s ease-in-out infinite",
        "marquee": "marqueeLTR 30s linear infinite",
        "spin-slow": "spinSlow 10s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(32px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        marqueeLTR: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 20px rgba(245,166,35,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245,166,35,0.7)" },
        },
      },
      backdropBlur: { xs: "2px" },
      clipPath: {
        "skew-right": "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      },
    },
  },
  plugins: [],
};

export default config;
