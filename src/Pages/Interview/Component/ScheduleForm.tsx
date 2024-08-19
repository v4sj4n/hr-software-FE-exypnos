import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../../../Components/Modal/Modal';

interface Interview {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  positionApplied: string;
  status: string;
  _id: string;
  firstInterviewDate?:string;
  secondInterviewDate?: string;
  notes: string;
  customMessage: string;
  customSubject: string;
  currentPhase: string;
  isDeleted?: boolean;
  fullName: string;
}



interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleSchedule: (interviewDate: string, notes: string, customMessage: string, customSubject: string) => void;
  handleReschedule: (interviewDate: string, notes: string, customMessage: string, customSubject: string) => void;
  selectedInterview: Interview;
  // allPhasesPassed: boolean;
  isReschedule: boolean;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule,
  selectedInterview,
  // allPhasesPassed,
  handleSchedule,
  isReschedule
}) => {
  const [interviewDate, setInterviewDate] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customSubject, setCustomSubject] = useState('');

  // useEffect(() => {
  //   setInterviewDate(selectedInterview.firstInterviewDate || selectedInterview.secondInterviewDate || '');
  //   setNotes(selectedInterview.notes || '');
  //   setCustomMessage(selectedInterview.customMessage || '');
  //   setCustomSubject(selectedInterview.customSubject || '');
  // }, [selectedInterview]);

  // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (interviewDate) {
  //     if (isReschedule) {
  //       handleReschedule(interviewDate, notes, customMessage, customSubject);
  //     } else {
  //       handleSchedule(interviewDate, notes, customMessage, customSubject);
  //     }
  //     handleClose();
  //   } else {
  //     console.error("Interview date is undefined");
  //     // Consider showing an error message to the user
  //   }
  // };






useEffect(() => {
  const interviewDate = selectedInterview.currentPhase === 'first_interview'
    ? selectedInterview.firstInterviewDate
    : selectedInterview.secondInterviewDate;
  setInterviewDate(interviewDate || '');
  setNotes(selectedInterview.notes || '');
  setCustomMessage(selectedInterview.customMessage || '');
  setCustomSubject(selectedInterview.customSubject || '');
}, [selectedInterview]);

const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  if (interviewDate) {
    if (isReschedule) {
      handleReschedule(interviewDate, notes, customMessage, customSubject);
    } else {
      handleSchedule(interviewDate, notes, customMessage, customSubject);
    }
    handleClose();
  } else {
    console.error("Interview date is undefined");
  }
};

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2>  Edit your interview</h2>
         
          <Input
            IsUsername
            type="datetime-local"
            name='interviewDate'
            label='Date'
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
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
        <Input
          IsUsername
          multiline={true}
          width="100%"
          label="Message"
          type="textarea"
          rows={4}
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          name="message"
        />
        <Input 
          IsUsername 
          type="textarea" 
          name='customSubject' 
          label='Subject' 
          multiline 
          rows={3} 
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button
            type={ButtonTypes.PRIMARY}
            btnText= 'Save'
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
};

export default RescheduleModal
