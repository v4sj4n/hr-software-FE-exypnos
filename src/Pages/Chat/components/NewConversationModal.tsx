import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';

const NewConversationModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');

  const handleCreateConversation = () => {
    // Logic to create a new conversation
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>New Conversation</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <h2>Create New Conversation</h2>
          <TextField 
            label="Enter Participant" 
            value={newParticipant} 
            onChange={(e) => setNewParticipant(e.target.value)} 
            fullWidth 
          />
          <Button onClick={handleCreateConversation} variant="contained" color="primary">
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NewConversationModal;
