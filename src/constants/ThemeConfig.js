import { colors } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const white = '#FFFFFF';
const black = '#000000';

//#region Theme Values
const ThemePallete = {
  primary: {
    contrastText: white   ,
    light      : '#434343',
    main       : '#141414',
    dark       : '#0e0e0e',
  },
  secondary: {
    contrastText: white    ,
    light       : '#FF965E',
    main        : '#F26531',
    dark        : '#B93300',
  },
  text: {
    primary  : black,
    secondary: '#545454',
    link     : colors.blue[600],
  },
  background: {
    default: white,
  },
};

const ThemeOverrides = {
  contained: {
    boxShadow: 'none',
  },
  paper: {
    // set layout styles
    width        : '100vw',
    padding      : '16px 16px 0 16px',
    display      : 'flex',
    flexDirection: 'column',
    // set color styles
    color     : ThemePallete.primary.contrastText,
    background: ThemePallete.primary.main,
  },
};

const ThemeTypography =  {
  htmlFontSize: 16,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    fontSize: '6rem',
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    fontSize: '3.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '3rem',
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '2.125rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'capitalize',
  },
  caption: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
};
//#endregion

export const ThemeConfig = createMuiTheme({
  zIndex: {
    appBar: 0,
  },
  palette   : ThemePallete   ,
  overrides : ThemeOverrides ,
  typography: ThemeTypography,
});