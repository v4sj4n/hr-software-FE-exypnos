import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { inputStyles } from '../../Styles'
import { InputProps } from '../Interface'

const PasswordInput: React.FC<InputProps> = (props) => {
    return (
        <FormControl fullWidth>
            <TextField
                value={props.value}
                onChange={props.onChange}
                helperText={props.error ? props.errortext : ''}
                error={props.error}
                name={props.name}
                label={props.label}
                onBlur={props.onBlur}
                variant="filled"
                size="small"
                id={props.id}
                type={props.type === true ? 'text' : 'password'}
                InputLabelProps={{
                    style: {
                        color: '#4C556B',
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '14px',
                    },
                }}
                sx={{ width: props.width || 'auto', ...inputStyles }}
                InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                        <InputAdornment
                            sx={{
                                width: 40,
                                cursor: 'pointer',
                            }}
                            position="end"
                            aria-label="toggle password visibility"
                            onClick={props.onClick}
                        >
                            {props.type === true ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </InputAdornment>
                    ),
                }}
            />
        </FormControl>
    )
}

export default PasswordInput
