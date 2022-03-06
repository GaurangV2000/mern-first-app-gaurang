import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="erPage">
        <h1 className="headerp text-center ">404 : Page Not Found</h1>
        <NavLink className="links linkerp" to="/">
         Click Here : Back to Home Page
        </NavLink>
      </div>
    </>
  );
};

export default ErrorPage;
