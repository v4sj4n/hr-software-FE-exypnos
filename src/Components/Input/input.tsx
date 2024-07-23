import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { inputStyles, chekboxStyles } from './Styles';
import {  FormControlLabel, Checkbox } from "@mui/material";

interface InputProps {
  initialValue?: string;
  
  helperText?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: 'outlined' ;
  error?: boolean;
  errortext?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  IsUsername?: boolean;
  isCheckBox?: boolean;
  type?: boolean | string;
  isPassword?: boolean;
  disabled?: boolean;
  name: string;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string | number;
}

const Input: React.FC<InputProps> = (props) => {
  const { initialValue } = props;

  const renderInput = () => {
    switch(true) {
      case props.IsUsername:
        return (
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
            disabled={props.disabled}
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
        );
      case props.isPassword:
        return (
          <FormControl fullWidth>
            <TextField
              value={props.value}
              onChange={props.onChange}
              helperText={props.error ? props.errortext : ""}
              error={props.error}
              name={props.name}
              label={props.label}
              onBlur={props.onBlur}
              variant="filled"
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
        );
        case props.isCheckBox:
          return (
            <FormControlLabel
                    control={<Checkbox />}
                    label={props.label} sx={{ ...chekboxStyles }}
                    disabled={props.disabled}
                />
          )
      default:
        return null;
    }
  };

  return (
    <div>
      {renderInput()}
    </div>
  );
};

export default Input;