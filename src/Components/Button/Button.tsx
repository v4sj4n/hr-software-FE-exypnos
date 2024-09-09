// Button.tsx
import React from 'react';
import { useTheme } from '@mui/material/styles'; // Import the theme hook
import { ButtonTypes } from './ButtonTypes';
import './Button.css'; // Import your CSS file for button styles

type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

interface ButtonStyles {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
    padding?: string;
    margin?: string;
    borderRadius?: string | number;
    display?: string;
    justifyContent?: string;
    alignItems?: string;
}

interface ButtonProps extends ButtonStyles {
    isSubmit?: boolean;
    type: ButtonType;
    btnText: string | JSX.Element;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: React.ReactNode;
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
    const theme = useTheme(); // Get the current theme

    // Get the button class based on the type
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

    // Dynamically set the style based on the theme
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
