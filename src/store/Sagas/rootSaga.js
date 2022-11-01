import { all } from "redux-saga/effects";
import { watchPersonnelSaga } from "./personnelSaga";
import { watchProductSaga } from "./productSaga";
import { watchSnopSaga } from "./snopSaga";

export function* watcherSaga() {
  yield all([watchProductSaga(), watchSnopSaga(), watchPersonnelSaga()]);
}
