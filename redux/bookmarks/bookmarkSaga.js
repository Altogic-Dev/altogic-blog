import { call, takeEvery, put, all } from 'redux-saga/effects';
import BookmarkService from '@/services/bookmark';
import {
  getBookmarkListsRequest,
  getBookmarkListsSuccess,
  getBookmarkListsFailure,
  createBookmarkListRequest,
  createBookmarkListSuccess,
  createBookmarkListFailure,
} from '@/redux/bookmarks/bookmarkSlice';

// Get bookmark lists
function* getBookmarkListsSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.getBookmarkList,
      payload
    );
    if (errors) throw errors.items;
    yield put(getBookmarkListsSuccess(data));
  } catch (error) {
    yield put(getBookmarkListsFailure(error));
  }
}
function* createBookmarkListSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.createBookmarkList,
      payload
    );
    if (data) {
      yield put(createBookmarkListSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(createBookmarkListFailure(error));
  }
}

export default function* bookmarkSaga() {
  yield all([
    yield takeEvery(getBookmarkListsRequest.type, getBookmarkListsSaga),
    yield takeEvery(createBookmarkListRequest.type, createBookmarkListSaga),
  ]);
}
