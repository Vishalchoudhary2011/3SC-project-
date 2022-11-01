import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: true,
  errorMsg: "",
  ErrorCode: "",
  personnel: [],
  csvUpload: false,
  csvUploadError: null,
  csvDownload: false,
  csvUploadResponseData: null,
  csvUploadResponseCode: null,
};

export const PersonnelSlice = createSlice({
  name: "personnel",
  initialState: initialState,
  reducers: {
    getAllPersonnelSlice: (state, action) => {
      state.personnel = action.payload;
      state.loader = false;
      return state;
    },
    personnelCSVUploadInitiate: (state) => {
      state.csvUpload = false;
      return state;
    },
    personnelCSVUploadComplete: (state, action) => {
      state.csvUpload = true;
      state.csvUploadResponseData = action.payload;
      return state;
    },
    personnelCSVUploadError: (state, action) => {
      state.csvUploadError = action.payload;
      return state;
    },
  },
});

export const {
  getAllPersonnelSlice,
  personnelCSVUploadInitiate,
  personnelCSVUploadComplete,
  personnelCSVUploadError,
} = PersonnelSlice.actions;

export default PersonnelSlice.reducer;
