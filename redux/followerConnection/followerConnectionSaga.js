import { call, takeEvery, put, all, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import FollowerConnectionService from '@/services/followerConnection';
import { followerConnectionActions } from './followerConnectionSlice';
import {
  removeUnfollowingStories,
} from '../story/storySaga';
import { updateProfileUserSaga, updateUserSaga } from '../auth/authSaga';

function* unfollowSaga({
  payload: { userId, followingUserId, fromProfile, followingUsername },
}) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.unfollow,
      userId,
      followingUserId
    );
    if (errors) throw errors;
    const user = yield select((state) => state.auth.user);

    yield put(followerConnectionActions.unfollowSuccess({ sessionUsername: user.username, personId: followingUserId, followingUsername }));

    if (fromProfile) {
      const userProfile = yield select((state) => state.auth.profileUser);
      yield fork(updateProfileUserSaga, {
        followerCount: userProfile.followerCount - 1,
      });
    }


    yield fork(removeUnfollowingStories, followingUserId);
    yield fork(updateUserSaga, {
      followingCount: user.followingCount - 1,
    });


  } catch (e) {
    yield put(followerConnectionActions.unfollowFailure(e));
  }
}

function* followSaga({
  payload: { followerUser, followingUser, fromProfile },
}) {
  try {
    const { errors } = yield call(
      FollowerConnectionService.follow,
      followerUser,
      followingUser
    );
    if (errors) throw errors;
    yield put(followerConnectionActions.followSuccess({ followingUser, followerUser }));

    if (fromProfile) {
      const userProfile = yield select((state) => state.auth.profileUser);
      yield fork(updateProfileUserSaga, {
        followerCount: userProfile.followerCount + 1,
      });
    }


    yield fork(updateUserSaga, {
      followingCount: followerUser.followingCount + 1,
    });
  } catch (e) {

    console.log(e)
    yield put(followerConnectionActions.followFailure(e));
  }
}

function* getFollowerUsersSaga({ payload: { username, userId, page, limit } }) {
  try {
    const sessionUserId = yield select((state) =>
      _.get(state.auth.user, '_id')
    );
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowerUsers,
      sessionUserId,
      userId,
      page,
      limit
    );
    if (errors) throw errors;
    if (_.isArray(data.data)) {
      yield put(
        followerConnectionActions.getFollowerUsersSuccess({
          sessionUser: userId === sessionUserId,
          data: data.data,
          info: data.info,
          username,
          page,
        })
      );
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getFollowingUsersSaga({ payload: { username, userId, page, limit } }) {
  try {
    const sessionUserId = yield select((state) =>
      _.get(state.auth.user, '_id')
    );
    const { data, errors } = yield call(
      FollowerConnectionService.getFollowingUsers,
      sessionUserId,
      userId,
      page,
      limit
    );

    if (errors) throw errors;
    if (_.isArray(data.data)) {
      yield put(
        followerConnectionActions.getFollowingUsersSuccess({
          sessionUser: userId === sessionUserId,
          data: data.data,
          info: data.info,
          username,
          page,
        })
      );
    }
  } catch (e) {
    console.error({ e });
  }
}
function* getSubscriptionsSaga({ payload: { userId, page, limit } }) {
  try {
    const { data, errors } = yield call(
      FollowerConnectionService.getSubscriptions,
      userId,
      page,
      limit
    );

    if (errors) throw errors;
    if (data) {
      yield put(
        followerConnectionActions.getSubscriptionsSuccess({
          data: data.data,
          info: data.info,
          owner: userId,
        })
      );
    }
  } catch (e) {
    yield put(followerConnectionActions.getSubscriptionsFailure(e))
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
    takeEvery(
      followerConnectionActions.getSubscriptionsRequest.type,
      getSubscriptionsSaga
    ),
  ]);
}
