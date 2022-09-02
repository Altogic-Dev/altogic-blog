import _ from 'lodash';
import { call, takeEvery, put, all, select } from 'redux-saga/effects';
import StoryService from '@/services/story';
import { storyActions } from './storySlice';

function* getFollowingStoriesSaga({ payload: { userId, page } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      StoryService.getFollowingStories,
      userId,
      _.get(user, 'mutedUser'),
      page
    );
    if (!_.isNil(data) && _.isNil(errors)) {
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
    const { data, errors } = yield call(
      StoryService.getRecommendedStories,
      _.get(user, 'mutedUser'),
      page
    );
    if (!_.isNil(data) && _.isNil(errors)) {
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
    const { data, errors } = yield call(StoryService.getStory, id);
    if (!_.isNil(data) && _.isNil(errors)) {
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

function* getStoryBySlugSaga({ payload: slug }) {
  try {
    const { data, errors } = yield call(StoryService.getStoryBySlug, slug);
    if (!_.isNil(data) && _.isNil(errors)) {
      yield put(storyActions.getStoryBySlugSuccess(_.first(data)));
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getMoreUserStoriesSaga({ payload: { authorId, storyId, page } }) {
  try {
    const { data, errors } = yield call(
      StoryService.getMoreUserStories,
      authorId,
      storyId,
      page
    );
    if (!_.isNil(data) && _.isNil(errors)) {
      yield put(storyActions.getMoreUserStoriesSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}

export function* updateStoryLikeCountSaga(isIncrease) {
  const story = yield select((state) => state.story.story);
  if (isIncrease) {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        likeCount: story.likeCount + 1,
      })
    );
  } else {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        likeCount: story.likeCount - 1,
      })
    );
  }
}

function* getUserStoriesSaga({ payload: { userId, page, limit } }) {
  try {
    const { data, errors } = yield call(
      StoryService.getUserStories,
      userId,
      page,
      limit
    );
    if (errors) throw errors;
    if (_.isArray(data)) {
      yield put(storyActions.getUserStoriesSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}

function* deleteStorySaga({ payload: storyId }) {
  try {
    const { errors } = yield call(StoryService.deleteStory, storyId);
    if (errors) throw errors;
    yield put(storyActions.deleteStorySuccess(storyId));
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
    yield takeEvery(storyActions.getStoryRequest.type, getStorySaga),
    yield takeEvery(
      storyActions.getStoryBySlugRequest.type,
      getStoryBySlugSaga
    ),
    yield takeEvery(
      storyActions.getMoreUserStoriesRequest.type,
      getMoreUserStoriesSaga
    ),
    yield takeEvery(
      storyActions.getUserStoriesRequest.type,
      getUserStoriesSaga
    ),
    yield takeEvery(storyActions.deleteStoryRequest.type, deleteStorySaga),
  ]);
}
