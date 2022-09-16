import { call, takeEvery, put, all, fork } from 'redux-saga/effects';
import BookmarkService from '@/services/bookmark';
import {
  getBookmarkListsRequest,
  getBookmarkListsSuccess,
  getBookmarkListsFailure,
  createBookmarkListRequest,
  createBookmarkListSuccess,
  createBookmarkListFailure,
  addBookmarkSuccess,
  addBookmarkFailure,
  deleteBookmarkSuccess,
  deleteBookmarkFailure,
  addBookmarkRequest,
  deleteBookmarkRequest,
  getBookmarkListDetailRequest,
  getBookmarkListDetailSuccess,
  getBookmarkListDetailFailure,
  deleteBookmarkListRequest,
  deleteBookmarkListSuccess,
  deleteBookmarkListFailure,
  updateBookmarkListRequest,
  updateBookmarkListSuccess,
  updateBookmarkListFailure,
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
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
function* addBookmarkSaga({ payload }) {
  try {
    const { data, errors } = yield call(BookmarkService.addBookmark, payload);
    if (data) {
      yield put(addBookmarkSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(addBookmarkFailure(error));
  }
}
function* deleteBookmarkSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.deleteBookmark,
      payload
    );
    if (data) {
      yield put(deleteBookmarkSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(deleteBookmarkFailure(error));
  }
}
function* bookmarkListDetailSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.getBookmarkListDetail,
      payload
    );
    if (data) {
      yield put(getBookmarkListDetailSuccess(data.list));
      yield put(getBookmarksSuccess(data.bookmarks));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(getBookmarkListDetailFailure(error));
  }
}
function* deleteBookmarkListSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.deleteBookmarkList,
      payload
    );
    if (data) {
      yield put(deleteBookmarkListSuccess(...payload));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(deleteBookmarkListFailure(error));
  }
}
function* updateBookmarkListSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.updateBookmarkList,
      payload
    );
    if (data) {
      yield put(updateBookmarkListSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(updateBookmarkListFailure(error));
  }
}
function* getBookmarksSaga({ payload }) {
  try {
    const { data, errors } = yield call(BookmarkService.getBookmarks, payload);
    if (data) {
      yield put(getBookmarksSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(getBookmarksFailure(error));
  }
}

export default function* bookmarkSaga() {
  yield all([
    yield takeEvery(getBookmarkListsRequest.type, getBookmarkListsSaga),
    yield takeEvery(createBookmarkListRequest.type, createBookmarkListSaga),
    yield takeEvery(addBookmarkRequest.type, addBookmarkSaga),
    yield takeEvery(deleteBookmarkRequest.type, deleteBookmarkSaga),
    yield takeEvery(getBookmarkListDetailRequest.type, bookmarkListDetailSaga),
    yield takeEvery(deleteBookmarkListRequest.type, deleteBookmarkListSaga),
    yield takeEvery(updateBookmarkListRequest.type, updateBookmarkListSaga),
    yield takeEvery(getBookmarksRequest.type, getBookmarksSaga),
  ]);
}
