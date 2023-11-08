const theme = {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Neucha", cursive, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  config: {
    initialColorModeName: "light",
  },
  colors: {
    primary: "#2d2c3df2",
    secondary: "#ffffffd9",
    accent: "#ee4e4e",
    border: "#ee4e4e",
    background: "#b8b08d4d",
    text: "#2d2c3df2",
    bs: "12px 12px 24px 0 rgba(0, 0, 0, 0.2), -12px -12px 24px 0 rgba(255, 255, 255, 0.5)",
    modes: {
      dark: {
        primary: "#00000080",
        secondary: "#ffffffa6",
        accent: "#ee4e4e",
        border: "#ee4e4e",
        background: "#000000d9",
        text: "#ffffffa6",
        bs: "12px 12px 24px 0 rgba(0, 0, 0, 0.2), -12px -12px 24px 0 rgba(50, 50, 50, 0.5)",
      },
    },
  },

  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    a: {
      color: "crimson",
      textDecoration: "none",
      "&:hover": {
        color: "crimson",
        textDecoration: "underline",
      },
    },
    h1: {
      variant: "text.heading",
      fontSize: 5,
    },
    h2: {
      variant: "text.heading",
      fontSize: 4,
    },
    h3: {
      variant: "text.heading",
      fontSize: 3,
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,
    },
    h5: {
      variant: "text.heading",
      fontSize: 1,
    },
    h6: {
      variant: "text.heading",
      fontSize: 0,
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    buttons: {
      tabActive: {
        backgroundColor: "primary",
        color: "white",
        border: "none",
        borderRadius: 0,
        borderBottom: "2px solid",
        borderColor: "primary",
        padding: 3,
      },
      tabInactive: {
        backgroundColor: "transparent",
        color: "primary",
        border: "none",
        borderRadius: 0,
        padding: 3,
      },
      accordion: {
        backgroundColor: "transparent",
        color: "primary",
        border: "1px solid",
        borderColor: "primary",
        borderRadius: 4,
        padding: 2,
        "&:hover": {
          backgroundColor: "primary",
          color: "white",
        },
      },
    },
    accordionContent: {
      display: "block",
      padding: 3,
      borderTop: "1px solid",
      borderColor: "primary",
    },
  },
}

export default theme
