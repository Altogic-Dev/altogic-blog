import SubscribeService from '@/services/subscribe';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { subscribeActions } from './subscribeSlice';

function* subscribeUserSaga({ payload: { subscriberUser, subscribingUser } }) {
  try {
    const { data, errors } = yield call(
      SubscribeService.subscribeUser,
      subscriberUser,
      subscribingUser
    );
    if (data) {
      yield put(subscribeActions.subscribeUserSuccess(data));

    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(subscribeActions.subscribeUserFailure(e));
  }
}
function* getSubscriptionsSaga({ payload: { userId, page, limit } }) {
  try {
    const { data, errors } = yield call(
      SubscribeService.getSubscriptions,
      userId,
      page,
      limit
    );

    if (errors) throw errors;
    if (data) {
      yield put(
        SubscribeService.getSubscriptionsSuccess({
          data: data.data,
          info: data.info,
          owner: userId,
        })
      );
    }
  } catch (e) {
    yield put(SubscribeService.getSubscriptionsFailure(e))
  }
}
export default function* rootSaga() {
  yield all(
    takeEvery(subscribeActions.subscribeUserRequest.type,
      subscribeUserSaga),
    takeEvery(
      subscribeActions.getSubscriptionsRequest.type,
      getSubscriptionsSaga
    ))
}
