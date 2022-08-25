import { call, takeEvery, put } from 'redux-saga/effects';
import RecommendationsService from '@/services/recommendations';
import { recommendationsActions } from './recommendationsSlice';

function* getWhoToFollowMinimizedSaga() {
  try {
    const { data, errors } = yield call(
      RecommendationsService.getWhoToFollowMinimized
    );
    if (errors) throw errors.items;
    // if (data) yield put(recommendationsActions.fetchDataSuccess());
  } catch (e) {
    // yield put(recommendationsActions.fetchDataFailure(e));
    console.error({ e });
  }
}

function* getWhoToFollowSaga() {
  try {
    const { data, errors } = yield call(RecommendationsService.getWhoToFollow);

    if (errors) throw errors.items;
    if (data) yield put(recommendationsActions.getWhoToFollowSuccess(data));
  } catch (e) {
    console.error({ e });
    yield put(recommendationsActions.getWhoToFollowFailure(e));
  }
}

export default function* rootSaga() {
  yield takeEvery(
    recommendationsActions.getWhoToFollowMinimizedRequest.type,
    getWhoToFollowSaga
  );
  yield takeEvery(
    recommendationsActions.getWhoToFollowRequest.type,
    getWhoToFollowSaga
  );
  yield takeEvery(
    recommendationsActions.getWhoToFollowMinimizedRequest.type,
    getWhoToFollowMinimizedSaga
  );
 
}
