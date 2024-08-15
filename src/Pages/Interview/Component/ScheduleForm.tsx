import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../../../Components/Modal/Modal';
import AxiosInstance from '@/Helpers/Axios';

interface Interview {
  fullName: string;
  auth: { email: string };
  firstInterviewDate: Date;
  secondInterviewDate: Date;
  // message: string;
  notes: string;
  currentPhase: string;
  email: string;
  _id: string;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleSchedule: (firstInterviewDate: Date, currentPhase: string, notes: string) => void;
  handleReschedule: (firstInterviewDate: Date, currentPhase: string,notes:string) => void;
  selectedInterview: Interview;
  allPhasesPassed: boolean;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule,
  selectedInterview,
  allPhasesPassed,
  handleSchedule,
}) => {
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState<string>(selectedInterview.notes);
  const [currentPhase, setCurrentPhase] = useState<string>(selectedInterview.currentPhase);
  // const [message, setMessage] = useState<string>(selectedInterview.message);

  useEffect(() => {
    setNotes(selectedInterview.notes);
    setCurrentPhase(selectedInterview.currentPhase);
    // setMessage(selectedInterview.message);

    if (selectedInterview.currentPhase === 'first') {
      setInterviewDate(selectedInterview.firstInterviewDate);
    } else if (selectedInterview.currentPhase === 'second') {
      setInterviewDate(selectedInterview.secondInterviewDate);
    }
  }, [selectedInterview]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!interviewDate) {
      // Handle the case when interviewDate is undefined
      console.error("Interview date is required.");
      return; // Prevent submission
    }
    
    if (allPhasesPassed) {
      handleSchedule(interviewDate, currentPhase, notes);
    } else {
      handleReschedule(interviewDate, currentPhase, notes);
    }
    
    console.log("Submitted Data", interviewDate, currentPhase, notes);
    handleClose();
  };
  
  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2>{allPhasesPassed ? 'Update Interview Notes' : 'Edit your interview'}</h2>
        {/* Conditional rendering for interview date input */}
        <Input
          IsUsername
          type="datetime-local"
          name='interviewDate'
          label={currentPhase === 'first' ? 'First Interview Date' : 'Second Interview Date'}
          value={interviewDate ? interviewDate.toISOString().slice(0, 16) : ''}
          onChange={(e) => setInterviewDate(new Date(e.target.value))}
        />
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
        {/* <Input
          IsUsername
          multiline={true}
          width="100%"
          label="Message"
          type="textarea"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        /> */}
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
          />
        </div>
      </Box>
    </ModalComponent>
  );
}
export default RescheduleModal; 