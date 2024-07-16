import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputProps {
  initialValue?: string;
  placeholder?: string;
  helperText?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  errortext?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  IsUsername?: boolean;
  type?: boolean | string;
  Icon?: React.ReactNode;
  isPassword?: boolean;
  name: string;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string | number;
  height?: string | number;
}

const Input: React.FC<InputProps> = (props) => {
  const { initialValue } = props;

  return (
    <div>
      {props.IsUsername && (
        <TextField
        helperText={props.helperText}
          type={typeof props.type === 'boolean' ? 'text' : props.type}
          id={props.id}
          label={props.label}
          onBlur={props.onBlur}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          error={props.error}
          defaultValue={initialValue}
          name={props.name}
          variant="filled"
          fullWidth
          autoComplete="off"
          sx={{
         
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
              "& .css-10botns-MuiInputBase-input-MuiFilledInput-input ": {
                color: "#000000",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#4C556B" },
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      )}

      {props.isPassword && (
        <FormControl fullWidth>
          <TextField
            value={props.value}
            onChange={props.onChange}
            helperText={props.error ? props.errortext : ""}
            error={props.error}
            label={props.label}
            onBlur={props.onBlur}
            variant={props.variant}
            id={props.id}
            type={props.type === true ? "text" : "password"}
            InputLabelProps={{
              style: { color: "#4C556B" },
            }}
            sx={{
               maxWidth: "350px",
              "& .MuiFilledInput-root": {
                border: "1px solid #999999",
                overflow: "hidden",
                backgroundColor: "transparent",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                  boxShadow: `none`,
                  borderColor: "#999999",
                },
              },
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  sx={{
                    width: 30,
                    cursor:"pointer"
                  }}
                  position="end"
                  aria-label="toggle password visibility"
                  onClick={props.onClick}
                >
                  {props.type === true ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}
    </div>
  );
};

export default Input;
