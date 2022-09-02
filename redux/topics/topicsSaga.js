import TopicsService from '@/services/topics';
import { call, put, takeEvery } from 'redux-saga/effects';

import { topicsActions } from './topicsSlice';

// function* getLatestsOfTopicSaga({ payload: topic }) {
//   try {
//     const { data, errors } = yield call(TopicsService.getLatestsOfTopic, topic);

//     if (data) {
//       yield put(topicsActions.getLatestofTopicSuccess(data));
//     }
//     if (errors) {
//       throw errors.items;
//     }
//   } catch (e) {
//     yield put(topicsActions.getLatestofTopicFailure(e));
//   }
// }

// function* getBestsOfTopicSaga({ payload: topic }) {
//   try {
//     const { data, errors } = yield call(TopicsService.getLatestsOfTopic, topic);

//     if (data) {
//       yield put(topicsActions.getLatestsOfTopicSuccess(data));
//     }
//     if (errors) {
//       throw errors.items;
//     }
//   } catch (e) {
//     yield put(topicsActions.getLatestsOfTopicFailure(e));
//   }
// }

// function* getTrendingsOfTopicsSaga({ payload: topic }) {
//   try {
//     const { data, errors } = yield call(TopicsService.getLatestsOfTopic, topic);

//     if (data) {
//       yield put(topicsActions.getLatestsOfTopicSuccess(data));
//     }
//     if (errors) {
//       throw errors.items;
//     }
//   } catch (e) {
//     yield put(topicsActions.getLatestsOfTopicFailure(e));
//   }
// }

function* getPopularTopicsSaga() {
  try {
    const { data, errors } = yield call(TopicsService.getPopularTopics);
    if (errors) throw errors.items;
    if (data) yield put(topicsActions.getPopularTopicsSuccess(data));
  } catch (e) {
    yield put(topicsActions.getPopularTopicsFailure(e));
  }
}
function* getRelatedTopicsSaga({ payload: topic }) {
  console.log(topic)
  try {
    const { data, errors } = yield call(TopicsService.getRelatedTopics,topic);

    if (errors) throw errors.items;
    if (data) yield put(topicsActions.getRelatedTopicsSuccess(data));
  } catch (e) {
    yield put(topicsActions.getRelatedTopicsFailure(e));
  }
}
// function* getTopicTopWritersSaga() {
//   try {
//     const { data, errors } = yield call(TopicsService.getTopicTopWriters);

//     if (errors) throw errors.items;
//     if (data) yield put(topicsActions.getTopicTopWritersSuccess(data));
//   } catch (e) {
//     yield put(topicsActions.getTopicTopWritersFailure(e));
//   }
// }

export default function* rootSaga() {
  // yield takeEvery(
  //   topicsActions.getLatestsOfTopicRequest.type,
  //   getLatestsOfTopicSaga
  // );
  // yield takeEvery(
  //   topicsActions.getBestsOfTopicRequest.type,
  //   getBestsOfTopicSaga
  // );
  // yield takeEvery(
  //   topicsActions.getTrendingsOfTopicsRequest.type,
  //   getTrendingsOfTopicsSaga
  // );
  yield takeEvery(
    topicsActions.getPopularTopicsRequest.type,
    getPopularTopicsSaga
  );
  yield takeEvery(
    topicsActions.getRelatedTopicsRequest.type,
    getRelatedTopicsSaga
  );
  // yield takeEvery(
  //   topicsActions.getTopicTopWritersRequest.type,
  //   getTopicTopWritersSaga
  // );
}
