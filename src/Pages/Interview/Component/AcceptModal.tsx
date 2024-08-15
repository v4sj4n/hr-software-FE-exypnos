import React, { useState } from 'react';
import { applicantsData } from '@/Pages/Interview/Hook/index';
import { ApplicantPhase, EmailType } from '@/Pages/Interview/Interface/types';

interface AcceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: applicantsData;
}

const AcceptModal: React.FC<AcceptModalProps> = ({ isOpen, onClose, applicant }) => {
  const [emailType, setEmailType] = useState<EmailType>(EmailType.FIRST_INTERVIEW);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newPhase: ApplicantPhase;
    
    if (applicant.currentPhase === ApplicantPhase.APPLICANT) {
      newPhase = ApplicantPhase.FIRST_INTERVIEW;
    } else if (applicant.currentPhase === ApplicantPhase.FIRST_INTERVIEW) {
      newPhase = ApplicantPhase.SECOND_INTERVIEW;
    } else {
      // If it's already in the second interview phase, we might want to handle this differently
      console.log('Applicant is already in the second interview phase');
      onClose();
      return;
    }

    // Implement the logic to update the applicant's phase and send the email
    console.log('Moving', applicant.firstName, 'to', newPhase, 'and sending', emailType, 'email');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Accept Applicant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email Type:
          <select value={emailType} onChange={(e) => setEmailType(e.target.value as EmailType)}>
            <option value={EmailType.FIRST_INTERVIEW}>First Interview</option>
            <option value={EmailType.SECOND_INTERVIEW}>Second Interview</option>
            <option value={EmailType.SUCCESSFUL_APPLICATION}>Successful Application</option>
          </select>
        </label>
        <button type="submit">Accept and Send Email</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AcceptModal;