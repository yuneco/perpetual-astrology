import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    primary: "#ebc6dc",
    body: "#48396a",
    sun: "#FF6699",
    sat: "#6699FF",
    focus: {
      bg: "#fadde6ff",
      fg: "#333",
    },
    active: {
      bg: "#ad74b0",
      fg: "#333",
    },
  },
  spacings: {
    sm: "0.5rem",
    md: "1rem",
  },
  fonts: {
    body: `"Kiwi Maru", serif`,
    heading: `"Kiwi Maru", serif`,
    mono: "Menlo, monospace",
  },
  fontSizes: {
    body: "1rem",
    heading: "1.5rem",
  },
  components: {
    Box: {
      variants: {
        modal: {
          position: "fixed",
          left: "50%",
          top: "calc(50% - 32px)",
          transform: "translate(-50%, -50%)",
          transformOrigin: "left top",
          p: 32,
          borderRadius: 8,
          bg: "#fffd",
          boxShadow: "0 0 16px rgba(0,0,0,0.2)",
          border: "1px solid #8883",
        },
      },
    },
    Input: {
      variants: {
        large: {
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          fontSize: "1.3rem",
          borderRight: "4px",
          color: "colors.body",
          border: "1px solid currentColor",
          outlineColor: "colors.primary",
        },
      },
    },
    Select: {
      variants: {
        large: {
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          fontSize: "1.3rem",
          borderRight: "4px",
          color: "colors.body",
          border: "1px solid currentColor",
          outlineColor: "colors.primary",
        },
      },
    },
    Button: {
      defaultProps: {
        bg: "colors.primary",
        color: "colors.active.fg",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.1s",
        _hover: {
          bg: "colors.focus.bg",
        },
        _active: {
          bg: "colors.active.bg",
          transform: "scale(0.9)",
        },
      },
      variants: {
        large: {
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          fontSize: "1.3rem",
        },
      },
    },
    Text: {
      defaultProps: {
        fontFamily: "fonts.body",
      },
      variants: {
        label: {
          fontWeight: "500",
          textAlign: "right",
        },
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends UserTheme {}
}

export default theme;
