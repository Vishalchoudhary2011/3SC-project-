import React, { useState } from "react";
import "../../style/loginPage.css";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner_3sc.jfif";
import headerIcon from "../../assets/header.png";
import ScaiIcon from "../../assets/3sc.png";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    client: window.location.hostname,
  });
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setData({ ...data, email: e });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login login-left">
        <img src={banner} alt="Login Page Image" />
      </div>
      <div className="login login-right">
        <div className="login-form">
          <div className="form-header">
            <h3>Welcome Back ?</h3>
            <h4>Sign in to continue to 3SC Portal </h4>
            <img src={headerIcon} alt="Form Icon" />
          </div>
          <div className="form-icon">
            <img src={ScaiIcon} alt="Form Icon" />
          </div>

          <form className="form-container">
            <label>Email</label>
            <input
              className="form-input"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => handleEmail(e.target.value)}
            />
            <input
              type="checkbox"
              className="form-checkbox"
              value="remember_me"
              disabled
            />{" "}
            <span>Rember Me</span>
            <button
              type="submit"
              onClick={(e) => submitForm(e)}
              className="btn primary-button"
            >
              Login
            </button>
            <div className="forgot-pass">
              <p>Forgot your password ?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
