import React from 'react';
import { useThemeContext } from './ThemeContext';
import { Box, styled } from '@mui/material';

const Slider = styled('div')<{ isPurpleTheme: boolean }>(
  ({ theme, isPurpleTheme }) => ({
    width: '50px',
    height: '25px',
    borderRadius: '15px',
    backgroundColor: isPurpleTheme ? theme.palette.secondary.main : theme.palette.primary.main,
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      top: '50%',
      left: isPurpleTheme ? '30px' : '5px',
      transform: 'translateY(-50%)',
      transition: 'left 0.3s ease',
    },
  })
);

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, isPurpleTheme } = useThemeContext();

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
      
      <Slider isPurpleTheme={isPurpleTheme} onClick={handleThemeChange} />

     
    </Box>
  );
};

export default ThemeSwitcher;
