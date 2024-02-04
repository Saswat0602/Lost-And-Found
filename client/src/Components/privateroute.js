import React from "react";
import { useNavigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate(); // Move useNavigate inside the component

  return (
    <Route
      {...rest}
      exact
      element={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          navigate("/log-in"); // Call the function to navigate
          return null; // Return null here, as there's no rendering needed
        }
      }}
    />
  );
};

export default PrivateRoute;
