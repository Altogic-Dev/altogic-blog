import _ from 'lodash';
import { call, takeEvery, put, all, fork } from 'redux-saga/effects';
import StoryLikesService from '@/services/storyLikes';
import { storyLikesActions } from './storyLikesSlice';
import { updateStoryLikeCountSaga } from '../story/storySaga';

function* likeStorySaga({ payload: { userId, storyId, categoryNames } }) {
  try {
    const { errors } = yield call(
      StoryLikesService.like,
      userId,
      storyId,
      categoryNames
    );
    if (errors) throw errors;
    yield put(storyLikesActions.likeStorySuccess());
    yield fork(updateStoryLikeCountSaga, true);
  } catch (e) {
    console.error({ e });
  }
}

function* unlikeStorySaga({ payload: { userId, storyId } }) {
  try {
    const { errors } = yield call(StoryLikesService.unlike, userId, storyId);
    if (errors) throw errors;
    yield put(storyLikesActions.unlikeStorySuccess());
    yield fork(updateStoryLikeCountSaga, false);
  } catch (e) {
    console.error({ e });
  }
}

function* isLikedSaga({ payload: { userId, storyId } }) {
  try {
    const { data, errors } = yield call(
      StoryLikesService.isLiked,
      userId,
      storyId
    );
    if (errors) throw errors;
    if (!_.isNil(data) && !_.isEmpty(data)) {
      yield put(storyLikesActions.isLikedStorySuccess(true));
    } else {
      yield put(storyLikesActions.isLikedStorySuccess(false));
    }
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(storyLikesActions.likeStoryRequest.type, likeStorySaga),
    takeEvery(storyLikesActions.unlikeStoryRequest.type, unlikeStorySaga),
    takeEvery(storyLikesActions.isLikedStoryRequest.type, isLikedSaga),
  ]);
}
