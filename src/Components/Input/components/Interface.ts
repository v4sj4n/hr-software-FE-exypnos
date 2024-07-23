export interface InputProps {
    initialValue?: string;
    helperText?: string;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    variant?: 'outlined';
    error?: boolean;
    errortext?: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    IsUsername?: boolean;
    isCheckBox?: boolean;
    type?: boolean | string;
    isPassword?: boolean;
    icon?: React.ReactNode;
    isCalendar?: boolean;
    disabled?: boolean;
    name: string;
    onClick?: () => void;
    onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width?: string | number;
  }