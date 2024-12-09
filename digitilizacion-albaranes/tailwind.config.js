/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        'host': ['Host Grotesk', 'sans-serif'],
        'sour-gummy': ['Source Sans Pro', 'sans-serif'],
        'jaro': ['Jaro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
