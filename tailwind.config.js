/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4e59f2',
        'primary-light': '#edf1fd',
        background: '#f7f8fa',
        border: '#e5e6eb',
        textMain: '#1d2129',
        textSub: '#86909c'
      }
    },
  },
  plugins: [],
}