import { call, takeEvery, put, select } from 'redux-saga/effects';
import RecommendationsService from '@/services/recommendations';
import { recommendationsActions } from './recommendationsSlice';

function* getWhoToFollowSaga({ payload: { page, limit } }) {
  console.log(limit)
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
    yield put(recommendationsActions.getWhoToFollowFailure(e));
  }
}
function* getTopWritersSaga() {
  try {
    const { data, errors } = yield call(RecommendationsService.getTopWriters);
    if (errors) throw errors.items;
    if (data) yield put(recommendationsActions.getTopWritersSuccess(data));
  } catch (e) {
    yield put(recommendationsActions.getTopWritersFailure(e));
  }
}

function* getTopicTopWritersSaga({ payload: { tag } }) {
  try {
    const { data, errors } = yield call(
      RecommendationsService.getTopicTopWriters,
      tag
    );
    if (errors) throw errors.items;
    if (data) yield put(recommendationsActions.getTopicTopWritersSuccess(data));
  } catch (e) {
    yield put(recommendationsActions.getTopicTopWritersFailure(e));
  }
}
export default function* rootSaga() {
  yield takeEvery(
    recommendationsActions.getWhoToFollowRequest.type,
    getWhoToFollowSaga
  );

  yield takeEvery(
    recommendationsActions.getTopWritersRequest.type,
    getTopWritersSaga
  );
  yield takeEvery(
    recommendationsActions.getTopicTopWritersRequest.type,
    getTopicTopWritersSaga
  );
}
