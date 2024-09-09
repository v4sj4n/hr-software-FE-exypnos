import { createTheme } from '@mui/material/styles'

export const deepBlueTheme = createTheme({
  palette: {
    mode: 'light',  // Light mode for deep blue theme
    primary: {
      main: '#2469ff',
    },
    background: {
      default: '#D7EBF2',  // Background color
      paper: '#FFFFFF',  // Card color
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
          backgroundColor: '#2469ff',  // Button background deep blue
          color: '#FFFFFF',  // Button text white
          '&:hover': {
            backgroundColor: '#002E8A',  // Darker blue on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',  // White card background
          color: '#000000',  // Black text in cards
          padding: '1rem',
          borderRadius: '8px',
        },
      },
    },

  },
})

export const purpleTheme = createTheme({
    palette: {
      mode: 'light',  // Light mode for purple theme
      primary: {
        main: '#6A0DAD',  // Purple for buttons
      },
      background: {
        default: '#CBC3E3',  // Soft white background
        paper: '#D8BFD8',  // Lilac for card background
      },
      text: {
        primary: '##5f43b2',  // Black font color
        secondary: '#6A0DAD',  // Lavender font color
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#BF40BF',  // Button background purple
            color: '#FFFFFF',  // Button text white
            '&:hover': {
              backgroundColor: '#9A31D9',  // Lighter purple on hover
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#D8BFD8',  // Lilac card background
            color: '#000000',  // Black text in cards
            padding: '1rem',
            borderRadius: '8px',
          },
        },
      },
      
    },
  })
  
