const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Disable linting warnings for deprecated class syntax
      lint: {
        invalidTailwindDirective: "ignore",
      },
    },
  },
};

export default config;

