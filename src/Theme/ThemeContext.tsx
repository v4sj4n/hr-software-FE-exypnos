// ThemeContext.tsx
import React, { createContext, useState, useMemo, useContext } from 'react'
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles'
import { lightTheme, darkTheme } from './Theme' // Import your themes

interface ThemeContextType {
    currentTheme: Theme
    toggleTheme: () => void
    isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const currentTheme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode)
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme, isDarkMode }}>
            <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    )
}
