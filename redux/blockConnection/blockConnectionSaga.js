import BlockConnectionService from '@/services/blockConnection';
import _ from 'lodash';
import { call, takeEvery, put, all, select, fork } from 'redux-saga/effects';
import { removeRecommendedStories } from '../story/storySaga';
import { blockConnectionActions } from './blockConnectionSlice';

function* getBlockedUsersSaga({ payload: { page, limit } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      BlockConnectionService.getBlockedUsers,
      user._id,
      page,
      limit
    );
    if (errors) throw errors.items;
    if (!_.isNil(data)) {
      yield put(
        blockConnectionActions.getBlockedUsersSuccess({
          data: _.map(data.data, 'blockedUser'),
          info: data.info,
        })
      );
    }
  } catch (e) {
    yield put(blockConnectionActions.getBlockedUsersFailure(e));
  }
}

function* blockUserSaga({ payload: { blockedUserId, blockedUserProfilePicture, blockedUsername } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      BlockConnectionService.blockUser,
      user._id,
      blockedUserId
    );
    if (errors) throw errors.items;
    if (data) {
      yield put(blockConnectionActions.blockUserSuccess({ blockedUserId, blockedUserProfilePicture, blockedUsername }));
      yield fork(removeRecommendedStories, blockedUserId);
    }
  } catch (e) {
    yield put(blockConnectionActions.blockUserFailure(e));
  }
}

function* unblockAuthorSaga({ payload: blockedUserId }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      BlockConnectionService.unblockAuthor,
      user._id,
      blockedUserId
    );
    if (errors) throw errors.items;
    if (data) {
      yield put(blockConnectionActions.unblockAuthorSuccess(blockedUserId));
    }
  } catch (e) {
    yield put(blockConnectionActions.unblockAuthorFailure(e));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(
      blockConnectionActions.getBlockedUsersRequest.type,
      getBlockedUsersSaga
    ),
    takeEvery(blockConnectionActions.blockUserRequest.type, blockUserSaga),
    takeEvery(
      blockConnectionActions.unblockAuthorRequest.type,
      unblockAuthorSaga
    ),
  ]);
}
