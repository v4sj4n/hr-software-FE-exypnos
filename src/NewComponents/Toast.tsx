import { Cancel, CheckCircle, Info } from '@mui/icons-material'
import { Snackbar } from '@mui/joy'

interface ToastProps {
    open: boolean
    message: string
    onClose: () => void
    severity?: 'success' | 'error'
}

export default function Toast({
    open,
    message,
    onClose,
    severity,
}: ToastProps) {
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
                <CheckCircle />
            ) : severity === 'error' ? (
                <Cancel />
            ) : (
                <Info />
            )}
            {message}
        </Snackbar>
    )
}
