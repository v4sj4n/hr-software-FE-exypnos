import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

 function BasicRating({
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


 function ChangeRating({
    label,
    name,
    value,
    onChange,
}: {
    label: string
    name: string
    value: number
    onChange: (event: React.ChangeEvent<{}>, value: number | null) => void
}): JSX.Element {

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">{label}</Typography>
      <Rating
        name={name}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

export { BasicRating , ChangeRating };