/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Añade otros colores que necesites
      },
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
        background: theme('colors.background')
      }),
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        border: theme('colors.border')
      }),
    },
  },
  plugins: [],
}