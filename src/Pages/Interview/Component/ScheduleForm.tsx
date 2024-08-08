import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../../../Components/Modal/Modal';
import { Interview } from '../../Interview/Interface/Interview';
import { useInterviewContext } from '../Hook/InterviewContext';

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  selectedInterview: Interview;
  allPhasesPassed: boolean;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  selectedInterview,
  allPhasesPassed,
}) => {
  const [interviewDate, setInterviewDate] = useState(selectedInterview.interviewDate);
  const [notes, setNotes] = useState(selectedInterview.notes);
  const [phase, setPhase] = useState(selectedInterview.phase);

  const { handleReschedule } = useInterviewContext();

  useEffect(() => {
    if (selectedInterview) {
      setInterviewDate(selectedInterview.interviewDate);
      setNotes(selectedInterview.notes);
      setPhase(selectedInterview.phase);
    }
  }, [selectedInterview]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await handleReschedule(interviewDate, notes, phase);
      handleClose();
    } catch (error) {
      console.error('Error rescheduling interview:', error);
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
            name="interviewDate"
            label="Date"
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
            padding="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleSubmit}
          />
        </div>
      </Box>
    </ModalComponent>
  );
};

export default RescheduleModal;
