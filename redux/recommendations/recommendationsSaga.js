import { call, takeEvery, put, fork, take } from 'redux-saga/effects';
import RecommendationsService from '@/services/recommendations';
import { recommendationsActions } from './recommendationsSlice';

function* getWhoToFollowMinimizedSaga() {
  try {
    const { data, error } = yield call(
      RecommendationsService.getWhoToFollowMinimized
    );
    console.log({ data, error });
    // yield put(followerConnectionActions.fetchDataSuccess());
  } catch (e) {
    console.error({ e });
  }
}

function* getWhoToFollowSaga() {
  try {
    const { data, error } = yield call(RecommendationsService.getWhoToFollow);
    console.log({ data, error });
    // yield put(followerConnectionActions.fetchDataSuccess());
  } catch (e) {
    console.error({ e });
  }
}
export default function* rootSaga() {
  yield takeEvery(
    recommendationsActions.getWhoToFollowRequest.type,
    getWhoToFollowSaga,
    getWhoToFollowMinimizedSaga
  );
}
