import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

export default function BasicRating({
    type,
    value,
}: {
    type: string
    value: number
}) {
    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            <Typography component="legend">{type}</Typography>
            <Rating name="read-only" value={value} readOnly />
        </Box>
    )
}
