import { call, takeEvery, put, fork, take } from 'redux-saga/effects';
import FollowerConnectionService from '@/services/followerConnection';
import { followerConnectionActions } from './followerConnectionSlice';


function* unfollowSaga({payload: { userId, followingUserId }}) {
  try {
    yield call(FollowerConnectionService.unfollow, userId, followingUserId)
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield takeEvery(followerConnectionActions.unfollowRequest.type, unfollowSaga);
}
