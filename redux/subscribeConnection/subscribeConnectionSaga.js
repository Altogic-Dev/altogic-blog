import { call, takeEvery, put, all, select } from 'redux-saga/effects';
import SubscribeConnectionService from '@/services/subscribeConnection';
import { subscribeConnectionActions } from './subscribeConnectionSlice';

function* unsubscribeSaga({ payload: subscribingUserId }) {
  try {
    const session = yield select((state) => state.auth.user);
    const { errors } = yield call(
      SubscribeConnectionService.unsubscribe,
      session._id,
      subscribingUserId
    );
    if (errors) throw errors;
    yield put(subscribeConnectionActions.unSubscribeSuccess(subscribingUserId));
  } catch (e) {
    yield put(subscribeConnectionActions.unSubscribeFailure());
  }
}

function* subscribeSaga({ payload: subscribingUserId }) {
  try {
    const session = yield select((state) => state.auth.user);
    const { errors } = yield call(
      SubscribeConnectionService.subscribe,
      subscribingUserId,
      session._id,
      session.email
    );
    if (errors) throw errors;
    yield put(subscribeConnectionActions.subscribeSuccess());
  } catch (e) {
    yield put(subscribeConnectionActions.subscribeFailure());
  }
}
function* getSubscriptionsSaga({ payload: { userId, page, limit } }) {
  try {
    const { data, errors } = yield call(
      SubscribeConnectionService.getSubscriptions,
      userId,
      page,
      limit
    );

    if (errors) throw errors;
    if (data) {
      yield put(
        subscribeConnectionActions.getSubscriptionsSuccess({
          data: data.data,
          info: data.info,
          owner: userId,
        })
      );
    }
  } catch (e) {
    yield put(subscribeConnectionActions.getSubscriptionsFailure(e))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(
      subscribeConnectionActions.unSubscribeRequest.type,
      unsubscribeSaga
    ),
    takeEvery(subscribeConnectionActions.subscribeRequest.type, subscribeSaga),
    takeEvery(
      subscribeConnectionActions.getSubscriptionsRequest.type,
      getSubscriptionsSaga
    )
  ]);
}
