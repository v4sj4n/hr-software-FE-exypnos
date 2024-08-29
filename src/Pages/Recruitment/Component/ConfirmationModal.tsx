import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Your Email</DialogTitle>
            <DialogContent>
                <p>Please check your email and click the confirmation link to complete your application.</p>
                <p>If you haven't received the email, please check your spam folder or contact support.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
