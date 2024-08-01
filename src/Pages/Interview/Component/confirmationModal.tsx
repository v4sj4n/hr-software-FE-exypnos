import React from 'react'
import { ModalComponent } from '../../../Components/Modal/Modal';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';

interface ConfirmationModalProps {
    open: boolean;
    message: string;
    handleCancel: () => void;
    handleConfirm: () => void;
    interview: {
        fullName: string;
    };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, handleCancel, handleConfirm, interview }) => {
    return (
        <ModalComponent open={open} handleClose={handleCancel}>
            <p>Are you sure you want to cancel the interview with {interview.fullName}?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Reschedule"
                    width="90px"
                    height="35px"
                    padding='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    onClick={handleConfirm}
                />
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Cancel"
                    width="90px"
                    height="35px"
                    padding='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    backgroundColor='#C70039'
                    onClick={handleCancel}
                />
            </div>
        </ModalComponent>
    );
}

export default ConfirmationModal;