import * as React from "react";
import UsernameInput from "./components/Text/Text";
import PasswordInput from "./components/Password/Password";
import CheckboxInput from "./components/Checkbox/Checkbox";
import { InputProps } from "./components/Interface";

const Input: React.FC<InputProps> = (props) => {
  const renderInput = () => {
    switch (true) {
      case props.IsUsername:
        return <UsernameInput {...props} />;
      case props.isPassword:
        return <PasswordInput {...props} />;
      case props.isCheckBox:
        return <CheckboxInput {...props} />;
      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
};

export default Input;
