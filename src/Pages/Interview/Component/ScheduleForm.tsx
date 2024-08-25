import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ModalComponent } from '../../../Components/Modal/Modal'

interface Interview {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  positionApplied: string;
  status: string;
  _id: string;
  firstInterviewDate?: string;
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
  selectedInterview: Interview;
  isReschedule: boolean;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  open,
  handleClose,
  selectedInterview,
  handleSchedule,
  isReschedule,
}) => {
  const [interviewDate, setInterviewDate] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customSubject, setCustomSubject] = useState('');

  useEffect(() => {
    const initialDate = selectedInterview.currentPhase === 'first_interview'
      ? selectedInterview.firstInterviewDate
      : selectedInterview.secondInterviewDate;
    setInterviewDate(initialDate || '');
    setNotes(selectedInterview.notes || '');
    setCustomMessage(selectedInterview.customMessage || '');
    setCustomSubject(selectedInterview.customSubject || '');
  }, [selectedInterview]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (interviewDate) {
      handleSchedule(interviewDate, notes, customMessage, customSubject);
    } else {
      console.error('Interview date is required');
    }

    handleClose();
  };

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2>{isReschedule ? 'Reschedule Interview' : 'Schedule Interview'}</h2>

        <Input
          IsUsername
          type="datetime-local"
          name="interviewDate"
          label="Date"
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
          type="textarea"
          name="customSubject"
          label="Subject"
          multiline
          rows={3}
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button
            type={ButtonTypes.PRIMARY}
            btnText={isReschedule ? 'Reschedule' : 'Schedule'}
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
