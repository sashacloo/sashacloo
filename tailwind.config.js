/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    screens: {
      '375': '375px',
      '400': '400px',
      '500': '500px',
      '600': '600px',
      '800': '800px',
      '900': '900px',
      '1000': '1000px',
      '1200': '1200px',
      '1400': '1400px',
      '1600': '1600px',
    },
    borderRadius: {
      DEFAULT: '5px',
    },
    colors: {
      black: '#000000',
      darkgrey: '#333333',
      current: 'currentColor',
      transparent: 'transparent',
      grey: '#888888',
      white: '#FFFFFF',
    },
    container: {
      center: true,
    },
    extend: {
      transitionProperty: {
        'height': 'height',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
