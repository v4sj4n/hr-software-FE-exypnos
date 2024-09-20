import React, { useState } from 'react';
import { useThemeContext } from './ThemeContext';
import { Box, Typography, Menu, MenuItem, IconButton, styled, keyframes } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PurpleIcon from '@mui/icons-material/ColorLens';  

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownButton = styled(IconButton)({
  backgroundColor: 'transparent',
  

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
            position: 'absolute',
            right: 0, 
            marginTop: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '10px 0',
            width: '200px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            animation: `${fadeIn} 0.3s ease`, 
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
