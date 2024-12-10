import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    body: "#333",
    sun: "#FF6699",
    sat: "#6699FF",
  },
  spacings: {
    sm: "0.5rem",
    md: "1rem",
  },
  fonts: {
    body: "Arial, sans-serif",
    heading: "Arial, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    body: "1rem",
    heading: "1.5rem",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends UserTheme {}
}

export default theme;
