module.exports = {
  purge: {
    content: ["index.html"],
  },
  theme: {
    fontFamily: {
      display: ["arial", "serif"],
      body: ["times", "serif"],
    },
    fontSize: {},
    borderRadius: {
      none: "0",
      sm: ".25rem",
      DEFAULT: ".4rem",
    },
    lineHeight: {
      lessthan: 0.9,
      none: 1,
      tight: 1.15,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.65,
      loose: 1.9,
    },
    extend: {
      boxShadow: {
        gray: "0 1px 20px 0 rgba(0, 0, 0, .1)",
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  variants: {
    backgroundColor: ["group-hover, hover, responsive"],
  },
  plugins: [],
};
