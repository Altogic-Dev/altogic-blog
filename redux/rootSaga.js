import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import followerConnectionSaga from './followerConnection/followerConnectionSaga';
import storySaga from './story/storySaga';
import reportSaga from './report/reportSaga';
import recommendationsSaga from './recommendations/recommendationsSaga';
import subscribeConnectionSaga from './subscribeConnection/subscribeConnectionSaga';
import publicationSaga from './publication/publicationSaga';
import topicsSaga from './topics/topicsSaga';
import generalSaga from './general/generalSaga';
import fileSaga from './file/fileSaga';
import bookmarkSaga from './bookmarks/bookmarkSaga';
import notificationsSaga from './notifications/notificationsSaga';
import statsSaga from './stats/statsSaga';
import paymentSaga from './payment/paymentSaga';
import blockConnectionSaga from './blockConnection/blockConnectionSaga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(storySaga),
    fork(followerConnectionSaga),
    fork(reportSaga),
    fork(recommendationsSaga),
    fork(subscribeConnectionSaga),
    fork(publicationSaga),
    fork(fileSaga),
    fork(topicsSaga),
    fork(generalSaga),
    fork(bookmarkSaga),
    fork(notificationsSaga),
    fork(statsSaga),
    fork(paymentSaga),
    fork(blockConnectionSaga),
  ]);
}

export default rootSaga;
