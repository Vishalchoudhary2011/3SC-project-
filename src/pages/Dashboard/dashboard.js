import React from "react";
import "./dashboard.css";

const Dashboard = () => {

  return (
    <>
      <div className="wrapper">
        <div className="section">
          <div className="container">
            <div className="dashboard">
              <h1>Welcome to {window.location.host}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
