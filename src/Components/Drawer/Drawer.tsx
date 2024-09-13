import Drawer from '@mui/material/Drawer'
import { Box } from '@mui/material'

interface DrawerComponentProps {
    children: React.ReactNode
    open: boolean
    onClose: () => void
}

function DrawerComponent({ children, open, onClose }: DrawerComponentProps) {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 2,
                }}
            >
                {children}
            </Box>
        </Drawer>
    )
}

export default DrawerComponent
