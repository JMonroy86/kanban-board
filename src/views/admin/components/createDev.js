import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/appContext";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import UseFormControl from "../../../components/form/inputText";
import { LoadingButtonsTransition } from "../../../components/form/button";
import { ImageAvatars } from "../../../components/avatars/avatar";
import { InputSelect } from "../../../components/form/selectMenu";
import { createUser } from "../../../services/user";
import { CustomizedSnackbars } from "../../../components/alerts/snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

export const CreateDevModal = ({ open, handleClose, url }) => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [state, setState] = useState({
    email: "",
    name: "",
    urlAvatar: "",
    rol: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setState({ ...state, rol: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createUser(state, store.currentUser.accessToken);
    if (res.response) {
      setLoading(false);
      setOpenSnack(true);
      setMessage(res.response.data.message);
      setSeverity("error");
    } else {
      setOpenSnack(true);
      setMessage(res.message);
      setSeverity("success");

      setState({ email: "", name: "", urlAvatar: "", rol: "" });
      setTimeout(function () {
        actions.getAllUsers();
        setLoading(false);
        handleClose();
      }, 3000);
    }
  };

  useEffect(() => {
    setState({ ...state, urlAvatar: url });
  }, [url]);
  useEffect(() => {
    actions.getRols();
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            component="form"
            autoComplete="off"
            m="auto"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid
                item
                sm={6}
                xs={6}
                md={5}
                marginBottom={2}
                marginTop={4}
                justifyContent="center"
              >
                <ImageAvatars url={state.urlAvatar} width={200} height={200} />
              </Grid>
              <Grid item sm={6} xs={6} md={6} marginBottom={2} marginTop={2}>
                <Grid item sm={6} xs={6} md={12} marginBottom={2}>
                  <UseFormControl
                    handleChange={handleChange}
                    inputName={"name"}
                    inputType={"text"}
                    helper={"e.g.: Jhon Doe"}
                    inputValue={state.name}
                    placeholder={"Name"}
                    label={"Name"}
                    textColor={"#000"}
                  />
                </Grid>
                <Grid item sm={6} xs={6} md={12} marginBottom={2}>
                  <UseFormControl
                    handleChange={handleChange}
                    inputName={"email"}
                    helper={"e.g.: jhondoe@mydnadigital.com"}
                    inputValue={state.email}
                    placeholder={"Email"}
                    label={"Email"}
                  />
                </Grid>
                <Grid item sm={6} xs={6} md={12} marginBottom={2}>
                  <InputSelect
                    handleChange={handleSelectChange}
                    rol={store.rols}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={12} marginTop={2}>
                  <LoadingButtonsTransition
                    loading={loading}
                    text={"Save"}
                    icon={"save"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
      <CustomizedSnackbars
        open={openSnack}
        setOpen={setOpenSnack}
        severity={severity}
        message={message}
      />
    </div>
  );
};
