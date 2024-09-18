import React, { useState } from 'react';
import { useThemeContext } from './ThemeContext';
import { Box, Typography, Menu, MenuItem, IconButton, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PurpleIcon from '@mui/icons-material/ColorLens';  

const DropdownButton = styled(IconButton)({
    
  backgroundColor: 'transparent',
  color: '#333',
  padding: '10px',
  fontSize:'xx-large',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: string) => {
    toggleTheme(); 
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <DropdownButton onClick={handleClick}>
        <ExpandMoreIcon />
      </DropdownButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 12,
          sx: {
            backgroundColor: '#ffffff',  
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',  
          },
        }}
      >
        <MenuItem
          onClick={() => handleThemeChange('purple')}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#f3e9ff',
            },
          }}
        >
          <PurpleIcon sx={{ color: '#725ABB', marginRight: 1 }} /> 
          <Typography>Purple Theme</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange('blue')}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          <PurpleIcon sx={{ color: '#4868AD', marginRight: 1 }} />  
          <Typography>Blue Theme</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ThemeSwitcher;
