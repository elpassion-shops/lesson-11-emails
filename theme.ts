import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#5de6de",
    },
    secondary: {
      main: "#b58ecc",
    },
    info: {
      main: "#5de6de",
    },
    success: {
      main: "#A7F89D",
    },
    error: {
      main: "#B80073",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: theme.palette.primary.main,
    },
    h2: {
      fontWeight: 200,
      fontSize: "1.1rem",
      color: theme.palette.primary.dark,
    },
    h3: {
      fontWeight: 700,
      fontSize: 30,
      color: theme.palette.primary.main,
    },
    h5: {
      fontWeight: 300,
      fontSize: "1.125rem",
      color: theme.palette.secondary.main,
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 300
    },
  },
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          border: "1px solid #fff",
          borderColor: theme.palette.info.main,
          background: `linear-gradient(165deg, ${theme.palette.primary.main},${theme.palette.success.main})`,
          color: "#fff",
          fontSize: "1.05rem",
          borderRadius: "0.5rem",
          "&:hover": {
            boxShadow: `0 0 12px ${theme.palette.primary.main}`,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        height: "5rem",
        minWidth: "40rem",
      },
    },
  },
});

export { theme };
