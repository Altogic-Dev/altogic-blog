import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import followerConnectionSaga from './followerConnection/followerConnectionSaga';
import recommendationsSaga from './recommendations/recommendationsSaga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(followerConnectionSaga),
    fork(recommendationsSaga),
  ]);
}

export default rootSaga;
