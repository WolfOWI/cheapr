// src/theme/themeOptions.js
import { createTheme } from "@mui/material/styles";

// Supports weights 200-900
import "@fontsource-variable/mulish";

export const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#0f8c59",
    },
    secondary: {
      main: "#ff8b4b",
    },
  },
  typography: {
    fontFamily: "Mulish Variable",
    fontSize: 16,
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
  },
};

// Export the theme
export const theme = createTheme(themeOptions);
