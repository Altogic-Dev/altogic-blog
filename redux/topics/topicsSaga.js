import TopicsService from '@/services/topics';
import _ from 'lodash';
import { call, fork, put, takeEvery, select, delay } from 'redux-saga/effects';

import { topicsActions } from './topicsSlice';

function* getLatestsOfTopicSaga({ payload: { topic } }) {
  try {
    const { data, errors } = yield call(TopicsService.getLatestsOfTopic, topic);

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

function* getBestsOfTopicSaga({ payload: { topic } }) {
  try {
    const { data, errors } = yield call(TopicsService.getBestsOfTopic, topic);

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
function* getTrendingTopicsSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getTrendingTopicsSaga,
      payload
    );

    if (data) {
      yield put(topicsActions.getTrendingTopicsSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(topicsActions.getTrendingTopicsFailure(e));
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

function* insertTopicWritersSaga(story) {
  const user = yield select((state) => state.auth.user);
  const topicWriters = _.map(story.categoryNames, (topic) => ({
    topic,
    username: user.username,
    profilePicture: user.profilePicture,
    user: user._id,
    publication: story.publication,
    story: story._id,
  }));
  yield call(TopicsService.insertTopicWriters, topicWriters);
}
export function* insertTopicsSaga(story) {
  try {
    const req = story.categoryNames.map((topic) => ({
      name: topic,
    }));
    yield call(TopicsService.insertTopics, req);
    yield fork(insertTopicWritersSaga, story);
  } catch (e) {
    console.error(e);
  }
}

export function* deleteTopicWritersSaga(storyId) {
  try {
    yield call(TopicsService.deleteTopicWriters, storyId);
  } catch (e) {
    console.error(e);
  }
}

export function* insertTopicsWriterCountSaga(story) {
  try {
    const updatedTopicWriterCounts = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const topic of story.categoryNames) {
      const { data } = yield call(TopicsService.isTopicWriterExist, topic);
      if (data && !data.isExist) {
        updatedTopicWriterCounts.push(topic);
      }
      yield delay(100);
    }
    yield call(TopicsService.increaseWriterCounts, updatedTopicWriterCounts);
  } catch (e) {
    console.error(e);
  }
}
export function* getTopicAnalyticsSaga({ payload: topicName }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getTopicAnalytics,
      topicName
    );
    if (errors) throw errors;
    else if (data) {
      yield put(
        topicsActions.getTopicAnalyticsSuccess({
          storyCount: data.counts.storyCount,
          authorCount: data.counts.writerCount,
          profilePictures: _.map(
            data.profilePictures,
            'groupby.profilePicture'
          ),
        })
      );
    }
  } catch (e) {
    console.error(e);
  }
}
function* publicationsTopicsSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getPublicationsTopics,
      payload
    );
    if (errors) throw errors;
    else if (data) yield put(topicsActions.getPublicationsTopicsSuccess(data));
  } catch (e) {
    yield put(topicsActions.getPublicationsTopicsFailure(e));
  }
}

function* getPublicationsStoriesByTopicSaga({
  payload: { publicationId, topicName },
}) {
  try {
    const { data, errors } = yield call(
      TopicsService.getPublicationsStoriesByTopic,
      publicationId,
      topicName
    );
    if (errors) throw errors;
    else if (data) {
      yield put(topicsActions.getPublicationsStoriesByTopicSuccess(data));
    }
  } catch (e) {
    console.error(e);
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
    topicsActions.getTrendingTopicsRequest.type,
    getTrendingTopicsSaga
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
    topicsActions.getTopicAnalyticsRequest.type,
    getTopicAnalyticsSaga
  );
  yield takeEvery(
    topicsActions.getPublicationsTopicsRequest.type,
    publicationsTopicsSaga
  );
  yield takeEvery(
    topicsActions.getPublicationsStoriesByTopicRequest.type,
    getPublicationsStoriesByTopicSaga
  );
}
