import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DevsTable } from "./components/devsTable";
import { useContext, useEffect, useState } from "react";
import { CreateDevModal } from "./components/createDev";
import { Store } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import {Context} from '../../store/appContext'

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

export const Devs = () => {
  const {store} = useContext(Context)
  const [open, setOpen] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState("");
  const navigate = useNavigate()
  const handleOpen = () => {
    let randomId = Math.floor(Math.random() * (50 - 0)) + 0;
    setUrlAvatar(`https://i.pravatar.cc/150?img=${randomId}`);
    setOpen(true);
  };

  useEffect(() => {

    if (store.currentUser?.rolsId !== 1) {
      navigate("/dashboard/main");
    }
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Typography variant="h3">Users Manager</Typography>
        </Grid>
        <Grid item>
          <Item>
            <AddCircleOutlineSharpIcon
              fontSize={"large"}
              onClick={handleOpen}
            />
          </Item>
        </Grid>
      </Grid>

      <DevsTable />
      <CreateDevModal open={open} handleClose={handleClose} url={urlAvatar} />
    </ThemeProvider>
  );
};
