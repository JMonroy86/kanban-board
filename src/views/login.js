import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import UseFormControl from "../components/form/inputText";
import { useState } from "react";
import { InputPassword } from "../components/form/inputPassword";
import { LoadingButtonsTransition } from "../components/form/button";
import { useNavigate } from "react-router-dom";


const theme = createTheme({});

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(state);
    setTimeout(function () {
      setLoading(false);
      navigate("/dashboard/main")
    }, 3000);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent="center">
        <Box display="flex" height={"100vh"} onSubmit={(e) => handleSubmit(e)}>
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
              
              xs={6}
              md={12}
              marginBottom={4}
              justifyContent="center"
            >
              <img
                src="https://colab.research.google.com/img/colab_favicon_256px.png"
                alt=""
              />
            </Grid>
            <Grid item  xs={6} md={12} marginBottom={4}>
              <UseFormControl
                handleChange={handleChange}
                inputName={"email"}
                helper={"e.g.: jhondoe@mydnadigital.com"}
                inputValue={state.senderEmail}
                placeholder={"Your Email"}
                label={"Email"}
                textColor={"#fff"}
              />
            </Grid>
            <Grid item  xs={6} md={12}>
              <InputPassword
                handleChange={handleChange}
                inputValue={state.password}
                inputName={"password"}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12} marginTop={2}>
              <LoadingButtonsTransition loading={loading} text={"Login"}  icon={'login'}/>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
