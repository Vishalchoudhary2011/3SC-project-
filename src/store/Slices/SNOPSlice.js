import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: true,
  errorMsg: "",
  ErrorCode: "",
  snop: [],
};

export const SnopSlice = createSlice({
  name: "snop",
  initialState: initialState,
  reducers: {
    getAllSnopSlice: (state, action) => {
      state.snop = action.payload;
      state.loader = false;
      return state;
    },
  },
});

export const { getAllSnopSlice } = SnopSlice.actions;

export default SnopSlice.reducer;
