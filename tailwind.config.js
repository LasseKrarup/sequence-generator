module.exports = {
  content: ["app.vue"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    }
  },
  plugins: [],
}
