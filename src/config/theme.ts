import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

const makeTheme = (darkMode = true) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#ff6600",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: themeParam => ({
          body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
        }),
      },
    },
  });

  return theme;
};

export default makeTheme;
