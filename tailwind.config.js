module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
  ],
  theme: {
    extend: {
            // that is animation class
            animation: {
              fadeIn: 'fadeIn 300ms linear',
              fadeOut: 'fadeOut 300ms linear',
            },
      
            // that is actual animation
            keyframes: theme => ({
              fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
              fadeOut: {
                '0%': { opacity: 1 },
                '100%': { opacity: 0, display: 'none' },
              },
            }),
    },
  },
  plugins: [],
}