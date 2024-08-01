import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ModalComponent } from '../../../Components/Modal/Modal';

interface Interview {
  date: string;
  time: string;
  notes: string;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleReschedule: (date: string, time: string, notes:string) => void;
  selectedInterview: Interview | null;
  // handleCancel: () => void;
  allPhasesPassed: boolean;

}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule, 
  selectedInterview,
  allPhasesPassed,

  // handleCancel,

}) => {
  const [date, setDate] = useState(selectedInterview ? selectedInterview.date : '');
  const [time, setTime] = useState(selectedInterview ? selectedInterview.time : '');
  const[notes,setNotes]=useState(selectedInterview?selectedInterview.notes : '');

  useEffect(() => {
    if (selectedInterview) {
      setDate(selectedInterview.date);
      setTime(selectedInterview.time);
      setNotes(selectedInterview.notes);
    }
  }, [selectedInterview]);

  const handleSubmit = () => {
    if (allPhasesPassed) {
      handleReschedule(date, time, notes);
    } else if (date && time) {
      handleReschedule(date, time, notes);
    }
  };

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2>{allPhasesPassed ? 'Update Interview Notes' : 'Edit your interview'}</h2>
        {!allPhasesPassed && (
          <>
            <Input
              IsUsername
              label="New Date"
              type="date"
              value={date}
              width="100%"
              onChange={(e) => setDate(e.target.value)}
              name="date"
            />
            <Input
              IsUsername
              width="100%"
              label="New Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              name="time"
            />
          </>
        )}
        <Input
          IsUsername
          width="100%"
          label="Add Notes"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button
            type={ButtonTypes.PRIMARY}
            btnText={allPhasesPassed ? 'Update' : 'Save'}
            width="90px"
            height="35px"
            padding='10px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            onClick={handleSubmit}
            fontFamily='Outfit'
          />
        </div>
      </Box>
    </ModalComponent>
  );
};

export default RescheduleModal;