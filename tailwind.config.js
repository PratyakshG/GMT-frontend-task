/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          1: "#101010",
        },
        gray: {
          1: "#878787",
        },
        primary: "#FE8C00",
      },
    },
  },
  plugins: [],
};
