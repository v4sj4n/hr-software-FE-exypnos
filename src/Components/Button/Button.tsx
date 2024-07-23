import "./Button.css";
import { ButtonTypes } from "./ButtonTypes";

type ButtonType = typeof ButtonTypes[keyof typeof ButtonTypes];

interface ButtonProps {
  type: ButtonType;
  btnText: string | JSX.Element;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, btnText, disabled, onClick }) => {
  const getButtonClass = (): string => {
    switch (type) {
      case ButtonTypes.PRIMARY:
        return "primaryBtn button";
      case ButtonTypes.CreateEmploye:
        return "employ button";
      case ButtonTypes.SECONDARY:
        return "secondaryBtn";
      case ButtonTypes.TERTIARY:
        return "tertiaryBtn";
      case ButtonTypes.FOLLOW:
        return "followBtn";
      case ButtonTypes.POST:
        return "postBtn";
      case ButtonTypes.DISABLED:
        return "disabled";
      default:
        return "primaryBtn";
    }
  };

  return (
    <button
      disabled={disabled}
      type={type === ButtonTypes.DISABLED ? "button" : "submit"}
      onClick={onClick}
      className={getButtonClass()}
    >
      {btnText}
    </button>
  );
};

export default Button;
