import { call, takeEvery, put, all, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import FollowerConnectionService from '@/services/followerConnection';
import { followerConnectionActions } from './followerConnectionSlice';
import { updateFollowerCountSaga } from '../story/storySaga';
import { updateUserSaga } from '../auth/authSaga';

function* unfollowSaga({ payload: { userId, followingUserId } }) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.unfollow,
      userId,
      followingUserId
    );
    if (errors) throw errors;
    yield put(followerConnectionActions.unfollowSuccess(followingUserId));
    yield fork(updateFollowerCountSaga, false);
    const user = yield select((state) => state.auth.user);
    yield fork(updateUserSaga, {
      followingCount: user.followingCount - 1,
    });
  } catch (e) {
    console.error({ e });
  }
}

function* followSaga({ payload: { followerUser, followingUser } }) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.follow,
      followerUser,
      followingUser
    );
    if (errors) throw errors;
    yield put(followerConnectionActions.followSuccess(followingUser));
    // yield fork(updateFollowerCountSaga, true);
    yield fork(updateUserSaga, {
      followingCount: followerUser.followingCount + 1,
    });
  } catch (e) {
    console.error({ e });
  }
}

function* followUserSaga({ payload: { followerUser, followingUser } }) {
  try {
    const { data, error } = yield call(
      FollowerConnectionService.followUser,
      followerUser,
      followingUser
    );
    console.log({ data, error });
    // yield put(followerConnectionActions.fetchDataSuccess());
  } catch (e) {
    console.error({ e });
  }
}

function* getFollowerUsersSaga({ payload: { userId, page } }) {
  try {
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowerUsers,
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
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowingUsers,
      userId,
      page
    );
    if (errors) throw errors;
    if (_.isArray(data)) {
      yield put(
        followerConnectionActions.getFollowingUsersSuccess({ data, page })
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

    takeEvery(followerConnectionActions.followUserRequest.type, followUserSaga),
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
