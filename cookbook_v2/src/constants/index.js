import { unstable_createMuiStrictModeTheme as createMuiTheme  } from '@material-ui/core/styles';
export const COLOUR_THEME = createMuiTheme({
  palette: {
    primary: {
      main: '#28464e',
      contrastText: "#fff" 
    },
    secondary: {
      main: '#b3b3b3'
    },
  },
  typography: {
    fontSize: 14,
  },
});


