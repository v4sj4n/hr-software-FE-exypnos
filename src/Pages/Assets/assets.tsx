import React from 'react';
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ComputerIcon from '@mui/icons-material/Computer';
import LaptopIcon from '@mui/icons-material/Laptop';


import KeyboardMouseIcon  from '@mui/icons-material/Keyboard'
import Header from '../../Components/header';

const assets = [
  { type: 'Monitor Samsung', status: 'available', icon: ComputerIcon },
  { type: 'Laptop Lenovo', status: 'available', icon: LaptopIcon },
  { type: 'Tastier/Mouse HP', status: 'assigned', icon: KeyboardMouseIcon },
  { type: 'Monitor Samsung', status: 'available', icon: ComputerIcon },
  { type: 'Monitor Samsung', status: 'available', icon: ComputerIcon },
  { type: 'Tastier/Mouse HP', status: 'assigned', icon: KeyboardMouseIcon },
  { type: 'Tastier/Mouse HP', status: 'assigned', icon: KeyboardMouseIcon },
  { type: 'Laptop Lenovo', status: 'available', icon: LaptopIcon },
  { type: 'Tastier/Mouse HP', status: 'assigned', icon: KeyboardMouseIcon },
  { type: 'Laptop Lenovo', status: 'available', icon: LaptopIcon },
  { type: 'Monitor Samsung', status: 'available', icon: ComputerIcon },
  { type: 'Laptop Lenovo', status: 'available', icon: LaptopIcon },
  { type: 'Monitor Samsung', status: 'available', icon: ComputerIcon },
  { type: 'Tastier/Mouse HP', status: 'assigned', icon: KeyboardMouseIcon },
  { type: 'Monitor Samsung', status: 'broken', icon: ComputerIcon },
];

const Assets: React.FC = () => {
  return (

    <Box sx={{ p: 3, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <Header />

      <Typography variant="h4" gutterBottom>
        Company Assets
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 2, backgroundColor: 'white' }}
        />
        <Button variant="contained" sx={{ mr: 1 }}>All</Button>
        <Button variant="outlined" sx={{ mr: 1 }}>assigned</Button>
        <Button variant="outlined" sx={{ mr: 1 }}>Available</Button>
        <Button variant="outlined" sx={{ mr: 1 }}>Broken</Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="primary" size="large">
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {assets.map((asset, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <asset.icon sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="subtitle1">{asset.type}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {asset.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Assets;