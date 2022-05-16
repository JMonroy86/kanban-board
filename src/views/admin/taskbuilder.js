import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DevsTable } from "./components/devsTable";
import { useState } from "react";
import { CreateDevModal } from "./components/createDev";
import { SelectVariants } from "../../components/form/selectInput";
import { ControlledAccordions } from "../../components/accordion/simpleAccordion";

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
  const [urlAvatar, setUrlAvatar] = useState("");
  const handleOpen = () => {
    let randomId = Math.floor(Math.random() * (50 - 0)) + 0;
    setUrlAvatar(`https://i.pravatar.cc/150?img=${randomId}`);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Typography variant="h3">Tasks Builder</Typography>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <SelectVariants />
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ControlledAccordions />
        </Grid>
      </Grid>

      <CreateDevModal open={open} handleClose={handleClose} url={urlAvatar} />
    </ThemeProvider>
  );
};
