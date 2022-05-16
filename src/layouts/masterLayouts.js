import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Route, Navigate, Routes } from "react-router-dom";
import { MainMenu } from "../components/menu/menu";

const Master = ({ children }) => {
  return (
    <div>
      <MainMenu />
      {children}
    </div>
  );
};
const MasterRoute = ({ element: Component, ...others }) => {
  const { store, actions } = useContext(Context);

  if (store.currentUser === null) {
    const user = localStorage.getItem("auth");
    if (user !== null) {
      actions.revalidate(JSON.parse(user));
    } else {
      return <Navigate to="/" replace  />;
    }
  }
  return (
    <Routes>
      <Route
        {...others}
        render={(props) => (
          <Master>
            <Component {...props} />
          </Master>
        )}
      />
    </Routes>
  );
};

export default MasterRoute;
