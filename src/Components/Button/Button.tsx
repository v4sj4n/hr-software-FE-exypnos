import './Button.css'
import { ButtonTypes } from './ButtonTypes'
import React, { CSSProperties } from 'react'

type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes]

interface ButtonStyles extends CSSProperties {
    backgroundColor?: string
    color?: string
    borderColor?: string
    width?: string | number
    height?: string | number
    fontSize?: string | number
    padding?: string
    margin?: string
    borderRadius?: string | number
}

interface ButtonProps extends ButtonStyles {
    isSubmit?: boolean;
    type: ButtonType;
    btnText: string | JSX.Element;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: React.ReactNode;
    cursor?: string;    
}

const Button: React.FC<ButtonProps> = ({
    isSubmit,
    type,
    btnText,
    disabled,
    icon,
    onClick,
    ...restProps
}) => {
    const theme = useTheme(); 

    const getButtonClass = (): string => {
        switch (type) {
            case ButtonTypes.PRIMARY:
                return 'primaryBtn';
            case ButtonTypes.SECONDARY:
                return 'secondaryBtn';
            case ButtonTypes.TERTIARY:
                return 'tertiaryBtn';
            case ButtonTypes.DISABLED:
                return 'disabled';
            default:
                return 'primaryBtn';
        }
    };

    const dynamicStyles: React.CSSProperties = {
        backgroundColor:
            type === ButtonTypes.PRIMARY
                ? theme.palette.primary.main
                : type === ButtonTypes.SECONDARY
                ? 'transparent'
                : undefined,
        color:
            type === ButtonTypes.PRIMARY || type === ButtonTypes.TERTIARY
                ? '#fff'
                : type === ButtonTypes.SECONDARY
                ? theme.palette.text.secondary
                : undefined,
        borderColor:
            type === ButtonTypes.PRIMARY || type === ButtonTypes.TERTIARY
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
                cursor: disabled ? 'default' : 'pointer',

        ...restProps, 
    };

    return (
        <button
            disabled={disabled}
            type={isSubmit ? 'submit' : 'button'}
            onClick={onClick}
            className={getButtonClass()} 
            style={dynamicStyles} 
        >
            {btnText}
            {icon}
        </button>
    );
};

export default Button;
