import { createTheme } from '@mui/material/styles';

export const deepBlueTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2469ff',
    },
    background: {
      default: '#D7EBF2',  // Background color for the main content
      paper: '#FFFFFF',  // Card color remains consistent
    },
    text: {
      primary: '#1c449ad7',  // Black font color
      secondary: '#001F54',  // Blue font color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2469ff',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#002E8A',
          },
        },
      },
    },
  },
});

export const purpleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6A0DAD',  
    },
    background: {
      default: '#CBC3E3',  
      paper: '#FFFFFF',  
    },
    text: {
      primary: '#5f43b2',  
      secondary: '#6A0DAD',  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#BF40BF',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#9A31D9',
          },
        },
      },
    },
  },
});
