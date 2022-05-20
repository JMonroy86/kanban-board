import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import UseFormControl from "../components/form/inputText";
import { useContext, useEffect, useState } from "react";
import { InputPassword } from "../components/form/inputPassword";
import { LoadingButtonsTransition } from "../components/form/button";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CustomizedSnackbars } from "../components/alerts/snackbar";
import axios from "axios";
import { ClickableChips } from "../components/chip/chipClickable";
import { Typography } from "@mui/material";
import { FormDialog } from "./createPsw";

const theme = createTheme({});

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [admin, setAdmin] = useState(null);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getAdmin = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin`, {
        headers: {
          Authorization: `Bearer ${store.currentUser?.accessToken}`,
        },
      });
      setAdmin(res.data ? res.data : null);
    };
    getAdmin();
  }, []);

  useEffect(() => {
    if (store.error !== null) {
      setMessage(store.error);
      setSeverity("error");
    } else if (store.currentUser !== null) {
      setSeverity("success");
      setMessage("Awesome! - Welcome");
    }
  }, [store.error, store.currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    actions.login(state, navigate);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} justifyContent="center">
          <Box
            display="flex"
            height={"100vh"}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
              component="form"
              autoComplete="off"
              m="auto"
            >
              <Grid
                container
                item
                xs={12}
                md={12}
                marginBottom={4}
                justifyContent="center"
              >
                <img
                  src="https://colab.research.google.com/img/colab_favicon_256px.png"
                  alt=""
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                marginBottom={4}
                container
                justifyContent="center"
              >
                {admin === null && <ClickableChips />}
              </Grid>
              <Grid item xs={12} md={12} marginBottom={4}>
                <UseFormControl
                  handleChange={handleChange}
                  inputName={"email"}
                  inputType={"email"}
                  helper={"e.g.: jhondoe@mydnadigital.com"}
                  inputValue={state.senderEmail}
                  placeholder={"Your Email"}
                  label={"Email"}
                  textColor={"#fff"}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputPassword
                  handleChange={handleChange}
                  inputValue={state.password}
                  inputName={"password"}
                  color={'#fff'}
                />
              </Grid>
              <Grid item xs={12} md={12} marginTop={2}>
                <LoadingButtonsTransition
                  loading={loading}
                  text={"Login"}
                  icon={"login"}
                />
              </Grid>
              <Grid item xs={12} md={12} paddingTop={4} textAlign={'center'}>
                <Typography
                  sx={{
                    color: "#ed6c02",
                    fontFamily: "Roboto Mono",
                    fontSize: "1rem",
                  }}
                  onClick={()=>setOpenDialog(true)}
                >
                  Click here to create your password
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </ThemeProvider>
      <CustomizedSnackbars
        open={open}
        setOpen={setOpen}
        severity={severity}
        message={message}
      />
      <FormDialog handleClose={handleClose} open={openDialog}/>
    </>
  );
};
