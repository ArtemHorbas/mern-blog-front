import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	shadows: [...createTheme({}).shadows.map((shadow, i) => (
    i === 1 ? '0 0 18px 0 rgba(9, 22, 26, 0.045)' : shadow
  ))],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
