import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { updateInterview } from '../Hook';
import { ModalComponent } from '../../../Components/Modal/Modal';
import { useFetch } from '@/Hooks/useFetch';

interface Interview {
  fullName: string;
  auth: { email: string };
  interviewDate: string;
  notes: string;
  phase: string;
  message: string;
  _id:number;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleReschedule: (interviewDate: string, notes: string, phase: string) => void;
  selectedInterview: Interview;
  allPhasesPassed: boolean;
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

  useEffect(() => {
    setInterviewDate(selectedInterview.interviewDate);
    setPhase(selectedInterview.phase);
    setNotes(selectedInterview.notes);
  }, [selectedInterview]);

  const handleSubmit = async () => {
    try {
      await updateInterview(selectedInterview._id, {
        interviewDate,
        notes,
        phase,
      });
      handleClose();
    } catch (error) {
      console.error('Error updating interview:', error);

    }
    
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
