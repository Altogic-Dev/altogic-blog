import _ from 'lodash';
import { call, takeEvery, put } from 'redux-saga/effects';
import ReportService from '@/services/report';
import { reportActions } from './reportSlice';

function* reportStorySaga({ payload: { userId, storyId, reportedUserId } }) {
  try {
    const { data, errors } = yield call(
      ReportService.reportStory,
      userId,
      storyId,
      reportedUserId
    );
    if (errors) throw errors;
    if (!_.isNil(data) && _.isNil(errors)) {
      yield put(reportActions.reportStorySuccess());
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getReportedStoryByUserSaga({ payload: { userId, storyId } }) {
  try {
    const { data, errors } = yield call(
      ReportService.getReportedStoryByUser,
      userId,
      storyId
    );
    if (errors) throw errors;
    if (!_.isNil(data)) {
      const isReported = !_.isEmpty(data);
      yield put(reportActions.getReportedStoryByUserSuccess(isReported));
    }
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield takeEvery(reportActions.reportStoryRequest.type, reportStorySaga);
  yield takeEvery(
    reportActions.getReportedStoryByUserRequest.type,
    getReportedStoryByUserSaga
  );
}
