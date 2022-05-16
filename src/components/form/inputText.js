import { useMemo } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

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
  inputValue,
  helper,
  label,
  placeholder,
  textColor
}) {
  return (
    <FormControl
      sx={{ width: "100%" }}
      md={{ width: "100%" }}
      variant="standard"
      color="primary"
    >
      <OutlinedInput
        sx={{ width: "100%" }}
        md={{ width: "100%" }}
        placeholder={placeholder}
        label={label}
        color="secondary"
        name={inputName}
        value={inputValue}
        onChange={(e) => handleChange(e)}
        variant="outlined"
        autoComplete="new-password"
        style={{ color: textColor }}
      />
      <MyFormHelperText helper={helper} />
    </FormControl>
  );
}
