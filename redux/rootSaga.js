import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import followerConnectionSaga from './followerConnection/followerConnectionSaga';
import recommendationsSaga from './recommendations/recommendationsSaga';
import topicsSaga from './topics/topicsSaga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(followerConnectionSaga),
    fork(recommendationsSaga),
    fork(topicsSaga),
  ]);
}

export default rootSaga;
