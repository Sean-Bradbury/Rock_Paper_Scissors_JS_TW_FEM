module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
  ],
  theme: {
    extend: {
            // that is animation class
            animation: {
              fade: 'fadeIn 300ms ease-in',
            },
      
            // that is actual animation
            keyframes: theme => ({
              fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }),
    },
  },
  plugins: [],
}