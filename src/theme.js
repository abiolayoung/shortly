import { createTheme } from "@mui/material/styles";
// import { cyan } from '@mui/material/colors'

export default createTheme({
  palette: {
    primary: {
      main: "#56B7BA",
      contrastText: '#fff'
    },
    secondary: {
      main: "#03142F",
    },
  },
  typography: {
    fontFamily: 'poppins, sans-serif',
    button: {
      textTransform: "capitalize",
      fontWeight: '600'
    },
    h4: {
        fontWeight: '600'
    }
  },
});
