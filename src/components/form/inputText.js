import { useMemo } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { InputLabel } from "@mui/material";

function MyFormHelperText({ helper }) {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return "This field is being focused";
    }

    return helper;
  }, [focused]);

  return (
    <FormHelperText style={{ color: "#737679" }}>{helperText}</FormHelperText>
  );
}

export default function UseFormControl({
  handleChange,
  inputName,
  inputType,
  inputValue,
  helper,
  label,
  textColor,
}) {
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel style={{ color: "#737679" }}>{label}</InputLabel>
      <OutlinedInput
        id="email"
        type={inputType}
        value={inputValue}
        name={inputName}
        color="secondary"
        onChange={(e) => handleChange(e)}
        style={{ color: textColor }}
        label={label}
      />
      <MyFormHelperText helper={helper} />
    </FormControl>
  );
}
