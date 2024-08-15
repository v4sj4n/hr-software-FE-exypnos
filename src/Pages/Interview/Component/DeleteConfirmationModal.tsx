import React from 'react';
import { applicantsData } from '@/Pages/Interview/Hook/index';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  applicant: applicantsData;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, applicant }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete the application for {applicant.firstName} {applicant.lastName}?</p>
      <p>This action cannot be undone.</p>
      <div className="modal-actions">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;