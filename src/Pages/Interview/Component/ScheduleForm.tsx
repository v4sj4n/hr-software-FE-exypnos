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
  interviewDate: string;
   notes: string;
  phase: string;
  message: string;
  _id: number;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleSchedule: (interviewDate: string, phase: string, notes: string) => void
  handleReschedule: (interviewDate: string,  phase: string ) => void;
  selectedInterview: Interview;
  allPhasesPassed: boolean;
  // message: string;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  handleReschedule,
  selectedInterview,
  allPhasesPassed,
  handleSchedule,
}) => {
  const [interviewDate, setInterviewDate] = useState(selectedInterview.interviewDate);
  const [notes, setNotes] = useState(selectedInterview.notes);
  const [phase, setPhase] = useState(selectedInterview.phase);
  // const [message, setMessage] = useState(selectedInterview.message);

  useEffect(() => {
    setInterviewDate(selectedInterview.interviewDate);
    setPhase(selectedInterview.phase);
    setNotes(selectedInterview.notes);
    // setMessage(selectedInterview.message);
  }, [selectedInterview]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    // try {
    //   console.log("vgjyf",interviewDate, phase)
  
    //   const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/interview/reschedule`, {
    //    phase:"applicant",
    //   newInterviewDate:"2024-08-15T10:00:00.000Z"
    //   });
    //   console.log(interviewDate, phase)
  
    //   if (response.status === 200) {
    //     handleReschedule(interviewDate, phase);
    //   }
    // } catch (error) {
    //   console.error('Failed to reschedule interview:', error);
    //   // Handle error (e.g., show an error message to the user)
    // }
    handleReschedule(interviewDate, phase);
    handleSchedule(interviewDate, phase,notes);
    console.log("gjynaf",interviewDate, phase)
    handleClose();
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
};

export default RescheduleModal;