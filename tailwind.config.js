/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        steelBlue: '#3489BB',
        softWhite: '#E9ECEF',
        royalBlue: '#227BCE',
        'royalBlue-dark': '#1a5fa3', // Darker variant for light mode contrast
        brightTeal: '#3CB2B8',
        'brightTeal-dark': '#2d8a8f', // Darker variant for light mode contrast
        midnightBlue: '#0F172A', // Dark slate/blue background base, deep midnight blue
        neonBlue: '#227BCE', // Alias for royalBlue where used for neon
        neonTeal: '#3CB2B8', // Alias for brightTeal
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
