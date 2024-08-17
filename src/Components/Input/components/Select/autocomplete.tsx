import React from 'react'
import { Box, TextField, Chip, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { autoCompleteStyles } from '../../Styles'

interface MuiSelectProps {
    value: string[]
    onChange: (value: string[]) => void
    name: string
}

export const MuiSelect: React.FC<MuiSelectProps> = ({
    value,
    onChange,
    name,
}) => {
    const handleDelete = (chipToDelete: string) => () => {
        onChange(value.filter((item) => item !== chipToDelete))
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const newValue = event.target.value
        onChange(typeof newValue === 'string' ? newValue.split(',') : newValue)
    }

    const technologies = ['Angular', 'jQuery', 'Polymer', 'React', 'Vue.js']

    return (
        <Box width="620px">
            <TextField
                sx={{
                    ...autoCompleteStyles,
                }}
                variant="filled"
                SelectProps={{
                    multiple: true,
                    renderValue: (selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {(selected as string[]).map((data) => (
                                <Chip
                                    sx={{
                                        fontFamily: '"Outfit", sans-serif',
                                        fontSize: '14px',
                                    }}
                                    key={data}
                                    label={data}
                                    onDelete={handleDelete(data)}
                                    onMouseDown={(event) => {
                                        event.stopPropagation()
                                    }}
                                />
                            ))}
                        </Box>
                    ),
                    onChange: handleChange,
                }}
                fullWidth
                label="Used technologies"
                size="small"
                select
                value={value}
                name={name}
                InputLabelProps={{
                    style: {
                        color: '#4C556B',
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '12px',
                    },
                }}
            >
                {technologies.map((tech) => (
                    <MenuItem
                        sx={{ fontFamily: '"Outfit", sans-serif' }}
                        key={tech}
                        value={tech}
                    >
                        {tech}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}
