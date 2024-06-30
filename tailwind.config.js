/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        bgSecondary: "var(--color-bg-secondary)",
        text: "var(--color-text)",
        gray: "var(--color-gray)",
        primary: "var(--color-primary)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
