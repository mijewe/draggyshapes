module.exports = {
  darkMode: "media",
  purge: {
    content: ["index.html"],
  },
  theme: {
    fontFamily: {
      body: ["brandon-grotesque", "sans-serif"],
    },
    colors: {
      orange: "#FFB04D",
      green: "#C7F464",
      red: "#FF6B64",
      blue: "#4ECCC3",
      black: "#000",
      grey: {
        200: "#D9D9D9",
        800: "#575756",
      },
      white: "#fff",
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [],
};
