import "./App.css";
import injectContext from "./store/appContext";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home";

const App = () => {
  return (
    <CssBaseline CssBaseline>
      <Container maxWidth="xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CssBaseline>
  );
};

export default injectContext(App);
