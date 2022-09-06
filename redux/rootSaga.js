import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import followerConnectionSaga from './followerConnection/followerConnectionSaga';
import storySaga from './story/storySaga';
import reportSaga from './report/reportSaga';
import recommendationsSaga from './recommendations/recommendationsSaga';
import subscribeConnectionSaga from './subscribeConnection/subscribeConnectionSaga';
import storyLikesSaga from './storyLikes/storyLikesSaga';
import subscribeSaga from './subscribe/subscribeSaga';
import publicationSaga from './publication/publicationSaga';
import topicsSaga from './topics/topicsSaga';
import generalSaga from './general/generalSaga';
import fileSaga from './file/fileSaga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(storySaga),
    fork(followerConnectionSaga),
    fork(reportSaga),
    fork(recommendationsSaga),
    fork(subscribeConnectionSaga),
    fork(storyLikesSaga),
    fork(subscribeSaga),
    fork(publicationSaga),
    fork(fileSaga),
    fork(topicsSaga),
    fork(generalSaga),
  ]);
}

export default rootSaga;
