import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import { inputStyles } from '../../Styles'

interface SelecterProps {
    value: string | string[]
    onChange: (value: string | string[]) => void
    options: string[]
    multiple: boolean
    label: string
    name: string
    width: string
}

const Selecter = ({
    value,
    onChange,
    options,
    multiple,
    label,
    name,
    width,
}: SelecterProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (
        event: React.SyntheticEvent,
        newValue: string | string[] | null,
    ) => {
        event.preventDefault()
        if (newValue !== null) {
            onChange(newValue)
        } else {
            onChange([])
        }
    }

    return (
        <Autocomplete
            id={name}
            open={isOpen}
            multiple={multiple}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            options={options}
            value={multiple ? (value as string[]) : (value as string)}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="filled"
                    size="small"
                    sx={{ ...inputStyles, width: width || '100%' }}
                    InputLabelProps={{
                        style: {
                            color: '#4C556B',
                            fontFamily: '"Outfit", sans-serif',
                        },
                        shrink: true,
                    }}
                    InputProps={{
                        disableUnderline: true,
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                    }}
                />
            )}
        />
    )
}


export default Selecter
