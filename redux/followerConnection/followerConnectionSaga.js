import { call, takeEvery } from 'redux-saga/effects';
import FollowerConnectionService from '@/services/followerConnection';
import { followerConnectionActions } from './followerConnectionSlice';

function* getFollowingStoriesSaga({ payload: userId }) {
  try {
    const { data, error } = yield call(
      FollowerConnectionService.getFollowingStories,
      userId
    );
    console.log({ data, error });
    // yield put(followerConnectionActions.fetchDataSuccess());
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

export default function* rootSaga() {
  yield takeEvery(
    followerConnectionActions.getFollowingStoriesRequest.type,
    followerConnectionActions.followUserRequest.type,
    getFollowingStoriesSaga,
    followUserSaga
  );
}
