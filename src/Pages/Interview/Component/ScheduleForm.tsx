import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { ModalComponent } from '../../../Components/Modal/Modal';

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleReschedule: (date: string, time: string) => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    handleReschedule(date, time);
    handleClose();
  };

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="New Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="New Time"
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Reschedule
        </Button>
      </Box>
    </ModalComponent>
  );
};

export default RescheduleModal;
