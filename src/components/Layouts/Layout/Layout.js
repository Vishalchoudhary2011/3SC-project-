import React from "react";
import Header from "../Header"
import Sidebar from "../Sidebar";
import "./layout.scss";

const Layout = (props) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <div className="layout-content-main">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
