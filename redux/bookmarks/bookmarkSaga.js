import { call, takeEvery, put, all, fork, select } from 'redux-saga/effects';
import BookmarkService from '@/services/bookmark';
import {
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
  getMyBookmarksRequest,
  getMyBookmarksSuccess,
  getMyBookmarksFailure,
  getUserBookmarkListsRequest,
  getUserBookmarkListsSuccess,
  getUserBookmarkListsFailure,
  clearBookmarkListRequest,
  clearBookmarkListSuccess,
  clearBookmarkListFailure,
} from '@/redux/bookmarks/bookmarkSlice';
import _ from 'lodash';

// Get bookmark lists
function* getUserBookmarkListsSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      BookmarkService.getBookmarkList,
      payload
    );
    if (errors) throw errors.items;
    yield put(
      getUserBookmarkListsSuccess({
        username: payload.username,
        data: data.result,
        info: data.countInfo,
      })
    );
  } catch (error) {
    yield put(getUserBookmarkListsFailure(error));
  }
}
function* addBookmarkSaga({ payload }) {
  try {
    const { data, errors } = yield call(BookmarkService.addBookmark, payload);
    if (data) {
      data.username = payload.username
      yield put(addBookmarkSuccess(data));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(addBookmarkFailure(error));
  }
}
function* createBookmarkListSaga({ payload: { bookmarkList, bookmark, username } }) {
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
          username,
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
    const user = yield select((state) => state.auth.user);

    const { data, errors } = yield call(
      BookmarkService.deleteBookmark,
      payload
    );
    if (data) {
      yield put(deleteBookmarkSuccess({ data, username: user.username, newImages: payload.newImages }));
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
      console.log('this')

    if (data) {
      yield put(getBookmarkListDetailSuccess(data));

    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(getBookmarkListDetailFailure(error));
  }
}
function* deleteBookmarkListSaga({ payload }) {
  try {
    const user = yield select(
      (state) => state.auth.user
    );
    const { data, errors } = yield call(
      BookmarkService.deleteBookmarkList,
      payload
    );
    if (data) {
      yield put(deleteBookmarkListSuccess({ listId: payload, username: user.username }));
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
function* getMyBookmarksSaga({ payload: { userId, username } }) {
  try {
    const { data, errors } = yield call(BookmarkService.getMyBookmarks, userId);
    if (data) {
      yield put(getMyBookmarksSuccess({ data, username }));
    }
    if (errors) throw errors.items;
  } catch (error) {
    yield put(getMyBookmarksFailure(error));
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
    yield takeEvery(createBookmarkListRequest.type, createBookmarkListSaga),
    yield takeEvery(getUserBookmarkListsRequest.type, getUserBookmarkListsSaga),
    yield takeEvery(addBookmarkRequest.type, addBookmarkSaga),
    yield takeEvery(deleteBookmarkRequest.type, deleteBookmarkSaga),
    yield takeEvery(getBookmarkListDetailRequest.type, bookmarkListDetailSaga),
    yield takeEvery(deleteBookmarkListRequest.type, deleteBookmarkListSaga),
    yield takeEvery(updateBookmarkListRequest.type, updateBookmarkListSaga),
    yield takeEvery(getMyBookmarksRequest.type, getMyBookmarksSaga),
    yield takeEvery(clearBookmarkListRequest.type, clearBookmarkListSaga),
  ]);
}
