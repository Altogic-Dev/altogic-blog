import { call, takeEvery, put, all } from 'redux-saga/effects';
import _ from 'lodash';
import SubscribeConnectionService from '@/services/subscribeConnection';
import { subscribeConnectionActions } from './subscribeConnectionSlice';

function* unsubscribeSaga({ payload: { userId, subscribingUserId } }) {
  try {
    const { errors } = yield call(
      SubscribeConnectionService.unsubscribe,
      userId,
      subscribingUserId
    );
    if (errors) throw errors;
    yield put(subscribeConnectionActions.unSubscribeSuccess());
  } catch (e) {
    console.error({ e });
  }
}

function* subscribeSaga({ payload: { userId, userEmail, subscribingUserId } }) {
  try {
    const { errors } = yield call(
      SubscribeConnectionService.subscribe,
      userId,
      userEmail,
      subscribingUserId
    );
    if (errors) throw errors;
    yield put(subscribeConnectionActions.subscribeSuccess());
  } catch (e) {
    console.error({ e });
  }
}

function* getSubscribeSaga({ payload: { userId, subscribingUserId } }) {
  try {
    const { data, errors } = yield call(
      SubscribeConnectionService.getSubscribingUser,
      userId,
      subscribingUserId
    );
    if (errors) throw errors;
    if (_.isEmpty(data)) {
      yield put(subscribeConnectionActions.getSubscribeSuccess(null));
    } else if (_.isArray(data)) {
      yield put(subscribeConnectionActions.getSubscribeSuccess(_.first(data)));
    }
  } catch (e) {
    console.error({ e });
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
      subscribeConnectionActions.getSubscribeRequest.type,
      getSubscribeSaga
    ),
  ]);
}
