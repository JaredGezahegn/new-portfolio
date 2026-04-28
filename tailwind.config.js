/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Custom breakpoints for better mobile experience
      'touch': { 'raw': '(hover: none)' },
      'mouse': { 'raw': '(hover: hover)' },
    },
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
      fontSize: {
        'fluid-xs': ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.6' }],
        'fluid-lg': ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.5' }],
        'fluid-2xl': ['clamp(1.5rem, 5vw, 2rem)', { lineHeight: '1.3' }],
        'fluid-3xl': ['clamp(1.875rem, 6vw, 2.5rem)', { lineHeight: '1.2' }],
        'fluid-4xl': ['clamp(2.25rem, 7vw, 3.5rem)', { lineHeight: '1.1' }],
        'fluid-5xl': ['clamp(2.5rem, 8vw, 4.5rem)', { lineHeight: '1.1' }],
        'fluid-6xl': ['clamp(3rem, 9vw, 6rem)', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'fluid-xs': 'clamp(0.5rem, 2vw, 1rem)',
        'fluid-sm': 'clamp(1rem, 3vw, 1.5rem)',
        'fluid-md': 'clamp(1.5rem, 4vw, 2rem)',
        'fluid-lg': 'clamp(2rem, 5vw, 3rem)',
        'fluid-xl': 'clamp(3rem, 6vw, 4rem)',
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
  // Enable container queries
  container: {
    center: true,
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
  },
}
