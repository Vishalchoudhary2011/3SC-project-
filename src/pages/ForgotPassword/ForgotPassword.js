import React, { useState } from "react";
import "./forgot-password.scss";
import validator from "validator";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import Logo1 from "../../assets/logo.png";

const ForgotPassword = () => {
  const [formData, SetFormData] = useState({
    email: "",
  });

  const [emailError, setEmailError] = useState(false);

  const { email } = formData;

  const onChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
    validator.isEmail(email) && setEmailError(false);
  };

  const checkError = () => {
    if (validator.isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  return (
    <div className="forgot-password">
      <div>
        <div style={{ marginBottom: "45px" }}>
          <img src={Logo1} alt="logo" />
        </div>
      </div>
      <div className="forgot-password-form">
        <h1 className="forgot-password-heading">{"Forgot Password?"}</h1>
        <span className="forgot-password-subheading">
          {"Send a link on your mail ID"}
        </span>
        <TextField
          className="forgot-password-input"
          id="outlined-basic"
          label={"Email ID"}
          variant="outlined"
          name="email"
          value={email}
          onBlur={checkError}
          helperText={[
            emailError && (
              <div style={{ color: "red" }} key="mail">
                {" "}
                *Enter a valid email ID
              </div>
            ),
          ]}
          onChange={(e) => onChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  {<MailOutlineIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button className="forgot-password-button">{"Change Password"}</button>
        <Link to={"/"} className="remove-underline">
          <div className="forgot-password-back">
            <KeyboardBackspaceIcon />
            <span>{"Back to Login"}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
