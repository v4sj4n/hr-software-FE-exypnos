import { Modal as JoyModal, Sheet } from '@mui/joy'
import { ReactNode } from 'react'

interface ModalContentProps {
    onClose: () => void
    open: boolean
    children: ReactNode
}

export const Modal = ({ onClose, open, children }: ModalContentProps) => {
    return (
        <JoyModal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={onClose}
            className="flex justify-center items-center"
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                {children}
            </Sheet>
        </JoyModal>
    )
}
