export interface InputProps {
    initialValue?: string
    helperText?: string
    id?: string
    value?: string | Date | number | undefined
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    variant?: 'outlined'
    error?: boolean
    errortext?: string
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    IsUsername?: boolean
    inputRef?: React.RefObject<HTMLInputElement>
    isCheckBox?: boolean
    isFilter?: boolean
    type?: boolean | string
    isPassword?: boolean
    icon?: React.ReactNode
    isCalendar?: boolean
    disabled?: boolean
    name: string
    onClick?: () => void
    onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
    width?: string | number
    style?: React.CSSProperties
    className?: string
    placeholder?: string
    multiline?: boolean
    rows?: number
    flex?: number | string
    iconPosition?: 'start' | 'end'
    shrink?: boolean
}