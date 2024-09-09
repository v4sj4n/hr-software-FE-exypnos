import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { deepBlueTheme, purpleTheme } from './Theme';

interface ThemeContextType {
  currentTheme: Theme;
  toggleTheme: () => void;
  isPurpleTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPurpleTheme, setIsPurpleTheme] = useState(false);

  const currentTheme = isPurpleTheme ? purpleTheme : deepBlueTheme;

  const toggleTheme = () => {
    setIsPurpleTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, isPurpleTheme }}>
      <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
