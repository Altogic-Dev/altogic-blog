import { call, takeEvery, put } from 'redux-saga/effects';
import GeneralService from '@/services/general';
import { generalActions } from './generalSlice';
import { followerConnectionActions } from '../followerConnection/followerConnectionSlice';
import { storyLikesActions } from '../storyLikes/storyLikesSlice';
import { reportActions } from '../report/reportSlice';
import { subscribeConnectionActions } from '../subscribeConnection/subscribeConnectionSlice';
import { isBookmarkedSuccess } from '../bookmarks/bookmarkSlice';

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
      yield put(isBookmarkedSuccess(data.isBookmarked));
      yield put(
        reportActions.getReportedStoryByUserSuccess(data.isStoryReported)
      );
      yield put(subscribeConnectionActions.setIsSubscribed(data.isSubscribed));
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
