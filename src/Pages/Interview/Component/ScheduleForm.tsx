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
  firstInterviewDate?: Date;
  secondInterviewDate?: Date;
  notes: string;
  isDeleted: boolean;
  currentPhase: string;
}

interface RescheduleModalProps {
  open: boolean;
  handleClose: () => void;
  handleSchedule: (date: Date, currentPhase: 'first' | 'second', notes: string) => void;
  handleReschedule: (date: Date, currentPhase: 'first' | 'second', notes: string) => void;
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
  const [interviewDate, setInterviewDate] = useState<string>(
    selectedInterview.firstInterviewDate 
      ? new Date(selectedInterview.firstInterviewDate).toISOString().slice(0, 16)
      : ''
  );
  
  const [notes, setNotes] = useState<string>(selectedInterview.notes);
  const [currentPhase, setCurrentPhase] = useState<string>(selectedInterview.currentPhase);

  useEffect(() => {
    setInterviewDate(selectedInterview.firstInterviewDate?.toISOString().slice(0, 16) || '');
    setCurrentPhase(selectedInterview.currentPhase);
    setNotes(selectedInterview.notes);
  }, [selectedInterview]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const date = new Date(interviewDate); // Convert string to Date

    if (allPhasesPassed) {
      handleSchedule(date, currentPhase as 'first' | 'second', notes);
    } else {
      handleReschedule(date, currentPhase as 'first' | 'second', notes);
    }
    
    handleClose();
  };

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2>{allPhasesPassed ? 'Update Interview Notes' : 'Edit Your Interview'}</h2>
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





// import React, { useState } from 'react';
// import { applicantsData } from '@/Pages/Interview/Hook/index';

// interface ScheduleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   applicant: applicantsData;
// }

// const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, applicant }) => {
//   const [date, setDate] = useState('');
//   const [notes, setNotes] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement the logic to update the applicant's interview date and notes
//     console.log('Scheduling interview for', applicant.firstName, 'on', date, 'with notes:', notes);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <h2>Schedule Interview</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Date:
//           <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
//         </label>
//         <label>
//           Notes:
//           <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
//         </label>
//         <button type="submit">Schedule</button>
//         <button type="button" onClick={onClose}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleModal;