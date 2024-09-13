import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputProps } from '../Interface';

const Filter: React.FC<InputProps> = (props) => {
    const { onChange, type, label, name } = props;
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '10ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField
                onChange={onChange}
                id="standard-basic"
                label={label}
                name={name}
                type={type}
                variant="standard"
                size="small"
                sx={{
                    '& .MuiInputBase-input': {
                        fontSize: '16px', 
                        fontFamily: '"Outfit", sans-serif',
                        color: '#4C556B',
                    },
                    fontSize: '14px', 
                }}
                InputLabelProps={{
                    style: {
                        color: '#4C556B',
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '14px', 
                        zIndex: 1,
                    },
                    shrink: true,
                }}
            />
        </Box>
    );
}

export default Filter;