import * as React from "react";
import TextField from "@mui/material/TextField";

interface InputProps {
  initialValue?: string;
  placeholder?: string;
  helperText?: string;
  isCssTextField?: boolean;
  autoComplete?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  errortext?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  IsUsername?: boolean;
  type?: string;
  Icon?: React.ReactNode;
  isPassword?: boolean;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = (props) => {
  const { initialValue } = props;

  return (
    <div>
      <TextField
        helperText={props.error ? props.errortext : ""}
        type={props.type}
        id={props.id}
        label={props.label}
        onBlur={props.onBlur}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        error={props.error}
        defaultValue={initialValue}
        variant="filled"
        fullWidth
        autoComplete="off"
        sx={{
          maxWidth: "400px",
          "& .MuiFilledInput-root": {
            border: "1px solid #999999",
            overflow: "hidden",
            backgroundColor: "transparent",
            borderRadius: 1,
            color: "#000000",
           
            "&.Mui-focused": {
              backgroundColor: "transparent",
              boxShadow: `none`,
              borderColor: "#999999",
               color: "#000000",
              
            },
            "&:hover": {
              backgroundColor: "transparent",
               color: "#000000",
              borderColor: "#999999",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& .css-10botns-MuiInputBase-input-MuiFilledInput-input ":{
                color: "#000000",
            }
          },
        }}
        InputLabelProps={{
          style: { color: "#000000" },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </div>
  );
};

export default Input;
