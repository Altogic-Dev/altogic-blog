import SubscribeService from '@/services/subscribe';
import { call, put, takeEvery } from 'redux-saga/effects';
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

export default function* rootSaga() {
  yield takeEvery(
    subscribeActions.subscribeUserSagaRequest.type,
    subscribeUserSaga
  );
}
