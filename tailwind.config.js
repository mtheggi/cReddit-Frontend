/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reddit_dark: "#030303",
        reddit_search: "#1A282C",
        reddit_navbar: "#0C1416",
        reddit_sky: "#50E9F4",
        reddit_search_light: "#213236",
      },
      spacing: {
        '1%': '1%',
        '1.5%': '1.5%',
        '2%': '2%',
        '3%': '3%',
        '4%': '4%',
        '5%': '5%',
        '5.5%': '5.5%',
        '5.6%': '5.6%',
        '5.7%': '5.7%',
        '6%': '6%',
        '7%': '7%',
        '8%': '8%',
        '9%': '9%',
        '10%': '10%',
        '11%': '11%',
        '12%': '12%',
        '20%': '20%',
        '21%': '21%',
        '22%': '22%',
        '28%': '28%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%',
        '100%': '100%',
        '30': '120px',
      },
    },
    screens: {
      '2xs': '220px',
      // => @media (min-width: 220px) { ... }

      'xs': '470px',
      // => @media (min-width: 470px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

