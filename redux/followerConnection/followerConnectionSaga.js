import { call, takeEvery, put, all, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import FollowerConnectionService from '@/services/followerConnection';
import { followerConnectionActions } from './followerConnectionSlice';
import {
  removeUnfollowingStories,
  updateFollowerCountSaga,
} from '../story/storySaga';
import { updateProfileUserSaga, updateUserSaga } from '../auth/authSaga';

function* unfollowSaga({ payload: { userId, followingUserId, notUpdate } }) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.unfollow,
      userId,
      followingUserId
    );
    if (errors) throw errors;
    yield put(followerConnectionActions.unfollowSuccess(followingUserId));
    if (!notUpdate) {
      yield fork(updateFollowerCountSaga, false);
    }
    yield fork(removeUnfollowingStories, followingUserId);
    const user = yield select((state) => state.auth.user);
    yield fork(updateUserSaga, {
      followingCount: user.followingCount - 1,
    });
    const userProfile = yield select((state) => state.auth.profileUser);
    yield fork(updateProfileUserSaga, {
      followerCount: userProfile.followerCount - 1,
    });
  } catch (e) {
    yield put(followerConnectionActions.unfollowFailure(e));
  }
}

function* followSaga({ payload: { followerUser, followingUser, notUpdate } }) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.follow,
      followerUser,
      followingUser
    );
    if (errors) throw errors;
    yield put(followerConnectionActions.followSuccess(followingUser));
    if (!notUpdate) {
      yield fork(updateFollowerCountSaga, true);
    }
    yield fork(updateUserSaga, {
      followingCount: followerUser.followingCount + 1,
    });
    const userProfile = yield select((state) => state.auth.profileUser);
    yield fork(updateProfileUserSaga, {
      followerCount: userProfile.followerCount + 1,
    });
  } catch (e) {
    yield put(followerConnectionActions.followFailure(e));
  }
}

function* getFollowerUsersSaga({ payload: { userId, page } }) {
  try {
    const sessionUserId = yield select((state) =>
      _.get(state.auth.user, '_id')
    );
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowerUsers,
      sessionUserId,
      userId,
      page
    );
    if (errors) throw errors;
    if (_.isArray(data)) {
      yield put(
        followerConnectionActions.getFollowerUsersSuccess({ data, page })
      );
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getFollowingUsersSaga({ payload: { userId, page } }) {
  try {
    const sessionUserId = yield select((state) =>
      _.get(state.auth.user, '_id')
    );
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowingUsers,
      sessionUserId,
      userId,
      page
    );

    if (errors) throw errors;
    if (_.isArray(data.data)) {
      yield put(
        followerConnectionActions.getFollowingUsersSuccess({
          data: data.data,
          info: data.info,
          page,
        })
      );
    }
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(followerConnectionActions.unfollowRequest.type, unfollowSaga),
    takeEvery(followerConnectionActions.followRequest.type, followSaga),
    takeEvery(
      followerConnectionActions.getFollowerUsersRequest.type,
      getFollowerUsersSaga
    ),
    takeEvery(
      followerConnectionActions.getFollowingUsersRequest.type,
      getFollowingUsersSaga
    ),
  ]);
}
