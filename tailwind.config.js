/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  content: {
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
