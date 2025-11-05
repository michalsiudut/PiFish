/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#111816',
        secondary: '#14b8a6',
        placeholders: '#61897F',
        light: {
          100: '#FFFFFF',
          200: '#F6F8F8',
          300: '#DBDBDB',
          400: '#E5E7EB',
        },
        dark: {
          100: '#000000',
          200: '#1F2937',
          300: '#111827',
        }

      }
    },
  },
  plugins: [],
};
