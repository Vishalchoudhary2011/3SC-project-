import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage/ProductPage";
import ErrorPage from "../globalComponent/ErrorPage/Error";
import Sidebar from "../components/Layouts/Sidebar/sidebar";
//Snop
import Snoppage from "../pages/snop/SnopPages/Snoppage";
import SnopForecast from "../pages/snop/SnopForecast/SnopForecast";
import PersonnelPage from "../pages/PersonnelPage/personnelPage";
import Data from "../pages/snop/CreateSnop/Data";
import WeeklySnop from "../pages/snop/Weekly_Cal/WeeklySnop";
import Quaterly from "../pages/snop/Quaterly/Quaterly";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/personnel" element={<PersonnelPage />} />
        <Route path="/dpai/snop" element={<Snoppage/>} />
        <Route path="/dpai/snop/forecast" element={<SnopForecast/>} />
        <Route path="/ifba/data" element={<Data/>} />
        <Route path="/ifba/Weekly-Snop" element={<WeeklySnop/>} />
        <Route path="/ifba/Quaterly" element={<Quaterly/>} />
        <Route path="/ifba/Sidebar" element={<Sidebar/>} />

        {/* Protected routes */}

        {/* Wildcard route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Routing;
