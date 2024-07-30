import React, { useEffect, useState } from 'react';
import {TextField,  Box } from '@mui/material';
import { ModalComponent } from '../../../Components/Modal/Modal';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';

interface Interview {
  date: string;
  time: string;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleReschedule: (date: string, time: string) => void;
  selectedInterview: Interview | null;
  handleCancel: () => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule, 
  selectedInterview,
  handleCancel,
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
    else (
      handleCancel
    )
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' , gap:'10px'}}>
        <Button 
          type={ButtonTypes.PRIMARY}
          btnText="Reschedule"
          width="90px"
          height="35px"
          padding='10px'
          display='flex'
          justifyContent='center'
          alignItems='center'      
          onClick= {handleSubmit}>
          
        </Button>
        <Button 
          type={ButtonTypes.PRIMARY}
          btnText="Cancel"
          width="90px"
          height="35px"
          padding='10px'
          display='flex'
          justifyContent='center'
          alignItems='center' 
          backgroundColor='#C70039'     
          onClick={handleCancel}>
          
        </Button>
       
        </div>
      </Box>
    </ModalComponent>
  );
};

export default RescheduleModal;