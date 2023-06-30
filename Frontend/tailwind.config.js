/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dm: '#0a0c10',
        'dm-lite': '#0f1218'
      }
    }
  },
  plugins: []
}
