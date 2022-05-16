import "./App.css";
import injectContext from "./store/appContext";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./views/login";
import { MainMenu } from "./components/menu/menu";
import { Home } from "./views/home";
import { Devs } from "./views/admin/devs";
import { TaskBuilder } from "./views/admin/taskbuilder";

function Dashboard() {
  return (
    <>
      <MainMenu />

      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <CssBaseline CssBaseline>
      <Container maxWidth="lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="main" element={<Home />} />
              <Route exact path="tasks_builder" element={<TaskBuilder />} />
              <Route exact path="devs_manager" element={<Devs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </CssBaseline>
  );
};

export default injectContext(App);
