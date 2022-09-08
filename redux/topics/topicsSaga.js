import TopicsService from '@/services/topics';
import { call, put, takeEvery } from 'redux-saga/effects';

import { topicsActions } from './topicsSlice';

function* getLatestsOfTopicSaga({ payload: {topic,page,limit} }) {
  try {
    const { data, errors } = yield call(TopicsService.getLatestsOfTopic, topic,page,limit);

    if (data) {
      yield put(topicsActions.getLatestsOfTopicSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(topicsActions.getLatestsOfTopicFailure(e));
  }
}

function* getBestsOfTopicSaga({ payload: {topic,page,limit} }) {
  try {
    const { data, errors } = yield call(TopicsService.getBestsOfTopic, topic,page,limit);

    if (data) {
      yield put(topicsActions.getBestsOfTopicSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(topicsActions.getBestsOfTopicFailure(e));
  }
}

function* getIdListTrendingsOfTopicsSaga({ payload: {topic,page,limit,date} }) {
  try {
    const { data, errors } = yield call(TopicsService.getIdListTrendingsOfTopic, topic,page,limit,date);

    if (data) {
      yield put(topicsActions.getIdListTrendingsOfTopicSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(topicsActions.getIdListTrendingsOfTopicFailure(e));
  }
}
function* getTrendingsOfTopicsSaga({ payload: stories }) {
  try {
    const { data, errors } = yield call(TopicsService.getTrendingsOfTopic, stories);

    if (data) {
      yield put(topicsActions.getTrendingsOfTopicSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(topicsActions.getTrendingsOfTopicFailure(e));
  }
}


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
  try {
    const { data, errors } = yield call(TopicsService.getRelatedTopics, topic);

    if (errors) throw errors.items;
    if (data) yield put(topicsActions.getRelatedTopicsSuccess(data));
  } catch (e) {
    yield put(topicsActions.getRelatedTopicsFailure(e));
  }
}
function* getTopicTopWritersIdListSaga({ payload: topic }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getTopicTopWritersIdList,
      topic
    );

    if (errors) throw errors.items;
    if (data) yield put(topicsActions.getTopicTopWritersIdListSuccess(data));
  } catch (e) {
    yield put(topicsActions.getTopicTopWritersIdListFailure(e));
  }
}
function* getTopicTopWritersSaga({ payload: people }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getTopicTopWriters,
      people
    );

    if (errors) throw errors.items;
    if (data) yield put(topicsActions.getTopicTopWritersSuccess(data));
  } catch (e) {
    yield put(topicsActions.getTopicTopWritersFailure(e));
  }
}
export default function* rootSaga() {
  yield takeEvery(
    topicsActions.getLatestsOfTopicRequest.type,
    getLatestsOfTopicSaga
  );
  yield takeEvery(
    topicsActions.getBestsOfTopicRequest.type,
    getBestsOfTopicSaga
  );
  yield takeEvery(
    topicsActions.getTrendingsOfTopicRequest.type,
    getTrendingsOfTopicsSaga
  );
  yield takeEvery(
    topicsActions.getIdListTrendingsOfTopicRequest.type,
    getIdListTrendingsOfTopicsSaga
  );
  yield takeEvery(
    topicsActions.getPopularTopicsRequest.type,
    getPopularTopicsSaga
  );
  yield takeEvery(
    topicsActions.getRelatedTopicsRequest.type,
    getRelatedTopicsSaga
  );
  yield takeEvery(
    topicsActions.getTopicTopWritersRequest.type,
    getTopicTopWritersSaga
  );
  yield takeEvery(
    topicsActions.getTopicTopWritersIdListRequest.type,
    getTopicTopWritersIdListSaga
  );
}
