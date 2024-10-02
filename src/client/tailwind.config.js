/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '389px',
        sm: '640px',
        md: '820px',
        lg: '1000px',
      },
      colors: {
        primary: {
          bg: 'rgb(10, 10, 10)',
          color: 'rgb(130, 140, 160)',
          link: 'rgb(77, 195, 255)',
          error: 'rgb(255, 77, 77)',
        },
        secondary: {
          bg: 'rgb(32, 32, 32)',
          color: 'rgb(208, 208, 208)',
        },
        tertiary: {
          bg: 'rgb(152, 163, 181)',
          color: 'rgb(36, 37, 41)',
        },
      },
    },
    fontFamily: {
      primary: ['Montserrat'],
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
