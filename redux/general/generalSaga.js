import _ from 'lodash';
import { call, takeEvery, put } from 'redux-saga/effects';
import GeneralService from '@/services/general';
import { generalActions } from './generalSlice';

function* getConnectInformationStorySaga({ payload: { storyId, authorId } }) {
  try {
    const { data, errors } = yield call(
      GeneralService.getConnectInformationStory,
      storyId,
      authorId
    );
    if (errors) throw errors;
    if (!_.isNil(data)) {
      yield put(generalActions.getConnectInformationStorySuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}

export default function* rootSaga() {
  yield takeEvery(
    generalActions.getConnectInformationStoryRequest.type,
    getConnectInformationStorySaga
  );
}
