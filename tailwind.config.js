/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0b1b3a',
        navy: '#0f1d3a',
        cyan: '#2dd4f7',
        accent: '#60a5fa',
        surface: '#0b1224',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 50px rgba(45, 212, 247, 0.12)',
      },
    },
  },
  plugins: [],
};
