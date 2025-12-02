// import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        // existing color variables...
        border: "hsl(var(--border))",
        // ...

        // 🎨 Vibrant Design Color Palette
        brand: {
          nike: "#111111", // Deep black
          adidas: "#0085C7", // Blue
          puma: "#C8102E", // Red
          converse: "#000000", // Classic black
          vans: "#DA291C", // Red-orange
          newbalance: "#A6192E", // Maroon-red
        },

        gradient: {
          pinkPurple: "#ff416c", // Gradient colors for backgrounds
          purpleBlue: "#8e2de2",
          blueGreen: "#2193b0",
          orangeYellow: "#f12711",
          greenTeal: "#11998e",
        },

        ui: {
          primary: "#6366f1", // Indigo
          secondary: "#f43f5e", // Rose
          success: "#22c55e", // Green
          warning: "#facc15", // Yellow
          danger: "#ef4444", // Red
          info: "#3b82f6", // Blue
          dark: "#111827", // Dark slate
        },

        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.4)",
          frosted: "rgba(255, 255, 255, 0.3)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}; // satisfies Config; \\
