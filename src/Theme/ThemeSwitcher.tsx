import React from 'react'
import { useThemeContext } from './ThemeContext'
import { Switch, FormControlLabel } from '@mui/material'

const ThemeSwitcher: React.FC = () => {
    const { toggleTheme, isPurpleTheme } = useThemeContext()

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isPurpleTheme}
                    onChange={toggleTheme}
                    color="primary"
                />
            }
            label={isPurpleTheme ? 'Purple Theme' : 'Blue Theme'}
        />
    )
}

export default ThemeSwitcher
