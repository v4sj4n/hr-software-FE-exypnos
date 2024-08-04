import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ModalComponent } from '../../../Components/Modal/Modal';

interface Interview {
  fullName: string;
  auth: { email: string };
  interviewDate: string;
  notes: string;
  phase: string;
  message: string;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleReschedule: (interviewDate: string, notes: string , phase:string, message:string) => void;
  selectedInterview: Interview;
  allPhasesPassed: boolean;
  message: string;

}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule,
  selectedInterview,
  allPhasesPassed,
}) => {
  const [interviewDate, setInterviewDate] = useState(selectedInterview.interviewDate);
  const [notes, setNotes] = useState(selectedInterview.notes);
  const [phase, setPhase] = useState(selectedInterview.phase);
  const [message, setMessage] = useState(selectedInterview.message);


  useEffect(() => {
    setInterviewDate(selectedInterview.interviewDate);
    setPhase(selectedInterview.phase);

    setNotes(selectedInterview.notes);
    setMessage(selectedInterview.message);

  }, [selectedInterview]);

  const handleSubmit = () => {
    handleReschedule(interviewDate, notes, phase, message);
  };

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2>{allPhasesPassed ? 'Update Interview Notes' : 'Edit your interview'}</h2>
        {!allPhasesPassed && (
 <Input 
 IsUsername 
 type="datetime-local" 
 name='interviewDate' 
 label='Date'
 value={interviewDate}
 onChange={(e) => setInterviewDate(e.target.value)}
/>
        )}
        <Input
          IsUsername
          multiline={true}
          width="100%"
          label="Add Notes"
          type="textarea"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
        />
         <Input
          IsUsername
          multiline={true}
          width="100%"
          label="Message"
          type="textarea"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
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