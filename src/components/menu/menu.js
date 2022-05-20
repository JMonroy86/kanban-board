import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Context } from "../../store/appContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { SpeedDialTooltipOpen } from "../speedDial/speedDial";

export const MainMenu = () => {
  const { store, actions } = useContext(Context);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const navigate = useNavigate();

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    actions.logout(navigate);
  };

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="warning">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <SpeedDialTooltipOpen />
          </Typography>
          {store.currentUser && (
            <Button
              color="inherit"
              onClick={handleClick({
                vertical: "top",
                horizontal: "right",
              })}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          See ya soon! 👋
        </Alert>
      </Snackbar>
    </Box>
  );
};
