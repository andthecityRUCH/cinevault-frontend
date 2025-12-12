module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cv-bg: "#0b1020",
        cv-card: "#0f1724",
        cv-muted: "#97a3b2",
        cv-accent: "#f6b244"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        ui: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
}
