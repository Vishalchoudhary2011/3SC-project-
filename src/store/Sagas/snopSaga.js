import { put, takeEvery } from "redux-saga/effects";
import { getAllSnopAPI } from "../../apis";
import { getAllSnopSlice } from "../Slices/SNOPSlice";
import { GET_ALL_SNOP } from "../Types";
import { toast } from "react-toastify";

export function* getAllSnopSaga() {
  try {
    const snop = yield getAllSnopAPI();
    yield put(getAllSnopSlice(snop.data.data));
  } catch (error) {
    toast.error(error.message);
  }
}

export function* watchSnopSaga() {
  yield takeEvery(GET_ALL_SNOP, getAllSnopSaga);
}
