import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

interface ToastProps {
    open: boolean
    message: string
    onClose: () => void
    severity: 'success' | 'error'
}

export default function Toast({
    open,
    message,
    onClose,
    severity,
}: ToastProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
