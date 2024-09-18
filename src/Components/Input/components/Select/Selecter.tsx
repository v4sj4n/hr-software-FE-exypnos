import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import { inputStyles } from '../../Styles'

interface Option {
    label: string;
    value: string;
}

interface SelecterProps {
    value: string | string[]
    onChange: (value: string | string[]) => void
    options: Option[] | string[]
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

    const normalizedOptions: Option[] = options.map((option) => 
        typeof option === 'string' ? { label: option, value: option } : option
    )

    const handleChange = (
        event: React.SyntheticEvent,
        newValue: Option | Option[] | null,
    ) => {
        event.preventDefault()
        if (newValue !== null) {
            if (multiple) {
                onChange((newValue as Option[]).map(option => option.value))
            } else {
                onChange((newValue as Option).value)
            }
        } else {
            onChange(multiple ? [] : '')
        }
    }

    const getValue = () => {
        if (multiple) {
            return normalizedOptions.filter(option => 
                Array.isArray(value) ? value.includes(option.value) : value === option.value
            )
        } else {
            return normalizedOptions.find(option => option.value === value) || null
        }
    }

    return (
        <Autocomplete
            id={name}
            open={isOpen}
            multiple={multiple}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            options={normalizedOptions}
            getOptionLabel={(option: Option) => option.label}
            value={getValue()}
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