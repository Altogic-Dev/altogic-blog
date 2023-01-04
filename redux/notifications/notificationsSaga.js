import { call, put, takeEvery } from 'redux-saga/effects';
import NotificationService from '@/services/notification';
import _ from 'lodash';
import { notificationsActions } from './notificationsSlice';

function* getNotificationsSaga({ payload: userId }) {
  try {
    const { data, errors } = yield call(
      NotificationService.getNotifications,
      userId
    );
    const { data: count, errors: countErrors } = yield call(
      NotificationService.getUnreadNotificationsCount,
      userId
    );
    if (data && count) {
      yield put(notificationsActions.getNotificationsSuccess(data));
      yield put(notificationsActions.setUnreadNotificationsCount(count[0]));
    }
    if (errors || countErrors) {
      throw errors.items || countErrors.items;
    }
  } catch (e) {
    yield put(notificationsActions.getNotificationsFailure(e));
  }
}
export function* createNotificationSaga({ payload: notification }) {
  try {
    const { data, errors } = yield call(
      NotificationService.createNotification,
      notification
    );

    if (data) {
      yield put(notificationsActions.createNotificationSuccess(data));
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(notificationsActions.createNotificationFailure(e));
  }
}
function* getRealtimeNotificationsSaga({ payload: notification }) {
  try {
    yield put(
      notificationsActions.getRealtimeNotificationsSuccess(notification)
    );
  } catch (e) {
    yield put(notificationsActions.getRealtimeNotificationsFailure(e));
  }
}
function* getNotificationPreview({ payload }) {
  try {
    const { data, errors } = yield call(
      NotificationService.getNotifications,
      payload
    );
    const { data: count, errors: countErrors } = yield call(
      NotificationService.getUnreadNotificationsCount,
      payload
    );
    if (_.size(data) && count) {
      yield put(notificationsActions.getNotificationPreviewSuccess(data));
      yield put(notificationsActions.setUnreadNotificationsCount(count[0]));
    }
    if (errors || countErrors) {
      throw errors.items || countErrors.items;
    }
  } catch (e) {
    yield put(notificationsActions.getNotificationPreviewFailure(e));
  }
}
function* markAsSeen({ payload }) {
  try {
    const { data, errors } = yield call(
      NotificationService.markAsSeen,
      payload
    );
    if (data) {
      yield put(notificationsActions.markAsSeenSuccess());
    }
    if (errors) {
      throw errors.items;
    }
  } catch (e) {
    yield put(notificationsActions.markAsSeenFailure(e));
  }
}
export default function* notificationsSaga() {
  yield takeEvery(
    notificationsActions.getNotificationsRequest.type,
    getNotificationsSaga
  );
  yield takeEvery(
    notificationsActions.createNotificationRequest.type,
    createNotificationSaga
  );
  yield takeEvery(
    notificationsActions.getRealtimeNotificationsRequest.type,
    getRealtimeNotificationsSaga
  );
  yield takeEvery(
    notificationsActions.getNotificationPreviewRequest.type,
    getNotificationPreview
  );
  yield takeEvery(notificationsActions.markAsSeenRequest.type, markAsSeen);
}
