import { useState } from "react";

type InputState = {
  enteredValue: string;
  isTouched: boolean;
  showPassword: boolean;
  type: boolean;
};

type InputActions = {
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  InputBlurHandler: () => void;
  reset: () => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type InputHookReturn = InputState &
  InputActions & { hasError: boolean; isValid: boolean };

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isTouched,
    showPassword,
    valueChangeHandler,
    InputBlurHandler,
    reset,
    handleClickShowPassword,
    handleMouseDownPassword,
    hasError,
    isValid: valueIsValid,
  } as InputHookReturn;
};

export default useInput;
