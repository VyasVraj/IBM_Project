/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4F46E5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        secondary: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7C3AED",
          700: "#6d28d9",
        },
        accent: {
          400: "#22d3ee",
          500: "#06B6D4",
          600: "#0891b2",
        },
        success: {
          500: "#10B981",
          600: "#059669",
        },
        danger: {
          400: "#f87171",
          500: "#EF4444",
          600: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float 5s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(4px)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31,38,135,0.15)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.3)",
        glow: "0 0 20px rgba(79,70,229,0.4)",
        "glow-accent": "0 0 20px rgba(6,182,212,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06B6D4 100%)",
        "gradient-primary": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        "gradient-accent": "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
      },
    },
  },
  plugins: [],
}
