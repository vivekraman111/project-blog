module.exports = {
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
      "/*": ["./code-content/**/*"],
    },
  },
};
