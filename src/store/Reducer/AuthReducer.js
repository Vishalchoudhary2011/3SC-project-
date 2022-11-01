import * as actionTypes from "../Action/Actiontypes";

const initialState = {
  loader: false,
  errorMsg: "",
  loginStatus: false,
  initial: true,
  ErrorCode: "",
};

export const authReducer = (action, state = initialState) => {
  console.log("action=", action);

  switch (action.type) {
    case actionTypes.LOGIN_INITIAL:
      return {
        ...state,
        errorMsg: "",
        loader: true,
        loginStatus: false,
        initial: true,
        ErrorCode: "",
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: action.payload,
        errorMsg: "",
        loader: false,
        initial: true,
        ErrorCode: "",
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loginStatus: false,
        errorMsg: action.payload,
        loader: false,
        initial: false,
        ErrorCode: action.ErrorCode,
      };
    case actionTypes.CLEAR_LOGIN_STATE:
      return {
        ...state,
        loader: false,
        loginStatus: false,
        ErrorCode: "",
        errorMsg: "",
      };
    default:
      return state;
  }
};
