import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: true,
  errorMsg: "",
  ErrorCode: "",
  products: [],
  csvUpload: false,
  csvUploadError: null,
  csvDownload: false,
  csvUploadResponseData: null,
  csvUploadResponseCode: null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getAllProductsSlice: (state, action) => {
      state.products = action.payload;
      state.loader = false;
      return state;
    },
    productCSVUploadInitiate: (state) => {
      state.csvUpload = false;
      return state;
    },
    productCSVUploadComplete: (state, action) => {
      state.csvUpload = true;
      state.csvUploadResponseData = action.payload;
      return state;
    },
    productCSVUploadError: (state, action) => {
      state.csvUploadError = action.payload;
      return state;
    },
  },
});

export const {
  getAllProductsSlice,
  productCSVUploadInitiate,
  productCSVUploadComplete,
  productCSVUploadError,
} = ProductSlice.actions;

export default ProductSlice.reducer;
