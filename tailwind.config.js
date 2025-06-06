import typographyOptions from "@lil-el/markdown/typography-options";

export default {
  content: [
    "./node_modules/@lil-el/markdown/dist/**/*.{js}",
    "./node_modules/@lil-el/codepen/dist/**/*.{js}",
    "./node_modules/@lil-el/ui/dist/**/*.{js}",
  ],
  theme: {
    extend: {
      typography: () => typographyOptions,
    },
  },
};
