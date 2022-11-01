import React from "react";
import { Routes, Route } from "react-router-dom";

// import ProtectedRoutes from "./ProtectedRoutes";
import GridData from "../pages/GridData/GridData";
// import LoginPage from "../pages/LoginPage/loginPage";
import Login from "../pages/Login/Login";
// import Dashboard from "../pages/Dashboard/dashboard";
import ErrorPage from "../globalComponent/ErrorPage/Error";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import SetNewPassword from "../pages/SetNewPassword/SetNewPassword";
import ClientCreation from "../pages/ClientCreation/ClientCreation";
import AdminFrontend from "../pages/AdminFrontend/AdminFrontend";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route
          path="/ifba"
          element={<GridData />}
          render={() => <GridData />}
        />
        <Route
          path="/iam"
          element={<AdminFrontend />}
          render={() => <AdminFrontend />}
        />
        <Route
          path="/ifba/client-creation"
          element={<ClientCreation />}
          render={() => <ClientCreation />}
        />
        {/* Protected routes */}

        {/* Wildcard route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Routing;
