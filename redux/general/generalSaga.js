import { call, takeEvery, put } from 'redux-saga/effects';
import GeneralService from '@/services/general';
import { generalActions } from './generalSlice';
import { followerConnectionActions } from '../followerConnection/followerConnectionSlice';
import { storyLikesActions } from '../storyLikes/storyLikesSlice';
import { reportActions } from '../report/reportSlice';
import { subscribeConnectionActions } from '../subscribeConnection/subscribeConnectionSlice';

function* getConnectInformationStorySaga({ payload: { storyId, authorId } }) {
  try {
    const { data, errors } = yield call(
      GeneralService.getConnectInformationStory,
      storyId,
      authorId
    );
    if (errors) throw errors;
    if (data) {
      yield put(followerConnectionActions.setIsFollowing(data.isFollowing));
      yield put(storyLikesActions.isLikedStorySuccess(data.isStoryLiked));
      yield put(
        reportActions.getReportedStoryByUserSuccess(data.isStoryReported)
      );
      yield put(subscribeConnectionActions.setIsSubscribed(data.isSubscribed));
    }
  } catch (e) {
    console.error({ e });
  }
}
function* searchSaga({ payload: { query, limit } }) {
  try {
    const { data, errors } = yield call(GeneralService.search, {
      query,
      limit,
    });
    if (errors) throw errors;
    if (data) {
      yield put(generalActions.searchSuccess(data));
    }
  } catch (e) {
    yield put(generalActions.searchFailure(e));
  }
}
function* searchPreviewSaga({ payload: { query } }) {
  console.log('searchPreviewSaga');
  try {
    const { data, errors } = yield call(GeneralService.search, {
      query,
      limit: 3,
    });
    if (errors) throw errors;
    if (data) {
      yield put(generalActions.searchPreviewSuccess(data));
    }
  } catch (e) {
    yield put(generalActions.searchPreviewFailure(e));
  }
}

export default function* rootSaga() {
  yield takeEvery(
    generalActions.getConnectInformationStoryRequest.type,
    getConnectInformationStorySaga
  );
  yield takeEvery(generalActions.searchRequest.type, searchSaga);
  yield takeEvery(generalActions.searchPreviewRequest.type, searchPreviewSaga);
}
