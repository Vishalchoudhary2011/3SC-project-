import React, { useState } from "react";
import "./login.scss";
import {
  TextField,
  InputAdornment,
  IconButton,
  //   OutlinedInput,
  //   InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
import Logo1 from "../../assets/logo.png";
import axios from "axios";
import validator from "validator";
import { loginRequest } from "../../utils/ApiHandler";

const Login = () => {
  const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

  const [formData, SetFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [emailError, setEmailError] = useState(false);

  const handleClickShowPassword = () => {
    SetFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const { email, password, showPassword } = formData;

  const checkError = () => {
    if (validator.isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    SetFormData({ ...formData, [prop]: event.target.value });
    validator.isEmail(email) && setEmailError(false);
  };

  const loginUser = async (email, password) => {
    const body = { email, password };

    try {
      const res = await loginRequest("/users/login/", body);
      console.log({ res });
      localStorage.setItem("user", JSON.stringify(res.data.data));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="login">
      <div className="logo-container">
        <div style={{ marginBottom: "45px" }}>
          <img src={Logo1} alt="logo" />
        </div>
      </div>
      <div className="login-form">
        <h1 className="login-heading">{"Welcome!"}</h1>
        <span className="login-subheading">{"Sign into your account"}</span>

        <TextField
          className="login-input"
          label={"Email ID"}
          variant="outlined"
          value={email}
          onChange={handleChange("email")}
          onBlur={checkError}
          helperText={[
            emailError && (
              <div style={{ color: "red" }} key="mail">
                {" "}
                *Enter a valid email ID
              </div>
            ),
          ]}
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

        <TextField
          label={"Password"}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link to={"/forgot-password"} className="login-forgot remove-underline">
          <span>{"Forgot password?"}</span>
        </Link>
        {/* <Link to="/ifba" className="remove-underline"> */}
        <button
          className="login-button"
          onClick={() => loginUser(email, password)}
        >
          {" "}
          {"Login"}{" "}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Login;
