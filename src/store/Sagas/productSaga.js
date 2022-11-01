import { put, takeEvery } from "redux-saga/effects";
import {
  getAllProductsAPI,
  getProductHierrachy,
  uploadCSVDataAPI,
} from "../../apis";
import {
  getAllProductsSlice,
  productCSVUploadComplete,
  productCSVUploadError,
} from "../Slices/ProductSlice";
import { GET_ALL_PRODUCTS, UPLOAD_PRODUCT_CSV_DATA } from "../Types";
import { toast } from "react-toastify";

export function* getAllProductsSaga(action) {
  try {
    getProductHierrachy();
    const products = yield getAllProductsAPI(action.payload);
    yield put(getAllProductsSlice(products.data.responseData));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

export function* uploadProductCSVSaga(action) {
  try {
    const res = yield uploadCSVDataAPI(action.payload);
    yield put(productCSVUploadComplete(res.data.responseData));
  } catch (error) {
    console.log(error.response.data);
    yield put(productCSVUploadError(error.response.data.responseData));
  }
}

export function* watchProductSaga() {
  yield takeEvery(GET_ALL_PRODUCTS, getAllProductsSaga);
  yield takeEvery(UPLOAD_PRODUCT_CSV_DATA, uploadProductCSVSaga);
}
