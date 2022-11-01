import React from "react";
import "./sidebar.scss";
import User from "../../../assets/user1.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-user">
        <img src={User} alt="user-avatar" className="sidebar-user-image" />
        <h2 className="common-heading">Mohneesh Saxena</h2>
        <p className="grey-heading-500 m-0">mohneesh@3scsolution.com</p>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-menu-header">System Admin</div>
        <div className="sidebar-menu-container">
          <ul className="sidebar-menu-list m-0 p-0">
            <li className="sidebar-menu-item active">
              <i className="fa fa-suitcase sidebar-menu-icon"></i> <span>Client Creation</span>{" "}
            </li>
            <li className="sidebar-menu-item">
              <i className="fa fa-user-circle sidebar-menu-icon"></i>
              <span>User</span>
            </li>
            <li className="sidebar-menu-item">
            <i className="fa fa-cogs sidebar-menu-icon"></i>
              <span>Roles</span>
            </li>
            <li className="sidebar-menu-item">
            <i className="fa fa-unlock-alt sidebar-menu-icon"></i>
              <span>Permission</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
