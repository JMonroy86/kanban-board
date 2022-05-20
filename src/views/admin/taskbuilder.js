import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { SelectVariants } from "../../components/form/selectInput";
import { ControlledAccordions } from "../../components/accordion/simpleAccordion";
import { Context } from "../../store/appContext";
import { CreateTaskModal } from "./components/createTask";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff0",
  border: "none",
  boxShadow: "none",
  fontSize: "1.5rem",
  padding: theme.spacing(2),
  textAlign: "left",
  color: "#b26a00",
}));

const theme = createTheme();

theme.typography.h3 = {
  fontFamily: "Righteous",
  color: "#b26a00",
  fontSize: "1.3rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
};

export const TaskBuilder = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { store, actions } = useContext(Context);
  useEffect(() => {
    // actions.getAllDevs();
    actions.getAllTasks();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Typography variant="h3">KanbanBoard</Typography>
        </Grid>
        <Grid item xs={store.currentUser?.rolsId !== 2 ? 4 : 5}>
          <Item>
            <SelectVariants />
          </Item>
        </Grid>
        {store.currentUser?.rolsId !== 2 && (
          <Grid item xs={1} style={{ alignItems: "center", display: "flex" }}>
            <Item>
              <AddCircleOutlineSharpIcon
                fontSize={"large"}
                onClick={handleOpen}
              />
            </Item>
          </Grid>
        )}
      </Grid>
      {store.devsTask?.length !== 0 ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ControlledAccordions />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="info">
              <Typography fontSize={'1.2rem'}>The kanbanBoard is empty, your are free! 🍻😎🌴</Typography>
              </Alert>
            </Stack>
          </Grid>
        </Grid>
      )}

      <CreateTaskModal open={open} handleClose={handleClose} />
    </ThemeProvider>
  );
};
