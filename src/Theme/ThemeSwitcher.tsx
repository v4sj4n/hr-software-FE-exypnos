import React from 'react';
import { useThemeContext } from './ThemeContext'; 
import { Switch } from '@mui/material';

const ThemeSwitcher: React.FC = () => {
    const { toggleTheme, isPurpleTheme } = useThemeContext()

    return (
        <Switch
            checked={isPurpleTheme} 
            onChange={toggleTheme} 
            color="primary" 
        />
    )
}

export default ThemeSwitcher
