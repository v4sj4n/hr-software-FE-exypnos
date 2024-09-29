import { Snackbar } from '@mui/joy'
import { CheckCircle, Info, XCircle } from '@phosphor-icons/react'

interface ToastProps {
    open: boolean
    message: string
    onClose: () => void
    severity?: 'success' | 'error' | 'info'
}

export const Toast = ({ open, message, onClose, severity }: ToastProps) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            variant="soft"
            autoHideDuration={5000}
            onClose={onClose}
            color={
                severity === 'success'
                    ? 'success'
                    : severity === 'error'
                      ? 'danger'
                      : 'primary'
            }
        >
            {severity === 'success' ? (
                <CheckCircle weight="fill" className="size-7" />
            ) : severity === 'error' ? (
                <XCircle weight="fill" className="size-7" />
            ) : (
                <Info weight="fill" className="size-7" />
            )}
            {message}
        </Snackbar>
    )
}
