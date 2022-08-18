

import _ from "lodash";
import { call, takeEvery, put } from "redux-saga/effects";
import { storyActions } from "./storySlice";

import StoryService from "@/services/story";

function* getFollowingStoriesSaga({payload: { userId, page }}) {
  try {
    const { data, error } = yield call(StoryService.getFollowingStories, userId, page)
    if(!_.isNil(data) && _.isNil(error)) {
      yield put(storyActions.getFollowingStoriesSuccess({ 
        data: data.data, 
        info: data.info 
      }));
    }
  } catch (e) {
    console.error({e})
  }
}




export default function* rootSaga() {
  yield takeEvery(storyActions.getFollowingStoriesRequest.type, getFollowingStoriesSaga);
}
