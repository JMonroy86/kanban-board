import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const InputSelect = ({ handleChange, rol, rolToUpdate }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rolToUpdate}
          label="Rol"
          onChange={handleChange}
        >
          <MenuItem value={rolToUpdate}>
            None
          </MenuItem>
          {rol.map((rol) => {
            return (
              <MenuItem key={rol.id} value={rol.id}>
                {rol.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
