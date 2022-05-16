import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const InputSelect = ({ handleChange, rol }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rol}
          label="Rol"
          onChange={handleChange}
        >
          <MenuItem value={'Admin'}>Admin</MenuItem>
          <MenuItem value={'Dev'}>Dev</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
