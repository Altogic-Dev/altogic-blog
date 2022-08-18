import FollowerConnectionService from "@/services/followerConnection";
import { call, takeEvery, put, fork, take } from "redux-saga/effects";
import { followerConnectionActions} from "./followerConnectionSlice";

function* unfollowSaga({payload: { userId, followingUserId }}) {
  try {
    console.log({ userId, followingUserId})
    const { data, error } = yield call(FollowerConnectionService.unfollow, userId, followingUserId)
    console.log({data, error})
    // yield put(followerConnectionActions.fetchDataSuccess());
  } catch (e) {
    console.error({e})
  }
}




export default function* rootSaga() {
  yield takeEvery(followerConnectionActions.unfollowRequest.type, unfollowSaga);
}
