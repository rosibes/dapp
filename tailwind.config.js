/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"], // Scanează toate fișierele JS și JSX din `src`
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0f172a',  // Adăugați culoarea personalizată
      },
    },
  },
  plugins: [],
};
