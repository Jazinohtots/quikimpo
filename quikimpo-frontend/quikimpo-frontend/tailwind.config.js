/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pulled directly from static/css/styles.css so the React frontend
        // matches the brand already established in the Django templates.
        ink: "#0f172a",     // .site-header background
        paper: "#f5f7fa",   // body background
        text: "#1f2937",    // body text
        sky: "#38bdf8",     // .logo / .btn-primary accent
        skyDark: "#0ea5e9", // .btn-primary:hover
        amber: "#e8a000",   // focus ring / secondary accent
        line: "#e2e8f0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
