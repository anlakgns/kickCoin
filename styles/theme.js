import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepPurple, amber } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#012E43',
    },
    secondary: {
      main: '#F7A308',
    },
    custom: {
      blueDark: '#033B53',
      blueLight: '#05AAE0',
      orange: "#F7A308",
      red: '#E32239',
      green: '#66AE6D',
      textWhite: "#FFFFFF",
      gradient1: '#016986',
      gradient2: '#0392B4'

    },
  },
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
