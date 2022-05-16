import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export const SelectVariants = () => {
  const { store, actions } = useContext(Context);
  const [dev, setDev] = useState("");

  const handleChange = (event) => {
    setDev(event.target.value);
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{
          m: 1,
          minWidth: 120,
          width: "100%",
          outlineColor: "#fff",
          borderColor: "#fff",
        }}
      >
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ color: "warning.main" }}
        >
          <FilterAltIcon fontSize={"small"}/> 
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={dev}
          onChange={handleChange}
          label="dev"
          sx={{ color: "warning.main" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {store.devs.map((dev, i) => {
            return <MenuItem value={dev.name}>{dev.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};
