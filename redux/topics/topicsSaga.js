import TopicsService from '@/services/topics';
import { call, put, takeEvery } from 'redux-saga/effects';

import { topicsActions } from './topicsSlice';

function* getLatestsOfTopicSaga({ payload: topic }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getLatestsOfTopic,
      topic
    );

    if (data) {
      yield put(topicsActions.getLatestofTopicSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(topicsActions.getLatestofTopicFailure(e));
  }
}

function* getBestsOfTopicSaga({ payload: topic }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getLatestsOfTopic,
      topic
    );

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

function* getTrendingsOfTopicsSaga({ payload: topic }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getLatestsOfTopic,
      topic
    );

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
    topicsActions.getTrendingsOfTopicsRequest.type,
    getTrendingsOfTopicsSaga
  );
}
