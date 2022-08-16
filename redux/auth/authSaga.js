import { call, takeEvery, put, fork, take } from "redux-saga/effects";
import { authActions, authResultActions, setAuthState} from "./authSlice";

function* fetchDataSaga({payload}) {
  try {
    yield put(authActions.fetchDataSuccess());
  } catch (e) {
    yield put(authActions.fetchDataFailure());
  }
}




export default function* rootSaga() {
  yield takeEvery(authActions.fetchDataRequest.type, fetchDataSaga);
}
