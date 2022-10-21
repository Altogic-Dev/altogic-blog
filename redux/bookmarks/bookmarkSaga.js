import { call, takeEvery, put, all, select, fork } from 'redux-saga/effects';
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
  clearBookmarkListRequest,
  clearBookmarkListSuccess,
  clearBookmarkListFailure,
} from '@/redux/bookmarks/bookmarkSlice';
import _ from 'lodash';

// Get bookmark lists
function* getBookmarkListsSaga({ payload }) {
  try {
    const info = yield select((state) => state.bookmark.bookmarkListsInfo);

    if (_.isNil(info) || payload.page <= info.totalPages) {
      const { data, errors } = yield call(
        BookmarkService.getBookmarkList,
        payload
      );
      if (errors) throw errors.items;
      yield put(
        getBookmarkListsSuccess({
          username: payload.username,
          data: data.result,
          info: data.countInfo,
        })
      );
    }
  } catch (error) {
    yield put(getBookmarkListsFailure(error));
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
function* createBookmarkListSaga({ payload: { bookmarkList, bookmark } }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.createBookmarkList,
      bookmarkList
    );
    if (data) {
      yield put(createBookmarkListSuccess(data));
      if (bookmark.story) {
        let { coverImages } = data;
        const storyImages = _.map(bookmark.story.storyImages, (image) => image);
        if (coverImages.length < 4) {
          coverImages = [...coverImages, storyImages[0]];
        } else {
          coverImages = coverImages.slice(1, 4);
          coverImages = [...coverImages, storyImages[0]];
        }
        const req = {
          list: data._id,
          story: bookmark.story._id,
          userId: bookmark.userId,
        };
        if (coverImages.length > 0) {
          coverImages = coverImages.pop();
          req.coverImages = coverImages;
        }
        yield fork(addBookmarkSaga, { payload: req });
      }
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(createBookmarkListFailure(error));
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
      yield put(deleteBookmarkListSuccess(payload));
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
function* clearBookmarkListSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.clearBookmarkList,
      payload
    );
    if (data) {
      yield put(clearBookmarkListSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(clearBookmarkListFailure(error));
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
    yield takeEvery(clearBookmarkListRequest.type, clearBookmarkListSaga),
  ]);
}
