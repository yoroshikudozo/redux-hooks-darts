import blueGrey from '@material-ui/core/colors/blueGrey';
import green from '@material-ui/core/colors/green';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[400],
      main: blueGrey[700],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
    secondary: green,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto',
      '"Noto Sans JP"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
