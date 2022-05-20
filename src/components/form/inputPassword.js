import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export const InputPassword = ({ handleChange, inputValue, inputName, color }) => {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel
        htmlFor="outlined-adornment-password"
        style={{ color: "#737679" }}
      >
        Password
      </InputLabel>
      <OutlinedInput
        type={values.showPassword ? "text" : "password"}
        value={inputValue}
        name={inputName}
        color="secondary"
        onChange={(e) => handleChange(e)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? (
                <VisibilityOff style={{ color: "#737679" }} />
              ) : (
                <Visibility style={{ color: "#737679" }} />
              )}
            </IconButton>
          </InputAdornment>
        }
        style={{ color: color }}
        label="Password"
      />
    </FormControl>
  );
};
