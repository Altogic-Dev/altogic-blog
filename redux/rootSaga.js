import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import followerConnectionSaga from "./followerConnection/followerConnectionSaga";
import storySaga from "./story/storySaga";
import reportSaga from "./report/reportSaga";

function* rootSaga() {
  yield all([
    fork(authSaga), 
    fork(storySaga), 
    fork(followerConnectionSaga), 
    fork(reportSaga)
  ]);
}

export default rootSaga;