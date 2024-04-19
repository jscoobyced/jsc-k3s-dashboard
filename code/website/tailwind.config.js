/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '389px',
        sm: '640px',
        md: '820px',
        lg: '1000px'
      },
      colors: {
        primary: {
          bg: 'rgb(10, 10, 10)',
          color: 'rgb(80, 80, 80)',
          link: 'rgb(77, 195, 255)'
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
}
