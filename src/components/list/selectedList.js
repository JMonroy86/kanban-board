import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { UpdateTaskModal } from "../../views/admin/components/updateTask";

export const SelectedListItem = ({ tasks }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [open, setOpen] = useState(false);

  const handleListItemClick = (index) => {
    setOpen(true);
    setSelectedIndex(index);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "none" }}>
        <List component="nav" aria-label="secondary mailbox folder">
          {tasks.map((task) => {
            return (
              <ListItemButton
                key={task.id}
                selected={selectedIndex === task.id}
                onClick={() => handleListItemClick(task.id)}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        width: "70%",
                        color: "#999",
                        fontSize: "0.9rem",
                        fontFamily: "Roboto Mono",
                        fontWeight: 600,
                      }}
                    >
                      {`Id: ${task.id}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText primary={`Title: ${task.title}`} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        width: "70%",
                        color: "#999",
                        fontSize: "0.9rem",
                        fontFamily: "Roboto Mono",
                        fontWeight: 600,
                      }}
                    >
                      {`Created by: ${task.creator}`}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <UpdateTaskModal open={open} handleClose={handleClose} taskId={selectedIndex} />
    </>
  );
};
