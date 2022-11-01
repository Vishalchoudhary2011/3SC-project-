import * as actionTypes from "../Action/Actiontypes";

const initialState = {
  loader: false,
  errorMsg: "",
  loginStatus: false,
  initial: true,
  ErrorCode: "",
};

export const ifbaReducer = (action, state = initialState) => {
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
    default:
      return state;
  }
};
