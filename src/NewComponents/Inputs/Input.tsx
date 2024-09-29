import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input as JoyInput,
} from '@mui/joy'
import { HTMLInputTypeAttribute, ReactNode } from 'react'

interface InputProps {
    type: HTMLInputTypeAttribute
    name?: string
    variant?: 'outlined' | 'plain' | 'soft' | 'solid'
    color?: 'danger' | 'success' | 'warning' | 'primary' | 'neutral'
    label?: string
    placeholder?: string
    error?: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    fullWidth?: boolean
    startDecorator?: ReactNode
    endDecorator?: ReactNode
    size?: 'sm' | 'md' | 'lg'

}

export const Input = ({
    type,
    name,
    variant = 'outlined',
    color = 'neutral',
    label,
    error = '',
    placeholder = '',
    value,
    onChange,
    fullWidth = false,
    startDecorator,
    endDecorator,
    size = "md"
}: InputProps) => {
    return (
        <FormControl error={error.length > 0}>
            {label && <FormLabel>{label}</FormLabel>}
            <JoyInput
                type={type}
                name={name}
                placeholder={placeholder}
                variant={variant}
                color={color}
                value={value}
                onChange={onChange}
                fullWidth={fullWidth}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                size={size}
            />
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}
