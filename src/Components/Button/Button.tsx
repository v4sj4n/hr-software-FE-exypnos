// import "./Button.css";
// import { ButtonTypes } from "./ButtonTypes";
// import React from 'react';

// type ButtonType = typeof ButtonTypes[keyof typeof ButtonTypes];

// interface ButtonStyles {
//   backgroundColor?: string;
//   color?: string;
//   borderColor?: string;
//   width?: string | number;
//   height?: string | number;
//   fontSize?: string | number;
//   padding?: string;
//   margin?: string;
//   borderRadius?: string | number;
//   // Mund të shtoni më shumë stile sipas nevojës
// }

// interface ButtonProps extends ButtonStyles {
//   type: ButtonType;
//   btnText: string | JSX.Element;
//   disabled?: boolean;
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }

// const Button: React.FC<ButtonProps> = ({
//   type,
//   btnText,
//   disabled,
//   onClick,
//   backgroundColor,
//   color,
//   borderColor,
//   width,
//   height,
//   fontSize,
//   padding,
//   margin,
//   borderRadius,
//   ...restProps
// }) => {
//   const getButtonClass = (): string => {
//     switch (type) {
//       case ButtonTypes.PRIMARY:
//         return "primaryBtn button";
//       case ButtonTypes.SECONDARY:
//         return "secondaryBtn";
//       case ButtonTypes.TERTIARY:
//         return "tertiaryBtn";
//       case ButtonTypes.DISABLED:
//         return "disabled";
//       default:
//         return "primaryBtn";
//     }
//   };

//   const buttonStyle: React.CSSProperties = {
//     backgroundColor,
//     color,
//     borderColor,
//     width,
//     height,
//     fontSize,
//     padding,
//     margin,
//     borderRadius,
//     ...restProps
//   };

//   // Heqim çdo prop që është undefined
//   Object.keys(buttonStyle).forEach(key => buttonStyle[key] === undefined && delete buttonStyle[key]);

//   return (
//     <button
//       disabled={disabled}
//       type={type === ButtonTypes.DISABLED ? "button" : "submit"}
//       onClick={onClick}
//       className={getButtonClass()}
//       style={buttonStyle}
//     >
//       {btnText}
//     </button>
//   );
// };

// export default Button;

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
  isSubmit?: boolean
  type: ButtonType
  btnText: string | JSX.Element
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  color?: string
  icon?: React.ReactNode
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
  const getButtonClass = (): string => {
    switch (type) {
      case ButtonTypes.PRIMARY:
        return 'primaryBtn button'
      case ButtonTypes.SECONDARY:
        return 'secondaryBtn'
      case ButtonTypes.TERTIARY:
        return 'tertiaryBtn'
      case ButtonTypes.DISABLED:
        return 'disabled'
      default:
        return 'primaryBtn'
    }
  }

  const buttonStyle: ButtonStyles = {
    ...restProps,
  }

  return (
    <button
      disabled={disabled}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      className={getButtonClass()}
      style={buttonStyle}
    >
      {btnText}
      {icon}
    </button>
  )
}

export default Button
