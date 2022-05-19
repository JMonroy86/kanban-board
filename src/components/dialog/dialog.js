import { forwardRef, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid } from "@mui/material";
import { ImageAvatars } from "../avatars/avatar";
import { Context } from "../../store/appContext";
import axios from "axios";
import { CustomizedSnackbars } from "../alerts/snackbar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogAlert = ({ userId, handleClose, setOpen, open }) => {
  const [dev, setDev] = useState(null);
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    const getUserToUpdate = async () => {
      try {
        if (userId !== null) {
          const res = await axios.get(
            `http://localhost:5000/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${store.currentUser?.accessToken}`,
              },
            }
          );
          const { id, email, name, photo, rols } = res.data;
          setDev({
            id: id,
            email: email,
            name: name,
            urlAvatar: photo,
            rol: rols.id,
          });
        }
      } catch (error) {
        throw error;
      }
    };
    getUserToUpdate();
  }, [userId]);

  const deleteUser = async () => {
    try {
      setOpenSnack(true);
      setMessage("Please wait a little bit, we're trying to delete the user");
      setSeverity("info");
      const res = await axios.delete(
        `http://localhost:5000/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${store.currentUser?.accessToken}`,
          },
        }
      );

      setTimeout(() => {
        setOpenSnack(true);
        setMessage(res.data.message);
        setSeverity("success");
      }, 3000);
      setTimeout(() => {
        handleClose();
        actions.getAllUsers();
      }, 3500);
    } catch (error) {
      setOpenSnack(true);
      setMessage(error.message);
      setSeverity("error");
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ backgroundColor: "#333", color: "#fff" }}>
          {"Are you sure to delete this user?"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#333" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <ImageAvatars url={dev?.urlAvatar} width={100} height={100} />
              </Grid>
              <Grid item xs={8} paddingTop={1}>
                <Grid item xs={12}>
                  <DialogContentText
                    id="alert-dialog-slide-description"
                    color={"#999"}
                    fontSize={"1.3rem"}
                  >
                    {dev?.name}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText
                    id="alert-dialog-slide-description"
                    color={"#999"}
                    fontSize={"1rem"}
                  >
                    {dev?.email}
                  </DialogContentText>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#333" }}>
          <Button color="warning" onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={() => deleteUser()}>Agree</Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars
        open={openSnack}
        setOpen={setOpenSnack}
        severity={severity}
        message={message}
      />
    </div>
  );
};
