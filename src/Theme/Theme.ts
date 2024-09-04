import { createTheme } from '@mui/material/styles'

// Light Theme
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2469ff',  // Main primary color for the light theme
        },
        background: {
            default: '#D7EBF2',  // Light background
            paper: '#ffffff',
        },
        text: {
            primary: '#2457A3',  // Text color
        },
    },
    components: {
        // Override Material-UI's Button styles
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '16px',
                    padding: '0.5rem 1rem',
                },
                // Override styles for the contained primary button
                containedPrimary: {
                    color: '#ffffff',
                    backgroundColor: '#2469ff',
                    borderColor: '#2469ff',
                    borderRadius: '5px',
                    '&:hover': {
                        backgroundColor: '#1E5ACC',
                        borderColor: '#1E5ACC',
                    },
                    '&:active': {
                        backgroundColor: '#194DB3',
                        borderColor: '#194DB3',
                    },
                    '&:focus': {
                        outline: '2px solid #1E5ACC',
                    },
                },
            },
        },
        // You can add more component customizations like Card, Table, etc.
        MuiCard: {
            styleOverrides: {
                root: {
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
})

// Dark Theme
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',  // Primary color for dark theme
        },
        background: {
            default: '#121212',  // Dark background
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '16px',
                    padding: '0.5rem 1rem',
                },
                containedPrimary: {
                    color: '#ffffff',
                    backgroundColor: '#90caf9',
                    borderColor: '#90caf9',
                    borderRadius: '5px',
                    '&:hover': {
                        backgroundColor: '#80b6e5',
                    },
                    '&:active': {
                        backgroundColor: '#70a4d2',
                    },
                    '&:focus': {
                        outline: '2px solid #70a4d2',
                    },
                },
            },
        },
        // Add more components like Card, Table, etc.
    },
})
