/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      }, 
      colors: {
        primary: {
          light: '#4f83cc', // Light blue for hover states or backgrounds
          DEFAULT: '#1d4ed8', // Primary blue for buttons and links
          dark: '#1e3a8a', // Dark blue for text or headers
        },
        secondary: {
          light: '#f3f4f6', // Light gray for background
          DEFAULT: '#e5e7eb', // Default gray for borders or subtle text
          dark: '#6b7280', // Dark gray for text
        },
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem', // Custom spacing
        '22': '5.5rem',
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};




