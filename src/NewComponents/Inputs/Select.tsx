import {
    FormControl,
    FormHelperText,
    FormLabel,
    Option,
    Select as JoySelect,
} from '@mui/joy'
import { ReactNode } from 'react'

interface InputProps {
    options: { value: string; label: string }[]
    name?: string
    variant?: 'outlined' | 'plain' | 'soft' | 'solid'
    color?: 'danger' | 'success' | 'warning' | 'primary' | 'neutral'
    label?: string
    placeholder?: string
    error?: string
    value?: string
    onChange?:
        | ((
              event:
                  | React.MouseEvent
                  | React.KeyboardEvent
                  | React.FocusEvent
                  | null,
              value: string | null,
          ) => void)
        | undefined
    startDecorator?: ReactNode
    endDecorator?: ReactNode
}

export const Select = ({
    options,
    label,
    error = '',
    placeholder = '',
    value,
    onChange,
    startDecorator,
    endDecorator,
    variant = 'outlined',
    color = 'neutral',
}: InputProps) => {
    return (
        <FormControl error={error.length > 0}>
            {label && <FormLabel>{label}</FormLabel>}
            <JoySelect
                variant={variant}
                color={color}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            >
                {options.map(({ label, value }) => {
                    return (
                        <Option key={value} value={value}>
                            {label}
                        </Option>
                    )
                })}
            </JoySelect>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}
