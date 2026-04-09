/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a3a6b',
        'sky-blue': '#b8d4f5',
        'mid-blue': '#7aaee0',
        'light-blue': '#e6f1fb',
        cream: '#faf8f3',
        gold: '#c9a84c',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
