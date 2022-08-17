import FollowerConnectionService from "@/services/followerConnection";
import { call, takeEvery, put, fork, take } from "redux-saga/effects";
import { followerConnectionActions} from "./followerConnectionSlice";

function* getFollowingStoriesSaga({payload: userId}) {
  try {
    const {data, error} = yield call(FollowerConnectionService.getFollowingStories, userId)
    console.log({data, error})
    // yield put(followerConnectionActions.fetchDataSuccess());
  } catch (e) {
    console.error({e})
  }
}




export default function* rootSaga() {
  yield takeEvery(followerConnectionActions.getFollowingStoriesRequest.type, getFollowingStoriesSaga);
}
