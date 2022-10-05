import TopicsService from '@/services/topics';
import _ from 'lodash';
import { call, fork, put, takeEvery, select, delay } from 'redux-saga/effects';

import { topicsActions } from './topicsSlice';

function* getLatestsOfTopicSaga({ payload: { topic, page, limit } }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getLatestsOfTopic,
      topic,
      page,
      limit
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

function* getBestsOfTopicSaga({ payload: { topic, page, limit } }) {
  try {
    const { data, errors } = yield call(
      TopicsService.getBestsOfTopic,
      topic,
      page,
      limit
    );

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

function* getIdListTrendingsOfTopicsSaga({
  payload: { topic, page, limit, date },
}) {
  try {
    const { data, errors } = yield call(
      TopicsService.getIdListTrendingsOfTopic,
      topic,
      page,
      limit,
      date
    );

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
    const { data, errors } = yield call(
      TopicsService.getTrendingsOfTopic,
      stories
    );

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
function* insertTopicWritersSaga(story) {
  const user = yield select((state) => state.auth.user);
  const topicWriters = _.map(story.categoryNames, (topic) => ({
    topic,
    username: user.username,
    profilePicture: user.profilePicture,
    user: user._id,
    story: story._id,
  }));
  yield call(TopicsService.insertTopicWriters, topicWriters);
}
export function* insertTopicsSaga(story) {
  try {
    const insertedTopics = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const topic of story.categoryNames) {
      const { data } = yield call(TopicsService.isTopicExist, topic);
      if (data && !data.isExist) {
        insertedTopics.push({ name: topic });
      }
      yield delay(100);
    }
    if (!_.isEmpty(insertedTopics)) {
      yield call(TopicsService.insertTopics, insertedTopics);
    }
    yield fork(insertTopicWritersSaga, story);
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
