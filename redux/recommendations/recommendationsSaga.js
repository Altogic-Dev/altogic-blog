import { call, takeEvery, put, select } from 'redux-saga/effects';
import RecommendationsService from '@/services/recommendations';
import { recommendationsActions } from './recommendationsSlice';

function* getWhoToFollowMinimizedSaga() {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      RecommendationsService.getWhoToFollowMinimized,
      user._id
    );
    if (errors) throw errors.items;
    if (data)
      yield put(recommendationsActions.getWhoToFollowMinimizedSuccess(data));
  } catch (e) {
    yield put(recommendationsActions.getWhoToFollowMinimizedFailure(e));
    console.error({ e });
  }
}

function* getWhoToFollowSaga({ payload: { page, limit } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const { data, errors } = yield call(
      RecommendationsService.getWhoToFollow,
      page,
      limit,
      user._id
    );
    if (errors) throw errors.items;
    if (data) yield put(recommendationsActions.getWhoToFollowSuccess(data));
  } catch (e) {
    console.error({ e });
    yield put(recommendationsActions.getWhoToFollowFailure(e));
  }
}
function* getTopWritersSaga({ payload: { page, limit } }) {
  try {
    const { data, errors } = yield call(
      RecommendationsService.getTopWriters,
      page,
      limit,
    );
    if (errors) throw errors.items;
    if (data) yield put(recommendationsActions.getTopWritersSuccess(data));
  } catch (e) {
    console.error({ e });
    yield put(recommendationsActions.getTopWritersFailure(e));
  }
}

export default function* rootSaga() {
  yield takeEvery(
    recommendationsActions.getWhoToFollowRequest.type,
    getWhoToFollowSaga
  );

  yield takeEvery(
    recommendationsActions.getWhoToFollowMinimizedRequest.type,
    getWhoToFollowMinimizedSaga
  );
  yield takeEvery(
    recommendationsActions.getTopWritersRequest.type,
    getTopWritersSaga
  );
}
