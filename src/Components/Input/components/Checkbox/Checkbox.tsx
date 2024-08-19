import * as React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { chekboxStyles } from '../../Styles'
import { InputProps } from '../Interface'

const CheckboxInput: React.FC<InputProps> = (props) => {
    return (
        <FormControlLabel
            control={<Checkbox size="small" />}
            label={props.label}
            sx={{ ...chekboxStyles }}
            disabled={props.disabled}
        />
    )
}

export default CheckboxInput
