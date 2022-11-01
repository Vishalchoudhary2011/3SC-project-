import { put, takeEvery } from 'redux-saga/effects'
import {
  createSnopAPI,
  deleteSnopAPI,
  editSnopAPI,
  getAllSnopAPI,
} from '../../apis'
import { getAllSnopSlice } from '../Slices/SNOPSlice'
import { EDIT_SNOP, GET_ALL_SNOP, CREATE_SNOP, DELETE_SNOP } from '../Types'
import { toast } from 'react-toastify'
import {
  deleteSnopSlice,
  createSnopSlice,
  editSnopSlice,
} from '../Slices/SNOPSlice';
import i18next from 'i18next';

export function* getAllSnopSaga() {
  try {
    const snop = yield getAllSnopAPI()
    yield put(getAllSnopSlice(snop.data.data))
  } catch (error) {
    toast.error(error.message)
  }
}

export function* createSnopSaga(action) {
  try {
    const response = yield createSnopAPI(action.payload)
    yield put(createSnopSlice(response.data))
    toast.success(i18next.t("RequiredValidationMessageDemandReview"))
    const snop = yield getAllSnopAPI()
    yield put(getAllSnopSlice(snop.data.data))
  } catch (error) {
    console.log(error)
    toast.error(i18next.t("SNOPErrorMessage"))
  }
}

export function* editSnopSaga(action) {
  try {
    yield editSnopAPI(action.payload)
    yield put(editSnopSlice(action.payload))
    toast(i18next.t("SuccessfullUpdateMessage"))
  } catch {
    toast(i18next.t("SNOPErrorMessage"))
  }
}

export function* deleteSnopSaga(action) {
  try {
    yield deleteSnopAPI(action.payload)
    yield put(deleteSnopSlice(action.payload))
    toast.success(i18next.t("SuccessfullDeleteMessage"))
    const snop = yield getAllSnopAPI()
    yield put(getAllSnopSlice(snop.data.data))
  } catch (error) {
    toast(i18next.t("SNOPErrorMessage"))
  }
}

export function* watchSnopSaga() {
  yield takeEvery(GET_ALL_SNOP, getAllSnopSaga)
  yield takeEvery(EDIT_SNOP, editSnopSaga)
  yield takeEvery(CREATE_SNOP, createSnopSaga)
  yield takeEvery(DELETE_SNOP, deleteSnopSaga)
}
