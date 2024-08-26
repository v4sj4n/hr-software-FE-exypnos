import { UseFormRegisterReturn } from 'react-hook-form'
export interface InputProps {
  initialValue?: string
  helperText?: string
  id?: string
  value?: string | Date | number | undefined|Geolocation|null
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  variant?: 'outlined'
  error?: boolean
  errortext?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  IsUsername?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
  isCheckBox?: boolean
  type?: boolean | string
  isPassword?: boolean
  icon?: React.ReactNode
  isCalendar?: boolean
  disabled?: boolean
  name: string
  onClick?: () => void
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
  width?: string | number
  register?: UseFormRegisterReturn
  style?: React.CSSProperties
  className?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  flex?: number | string;
  iconPosition?: 'start' | 'end';
  shrink?: boolean;
}
