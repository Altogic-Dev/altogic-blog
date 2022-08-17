import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import followerConnectionSaga from "./followerConnection/followerConnectionSaga";

function* rootSaga() {
  yield all([fork(authSaga), fork(followerConnectionSaga)]);
}

export default rootSaga;