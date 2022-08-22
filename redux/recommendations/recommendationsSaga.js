import { call, takeEvery, put } from 'redux-saga/effects';
import RecommendationsService from '@/services/recommendations';
import { recommendationsActions } from './recommendationsSlice';

function* getWhoToFollowMinimizedSaga() {
  try {
    const { data, error } = yield call(
      RecommendationsService.getWhoToFollowMinimized
    );
    console.log({ data, error });
    if (data) yield put(recommendationsActions.fetchDataSuccess());
    else if (error) yield put(recommendationsActions.fetchDataFailure(error));
  } catch (e) {
    console.error({ e });
  }
}

function* getWhoToFollowSaga() {
  try {
    const { data, error } = yield call(RecommendationsService.getWhoToFollow);

    if (data) yield put(recommendationsActions.getWhoToFollowSuccess(data));
    else if (error)
      yield put(recommendationsActions.getWhoToFollowFailure(error));
  } catch (e) {
    console.error({ e });
  }
}
function* getPopularTopicsSaga() {
  try {
    const { data, error } = yield call(RecommendationsService.getPopularTopics);

    console.log(data)
    debugger
    if (data) yield put(recommendationsActions.fetchDataSuccess(data));
    else if (error) yield put(recommendationsActions.fetchDataFailure(error));
  } catch (e) {
    console.error({ e });
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
  yield takeEvery(
    recommendationsActions.getPopularTopicsRequest.type,
    getPopularTopicsSaga
  );
}
