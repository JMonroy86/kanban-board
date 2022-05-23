import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputPassword } from "../components/form/inputPassword";
import { useContext, useState } from "react";
import { Grid } from "@mui/material";
import UseFormControl from "../components/form/inputText";
import { Box } from "@mui/system";
import { CustomizedSnackbars } from "../components/alerts/snackbar";
import { Context } from "../store/appContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FormDialog = ({ handleClose, open }) => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await actions.createPsw(formData);
    if (res.message) {
      setOpenSnack(true);
      setMessage(res.response.data.message);
      setSeverity("error");
    } else {
      setOpenSnack(true);
      setMessage("Password created successfully, Welcome!");
      setSeverity("success");
      setTimeout(() => {
        navigate("/dashboard/main");
      }, 3000);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create account</DialogTitle>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
          component="form"
          autoComplete="off"
          m="auto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <DialogContent>
            <DialogContentText>
              Welcome to KanBanBoard, please enter the email address you used to
              create your account and then create your password.
            </DialogContentText>
            <Grid item xs={12} md={12} paddingY={2} textAlign={"center"}>
              <UseFormControl
                handleChange={handleChange}
                inputName={"email"}
                inputType={"email"}
                helper={"e.g.: jhondoe@mydnadigital.com"}
                inputValue={formData.email}
                placeholder={"Your Email"}
                label={"Email"}
                textColor={"#999"}
              />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6} paddingTop={3} textAlign={"center"}>
                <InputPassword
                  handleChange={handleChange}
                  inputValue={formData.password}
                  inputName={"password"}
                  color={"#000"}
                />
              </Grid>
              <Grid item xs={12} md={6} paddingTop={2} textAlign={"center"}>
                <InputPassword
                  handleChange={handleChange}
                  inputValue={formData.passwordConfirm}
                  inputName={"passwordConfirm"}
                  color={"#000"}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Send
            </Button>
          </DialogActions>
        </Box>
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
