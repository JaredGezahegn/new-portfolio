/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pirate-red': '#DC143C',
        'pirate-red-dark': '#8B0000',
        'pirate-gold': '#FFD700',
        'pirate-gold-dark': '#DAA520',
        'ocean-blue': '#1E3A8A',
        'ocean-blue-light': '#3B82F6',
        'ink-black': '#1a1a1a',
        'paper-cream': '#F5E6D3',
      },
      fontFamily: {
        'pirate': ['Pirata One', 'cursive'],
        'manga': ['Bangers', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
