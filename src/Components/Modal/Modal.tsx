import { ReactNode } from 'react'
import { Backdrop, Modal, Fade, Card } from '@mui/material'

const defaultStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
}

interface ModalContentProps {
    handleClose: () => void
    open: boolean
    children: ReactNode
    width?: string
    padding?: string
    height?: string
}

export const ModalComponent: React.FC<ModalContentProps> = ({
    handleClose,
    open,
    children,
    width = '500px',
    padding = '20px',
}) => {
    const style = {
        ...defaultStyle,
        width,
        padding,
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Card sx={style}>{children}</Card>
            </Fade>
        </Modal>
    )
}
