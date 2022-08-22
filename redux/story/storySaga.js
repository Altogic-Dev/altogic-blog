import _ from 'lodash';
import { call, takeEvery, put, all, select } from 'redux-saga/effects';
import { storyActions } from './storySlice';

import StoryService from '@/services/story';

function* getFollowingStoriesSaga({ payload: { userId, page } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, error } = yield call(
      StoryService.getFollowingStories,
      userId,
      _.get(user, 'mutedUser'),
      page
    );
    if (!_.isNil(data) && _.isNil(error)) {
      yield put(
        storyActions.getFollowingStoriesSuccess({
          data: data.data,
          info: data.info,
        })
      );
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getRecommendedStoriesSaga({ payload: { page } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, error } = yield call(
      StoryService.getRecommendedStories,
      _.get(user, 'mutedUser'),
      page
    );
    if (!_.isNil(data) && _.isNil(error)) {
      yield put(
        storyActions.getRecommendedStoriesSuccess({
          data: data.data,
          info: data.info,
        })
      );
    }
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      storyActions.getFollowingStoriesRequest.type,
      getFollowingStoriesSaga
    ),
    yield takeEvery(
      storyActions.getRecommendedStoriesRequest.type,
      getRecommendedStoriesSaga
    ),
  ]);
}
