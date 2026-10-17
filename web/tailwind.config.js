/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // The panel of the Settings: the antd modal colour (rgb(31, 31, 31)) under a 50% neutral-900
        // layer, as one solid colour so that what sticks over the scrolling content hides it.
        'settings-panel': '#1b1b1b'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
