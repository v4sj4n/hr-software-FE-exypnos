import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { ModalComponent } from '../../../Components/Modal/Modal';

interface Interview {
  date: string;
  time: string;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleReschedule: (date: string, time: string) => void;
  selectedInterview: Interview | null;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule, 
  selectedInterview,
}) => {
  const [date, setDate] = useState(selectedInterview ? selectedInterview.date : '');
  const [time, setTime] = useState(selectedInterview ? selectedInterview.time : '');

  useEffect(() => {
    if (selectedInterview) {
      setDate(selectedInterview.date);
      setTime(selectedInterview.time);
    }
  }, [selectedInterview]);

  const handleSubmit = () => {
    if (date && time) {
      handleReschedule(date, time);
    }
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