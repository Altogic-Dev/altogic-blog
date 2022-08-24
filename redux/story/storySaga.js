import _ from 'lodash';
import { call, takeEvery, put, all, select } from 'redux-saga/effects';
import StoryService from '@/services/story';
import { storyActions } from './storySlice';

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

function* getStorySaga({ payload: id }) {
  try {
    const { data, error } = yield call(StoryService.getStory, id);
    if (!_.isNil(data) && _.isNil(error)) {
      yield put(storyActions.getStorySuccess(_.first(data)));
    }
  } catch (e) {
    console.error({ e });
  }
}

export function* updateFollowerCountSaga(isIncrease) {
  const story = yield select((state) => state.story.story);
  if (isIncrease) {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        user: {
          ...story.user,
          followerCount: story.user.followerCount + 1,
        },
      })
    );
  } else {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        user: {
          ...story.user,
          followerCount: story.user.followerCount - 1,
        },
      })
    );
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
    yield takeEvery(storyActions.getStoryRequest.type, getStorySaga),
  ]);
}
