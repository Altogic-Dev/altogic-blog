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
function* getStoryReplies({ payload: {story,page,limit} }) {
  try {
    const { data, errors } = yield call(StoryService.getStoryReplies, story,page,limit);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.getStoryRepliesSuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(storyActions.getStoryRepliesFailure(e));
  }
}

function* createReply({ payload: reply }) {
  try {
    const { data, errors } = yield call(StoryService.createReply, reply);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.createReplySuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(storyActions.createReplyFailure(e));
  }
}

function* getReplyComments({ payload: reply }) {
  try {
    const { data, errors } = yield call(StoryService.getReplyComments, reply);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.getReplyCommentsSuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(storyActions.getReplyCommentsFailure(e));
  }
}

function* createReplyComment({ payload: comment }) {
  try {
    const { data, errors } = yield call(
      StoryService.createReplyComment,
      comment
    );
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.createReplyCommentSuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(storyActions.createReplyCommentFailure(e));
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

function* createStorySaga({ payload }) {
  try {
    const { data, errors } = yield call(StoryService.createStory, payload);
    if (!_.isNil(data)) {
      yield put(storyActions.createStorySuccess(data));
    }
    if (_.isNil(errors)) {
      throw errors.items;
    }
  } catch (e) {
    yield put(storyActions.createStoryFailure(e));
  }
}
function* updateStorySaga({ payload }) {
  try {
    const { data, errors } = yield call(StoryService.updateStory, payload);
    if (!_.isNil(data)) {
      yield put(storyActions.updateStorySuccess(data));
    }
    if (_.isNil(errors)) {
      throw errors.items;
    }
  } catch (e) {
    yield put(storyActions.updateStoryFailure(e));
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
    yield takeEvery(storyActions.getStoryRepliesRequest.type, getStoryReplies),
    yield takeEvery(storyActions.createReplyRequest.type, createReply),
    yield takeEvery(
      storyActions.createReplyCommentRequest.type,
      createReplyComment
    ),
    yield takeEvery(
      storyActions.getReplyCommentsRequest.type,
      getReplyComments
    ),
    yield takeEvery(
      storyActions.createStoryRequest.type,
      createStorySaga
    ),
    yield takeEvery(
      storyActions.updateStoryRequest.type,
      updateStorySaga
    ),
  ]);
}
