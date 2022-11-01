import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage/ProductPage";
import ErrorPage from "../globalComponent/ErrorPage/Error";
import ProductTable from "../pages/DemandPlanner/ProductTable";
import Snoppage from "../pages/snop/SnopPage";
import SnopForecast from "../pages/snop/SnopForecast/SnopForecast";
import PersonnelPage from "../pages/PersonnelPage/personnelPage";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/personnel" element={<PersonnelPage />} />
        <Route path="/product-table" element={<ProductTable />} />
        <Route path="/dpai/snop" element={<Snoppage/>} />
        <Route path="/dpai/snop/forecast" element={<SnopForecast/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Routing;
