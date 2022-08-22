

import _ from "lodash";
import { call, takeEvery, put } from "redux-saga/effects";
import { reportActions } from "./reportSlice";

import ReportService from "@/services/report";

function* reportStorySaga({payload: { userId, storyId, reportedUserId }}) {
  try {
    const { data, error } = yield call(ReportService.reportStory, userId, storyId, reportedUserId)
    if(!_.isNil(data) && _.isNil(error)) {
      yield put(reportActions.reportStorySuccess());
    }
  } catch (e) {
    console.error({e})
  }
}




export default function* rootSaga() {
  yield takeEvery(reportActions.reportStoryRequest.type, reportStorySaga);
}
