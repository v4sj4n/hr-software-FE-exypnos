import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import styles from './WelcomeMessage.module.css';

const WelcomeMessage:React.FC = () => {
  return (
    <Paper elevation={3} className={styles.welcomeContainer}>
      <Avatar className={styles.avatar}>A</Avatar>
      <Box>
        <Typography variant="h5" className={styles.userName}>
          Welcome Elisabeta !
        </Typography>
        <Typography variant="body2" className={styles.message}>
Here is what your teams look's like today !        
</Typography>
       
      </Box>
    </Paper>
  );
};

export default WelcomeMessage;
