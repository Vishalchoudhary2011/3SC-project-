import React, { useEffect, useState } from "react";
import "./set-new-password.scss";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import Logo1 from "../../assets/logo.png";
import validator from "validator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SetNewPassword = () => {
  const [formData, SetFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    otp: "",
  });

  const [check, setCheckError] = useState({
    passwordValid: null,
    passwordMatching: null,
  });

  const {
    newPassword,
    confirmPassword,
    showConfirmPassword,
    showPassword,
    otp,
  } = formData;

  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => {
    SetFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    SetFormData({
      ...formData,
      showConfirmPassword: !formData.showConfirmPassword,
    });
  };

  const checkPassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setCheckError({ ...check, passwordValid: true });
    } else {
      setCheckError({ ...check, passwordValid: false });
    }
  };

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setCheckError({ ...check, passwordMatching: false });
    } else {
      newPassword !== "" &&
        confirmPassword !== "" &&
        setCheckError({ ...check, passwordMatching: true });
    }
  }, [formData]);

  console.log(newPassword === confirmPassword, check, formData);

  return (
    <div className="set-new-passsword">
      <div>
        <div style={{ marginBottom: "45px" }}>
          <img src={Logo1} alt="logo" />
        </div>
      </div>
      <div className="set-new-passsword-form">
        <h1 className="set-new-passsword-heading">{"Change Password"}</h1>
        <span className="set-new-passsword-subheading">
          {"Your new password must be different to"} <br />{" "}
          {"previously used passwords."}
        </span>

        <div className="set-new-passsword-input">
          <TextField
            label={"New Password"}
            variant="outlined"
            name="newPassword"
            value={newPassword}
            onChange={(e) => {
              onChange(e);
              checkPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {check.passwordValid ? (
            <>
              <CheckCircleIcon className="input-check-icon" />
            </>
          ) : (
            <> </>
          )}

          <span className="set-new-passsword-disclaimer">
            {"Must be at least 8 characters."}
          </span>
        </div>
        <div className="set-new-passsword-input">
          <TextField
            label={"Confirm Password"}
            className="set-new-passsword-input"
            variant="outlined"
            name="confirmPassword"
            value={confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => {
              onChange(e);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {check.passwordMatching ? (
            <>
              <CheckCircleIcon className="input-check-icon" />
            </>
          ) : (
            <> </>
          )}
        </div>
        <div className="set-new-passsword-input">
          <TextField
            label={"OTP"}
            variant="outlined"
            name="otp"
            value={otp}
            onChange={(e) => onChange(e)}
            type={showPassword ? "text" : "password"}
          />
          <span className="set-new-passsword-disclaimer">
            {"6 digit OTP send on your registered mobile number"}
          </span>

          <span className="text-center mt-3">
            {"Din’t recieve code?"}{" "}
            <strong style={{ color: "#292666" }}>{"Send Again"}</strong>{" "}
          </span>
        </div>

        <button className="set-new-passsword-button">
          {" "}
          {"Reset Password"}{" "}
        </button>
        <Link to="/" className="remove-underline">
          <div className="set-new-passsword-back">
            <KeyboardBackspaceIcon />
            <span>{"Back to Login"}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SetNewPassword;
