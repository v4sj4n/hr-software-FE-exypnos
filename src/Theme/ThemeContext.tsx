import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles'
import { deepBlueTheme, purpleTheme } from './Theme'

interface ThemeContextType {
    currentTheme: Theme
    toggleTheme: () => void
    isPurpleTheme: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem('isPurpleTheme')
        return storedTheme ? JSON.parse(storedTheme) : false
    }

    const [isPurpleTheme, setIsPurpleTheme] = useState(getInitialTheme)

    const currentTheme = isPurpleTheme ? purpleTheme : deepBlueTheme

    const toggleTheme = () => {
        setIsPurpleTheme((prevTheme: any) => {
            const newTheme = !prevTheme
            localStorage.setItem('isPurpleTheme', JSON.stringify(newTheme))
            return newTheme
        })
    }

    useEffect(() => {
        localStorage.setItem('isPurpleTheme', JSON.stringify(isPurpleTheme))
    }, [isPurpleTheme])

    return (
        <ThemeContext.Provider
            value={{ currentTheme, toggleTheme, isPurpleTheme }}
        >
            <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    )
}
