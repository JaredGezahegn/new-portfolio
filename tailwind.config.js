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
        'ink-black': '#0f172a',
        'paper-cream': '#F8FAFC',
        'glass': {
          'light': 'rgba(255, 255, 255, 0.1)',
          'dark': 'rgba(0, 0, 0, 0.3)',
        },
        'modern': {
          'bg': 'hsl(var(--background))',
          'fg': 'hsl(var(--foreground))',
          'card': 'hsl(var(--card))',
          'card-foreground': 'hsl(var(--card-foreground))',
          'border': 'hsl(var(--border))',
          'input': 'hsl(var(--input))',
          'ring': 'hsl(var(--ring))',
          'primary': 'hsl(var(--primary))',
          'primary-foreground': 'hsl(var(--primary-foreground))',
          'secondary': 'hsl(var(--secondary))',
          'secondary-foreground': 'hsl(var(--secondary-foreground))',
          'muted': 'hsl(var(--muted))',
          'muted-foreground': 'hsl(var(--muted-foreground))',
          'accent': 'hsl(var(--accent))',
          'accent-foreground': 'hsl(var(--accent-foreground))',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'pirate': ['Pirata One', 'cursive'],
        'manga': ['Bangers', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
