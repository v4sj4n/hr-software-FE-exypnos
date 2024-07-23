import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { inputStyles } from "../../Styles";
import { InputProps } from "../Interface";

const UsernameInput: React.FC<InputProps> = (props) => {
  const { initialValue, width } = props;

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
        width: width || 'auto',
      }}
      InputLabelProps={{
        style: { 
          color: "#4C556B", 
          fontFamily: '"Outfit", sans-serif', 
          fontSize: "12px", 
          left: '3px',
          top: '5px',
          transformOrigin: 'left top'
        },
      }}
      InputProps={{
        disableUnderline: true,
        endAdornment: props.icon && (
          <InputAdornment sx={{
            width: 40,
            cursor: "pointer"
          }} 
          position="end">
            {props.icon}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default UsernameInput;