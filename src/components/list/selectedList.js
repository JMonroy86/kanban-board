import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

export const SelectedListItem = ({ tasks }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "none" }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {tasks.map((task, i) => {
          return (
            <ListItemButton key={i}
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i)}
            >
              <ListItemText primary={task.name} secondary={task.id}  />
              <ListItemText secondary={task.date}/>
              
            </ListItemButton>
          );
        })}
        
      </List>
    </Box>
  );
};
