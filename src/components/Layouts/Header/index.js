import React from "react";
import "./header.scss";
import Logo from "../../../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo-container">
        <img src={Logo} alt="logo" className="header-logo" />
      </div>
      <div className="header-content">
        <h2 className="common-heading">3sc Global Personnel</h2>
        <div className="header-logout">
        <AiOutlineLogout className="header-logout-logo"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
