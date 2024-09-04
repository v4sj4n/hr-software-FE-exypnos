import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { inputStyles } from '../../Styles'
import { InputProps } from '../Interface'

const UsernameInput: React.FC<InputProps> = (props) => {
    const { initialValue, width, name, flex, iconPosition, icon, shrink } =
        props

    const adornment = icon && (
        <InputAdornment
            sx={{
                width: 40,
                cursor: 'pointer',
            }}
            position={iconPosition || 'end'}
        >
            {icon}
        </InputAdornment>
    )

    return (
        <TextField
            helperText={props.helperText}
            type={typeof props.type === 'boolean' ? 'text' : props.type}
            id={props.id}
            label={props.label}
            onBlur={props.onBlur}
            value={props.value}
            onChange={props.onChange}
            inputRef={props.inputRef}
            error={props.error}
            defaultValue={initialValue}
            disabled={props.disabled}
            style={props.style}
            className={props.className}
            rows={props.rows || 1}
            multiline={props.multiline}
            size="small"
            name={name}
            variant="filled"
            fullWidth
            autoComplete="off"
            sx={{
                ...inputStyles,
                width: width || '100%',
                flex: flex || '100%',
            }}
            InputLabelProps={{
                style: {
                    color: '#4C556B',
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '14px',
                    zIndex: 1,
                },
                shrink: shrink,
            }}
            InputProps={{
                disableUnderline: true,
                startAdornment:
                    iconPosition === 'start' ? adornment : undefined,
                endAdornment:
                    iconPosition === 'end' || !iconPosition
                        ? adornment
                        : undefined,
            }}
        />
    )
}

export default UsernameInput
