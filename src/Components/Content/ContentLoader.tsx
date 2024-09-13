import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

export default function EventsContentLoader() {
    return (
        <Box
            sx={{
                marginBottom: '16px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
            }}
        >
            <Stack spacing={2}>

                <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.5rem', width: '60%' }}
                />

            
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem', width: '80%' }}
                />

             
                <Skeleton
                    variant="rectangular"
                    sx={{ width: '100%', height: '24px' }}
                />

                <Skeleton
                    variant="rectangular"
                    sx={{ width: '100%', height: '24px' }}
                />

             
                <Skeleton
                    variant="rectangular"
                    sx={{ width: '100%', height: '30px', borderRadius: '16px' }}
                />

       
                <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                />
            </Stack>
        </Box>
    )
}