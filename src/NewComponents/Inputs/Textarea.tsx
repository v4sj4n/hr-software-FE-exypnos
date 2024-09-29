import {
    FormControl,
    FormHelperText,
    FormLabel,
    Textarea as JoyTextArea,
} from '@mui/joy'
import { ChangeEventHandler, ReactNode } from 'react'

interface InputProps {
    name?: string
    variant?: 'outlined' | 'plain' | 'soft' | 'solid'
    color?: 'danger' | 'success' | 'warning' | 'primary' | 'neutral'
    label?: string
    placeholder?: string
    error?: string
    minRows?: number
    value?: string
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
    startDecorator?: ReactNode
    endDecorator?: ReactNode
}

export const Textarea = ({
    name,
    variant = 'outlined',
    color = 'neutral',
    label,
    error = '',
    placeholder = '',
    value,
    onChange,
    startDecorator,
    endDecorator,
    minRows = 3,
}: InputProps) => {
    return (
        <FormControl error={error.length > 0}>
            {label && <FormLabel>{label}</FormLabel>}
            <JoyTextArea
                name={name}
                variant={variant}
                color={color}
                minRows={minRows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
            />
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}
