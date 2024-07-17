import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { inputStyles } from './Styles';

interface InputProps {
  initialValue?: string;
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
  isPassword?: boolean;
  name: string;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string | number;
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
          error={props.error}
          defaultValue={initialValue}
          name={props.name}
          variant="filled"
          fullWidth
          autoComplete="off"
          sx={{
            ...inputStyles,
          }}
          InputLabelProps={{
            style: { color: "#4C556B", fontFamily: '"Outfit", sans-serif', fontSize:"12px" },
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
              style: { color: "#4C556B", fontFamily: '"Outfit", sans-serif', fontSize:"12px" },
            }}
            sx={{...inputStyles }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  sx={{
                    width: 40,
                    cursor: "pointer"
                  }}
                  position="end"
                  aria-label="toggle password visibility"
                  onClick={props.onClick}
                >
                  {props.type === true ? <VisibilityOff sx={{color:"#1B5FF4"}}/> : <Visibility />}
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
