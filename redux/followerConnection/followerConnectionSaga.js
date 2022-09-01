import { call, takeEvery, put, all, fork } from 'redux-saga/effects';
import _ from 'lodash';
import FollowerConnectionService from '@/services/followerConnection';
import { followerConnectionActions } from './followerConnectionSlice';
import { updateFollowerCountSaga } from '../story/storySaga';

function* unfollowSaga({ payload: { userId, followingUserId } }) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.unfollow,
      userId,
      followingUserId
    );
    if (errors) throw errors;
    yield put(followerConnectionActions.unfollowSuccess());
    yield fork(updateFollowerCountSaga, false);
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
    yield put(followerConnectionActions.followSuccess());
    yield fork(updateFollowerCountSaga, true);
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

function* getFollowingSaga({ payload: { userId, followingUserId } }) {
  try {
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowing,
      userId,
      followingUserId
    );
    if (errors) throw errors;
    if (_.isEmpty(data)) {
      yield put(followerConnectionActions.getFollowingSuccess(null));
    } else if (_.isArray(data)) {
      yield put(followerConnectionActions.getFollowingSuccess(_.first(data)));
    }
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
    takeEvery(
      followerConnectionActions.getFollowingRequest.type,
      getFollowingSaga
    ),
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
