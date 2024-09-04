/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", './node_modules/preline/preline.js',],
  theme: {
    extend: {
      colors: {
         'primary': '#4eb1a9',
         'secondary': '#F2ECF9'
      },
      fontFamily: {
        'zain': ["Zain", "sans-serif"],
        'figtree': ["Figtree", "sans-serif"]
      },
      fontSize: {
        '2xs': '11px', 
        '3xs': '10px'
      },
      screens: {
        'xs': '400px',
      }, 
      animation: {
         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      boxShadow: {
         'asthetic': '[0_3px_10px_rgb(0,0,0,0.2)]'
      },
      
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

