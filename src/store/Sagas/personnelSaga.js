import { put, takeEvery } from "redux-saga/effects";
import {
  getAllPersonnelAPI,
  getPersonnelHierrachy,
  uploadCSVDataPersonnelAPI,
} from "../../apis";
import {
  getAllPersonnelSlice,
  personnelCSVUploadComplete,
  personnelCSVUploadError,
} from "../Slices/personnelSlice";
import { GET_ALL_PERSONNEL, UPLOAD_PERSONNEL_CSV_DATA } from "../Types";
import { toast } from "react-toastify";

export function* getAllPersonnelSaga(action) {
  try {
    getPersonnelHierrachy();
    const personnel = yield getAllPersonnelAPI(action.payload);
    yield put(getAllPersonnelSlice(personnel.data.responseData));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

export function* uploadPersonnelCSVSaga(action) {
  try {
    const res = yield uploadCSVDataPersonnelAPI(action.payload);
    yield put(personnelCSVUploadComplete(res.data.responseData));
  } catch (error) {
    console.log(error.response.data);
    yield put(personnelCSVUploadError(error.response.data.responseData));
  }
}

export function* watchPersonnelSaga() {
  yield takeEvery(GET_ALL_PERSONNEL, getAllPersonnelSaga);
  yield takeEvery(UPLOAD_PERSONNEL_CSV_DATA, uploadPersonnelCSVSaga);
}
