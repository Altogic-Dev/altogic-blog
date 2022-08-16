import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSaga";

function* rootSaga() {
  yield all([fork(authSaga)]);
}

export default rootSaga;