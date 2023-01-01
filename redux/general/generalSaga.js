import { call, takeEvery, put, select } from 'redux-saga/effects';
import GeneralService from '@/services/general';
import { generalActions } from './generalSlice';
import { followerConnectionActions } from '../followerConnection/followerConnectionSlice';
import { storyActions } from '../story/storySlice';
import { reportActions } from '../report/reportSlice';
import { subscribeConnectionActions } from '../subscribeConnection/subscribeConnectionSlice';
import { blockConnectionActions } from '../blockConnection/blockConnectionSlice';

function* getConnectInformationStorySaga({ payload: { storyId, authorId } }) {
  try {
    const { data, errors } = yield call(
      GeneralService.getConnectInformationStory,
      storyId,
      authorId
    );
    if (errors) throw errors;
    if (data) {
      const user = yield select((state) => state.auth.user);

      if(data.isFollowing)
      yield put(followerConnectionActions.setIsFollowing({ followerUser: user, followingUser: authorId }));
      if (data.isStoryLiked)
        yield put(storyActions.isLikedStorySuccess(storyId));
      yield put(
        reportActions.getReportedStoryByUserSuccess(data.isStoryReported)
      );
      yield put(subscribeConnectionActions.setIsSubscribed(data.isSubscribed));
      yield put(blockConnectionActions.setIsBlocked(data.isAuthorBlocked));
    }
  } catch (e) {
    console.error({ e });
  }
}
function* getFollowAndSubscribedInfoSaga({ payload: authorId }) {
  try {
    const { data, errors } = yield call(
      GeneralService.getFollowAndSubscribedInfo,
      authorId
    );
    if (errors) throw errors;
    if (data) {
      yield put(followerConnectionActions.setIsFollowing(data.isFollowing));
      yield put(subscribeConnectionActions.setIsSubscribed(data.isSubscribed));
    }
  } catch (e) {
    console.error(e);
  }
}
function* searchSaga({ payload }) {
  try {
    const { data, errors } = yield call(GeneralService.search, payload);
    if (errors) throw errors;
    if (data) {
      yield put(generalActions.searchSuccess(data));
    }
  } catch (e) {
    yield put(generalActions.searchFailure(e));
  }
}
function* searchPreviewSaga({ payload: { query } }) {
  try {
    const { data, errors } = yield call(GeneralService.search, {
      query,
      topicLimit: 3,
      userLimit: 3,
      publicationLimit: 3,
      postLimit: 3,
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
  yield takeEvery(
    generalActions.getFollowAndSubscribedInfoRequest.type,
    getFollowAndSubscribedInfoSaga
  );
}
