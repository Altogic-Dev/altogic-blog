import FollowerConnectionService from '@/services/followerConnection';
import { call, takeEvery } from 'redux-saga/effects';

import { followerConnectionActions } from './followerConnectionSlice';

function* unfollowSaga({ payload: { userId, followingUserId } }) {
  try {
    yield call(FollowerConnectionService.unfollow, userId, followingUserId);
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

function* getFollowingUsersSaga({ payload: { user } }) {
  try {
    const { data, error } = yield call(
      FollowerConnectionService.getFollowingUsers,
      user
    );
    console.log({ data, error });
    // yield put(followerConnectionActions.fetchDataSuccess());
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield takeEvery(followerConnectionActions.unfollowRequest.type, unfollowSaga);
  yield takeEvery(
    followerConnectionActions.followUserRequest.type,
    followUserSaga
  );
  yield takeEvery(
    followerConnectionActions.getFollowingUsersRequest.type,
    getFollowingUsersSaga
  );
}
