import ToastMessage from '@/utils/toast';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  bookmarks: null,
  bookmarkLists: null,
  bookmarkList: null,
  bookmarksInList: null,
  createdBookmarkList: null,
  bookmarkListsInfo: null,
  isLoading: false,
  bookmarkListLoading: true,
  error: null,
  isStoryBookmarked: null,
};

// Actual Slice
export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    getBookmarksRequest(state) {
      state.isLoading = true;
    },
    getBookmarksSuccess(state, action) {
      state.isLoading = false;
      state.bookmarks = action.payload;
    },
    getBookmarksFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookmarkListsRequest(state) {
      state.isLoading = true;
    },
    getBookmarkListsSuccess(state, action) {
      state.isLoading = false;
      const dataIds = _.map(action.payload.data, '_id');
      if (_.isArray(state.bookmarkLists)) {
        state.bookmarkLists = [
          ..._.reject(
            state.bookmarkLists,
            (bookmark) =>
              bookmark.username !== action.payload.username ||
              _.includes(dataIds, bookmark._id)
          ),
          ...action.payload.data,
        ];
      } else {
        state.bookmarkLists = action.payload.data;
      }
      state.bookmarkListsInfo = action.payload.info;
    },
    getBookmarkListsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createBookmarkListRequest(state) {
      state.isLoading = true;
    },
    createBookmarkListSuccess(state, action) {
      state.isLoading = false;
      state.bookmarkLists = [...state.bookmarkLists, action.payload];
      state.createdBookmarkList = action.payload;
    },
    createBookmarkListFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    isBookmarkedSuccess(state, action) {
      state.isLoading = false;
      state.isStoryBookmarked = action.payload;
    },
    addBookmarkRequest(state) {
      state.isLoading = true;
    },
    addBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.bookmarks = [...state.bookmarks, action.payload.bookmark];
      state.bookmarkLists = state.bookmarkLists.map((list) => {
        if (list._id === action.payload.bookmarkList._id) {
          return action.payload.bookmarkList;
        }
        return list;
      });
      state.createdBookmarkList = null;
    },
    addBookmarkFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteBookmarkRequest(state) {
      state.isLoading = true;
    },
    deleteBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark._id !== action.payload._id
      );
    },
    deleteBookmarkFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookmarkListDetailRequest(state) {
      state.bookmarkListLoading = true;
    },
    getBookmarkListDetailSuccess(state, action) {
      state.bookmarkListLoading = false;
      state.bookmarksInList = action.payload.bookmarks;
      state.bookmarkList = action.payload.list;
    },
    getBookmarkListDetailFailure(state, action) {
      state.bookmarkListLoading = false;
      state.error = action.payload;
    },
    deleteBookmarkListRequest(state) {
      state.isLoading = true;
    },
    deleteBookmarkListSuccess(state, action) {
      state.isLoading = false;
      state.bookmarkLists = state.bookmarkLists.filter(
        (list) => list._id !== action.payload
      );
      state.bookmarkList = null;
      ToastMessage.success('Bookmark list deleted successfully');
    },
    deleteBookmarkListFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateBookmarkListRequest(state) {
      state.isLoading = true;
    },
    updateBookmarkListSuccess(state, action) {
      state.isLoading = false;
      state.bookmarkList.name = action.payload.name;
      state.bookmarkList.isPrivate = action.payload.isPrivate;
      state.bookmarkList.slug = action.payload.slug;
      ToastMessage.success('Bookmark list updated successfully');
    },
    updateBookmarkListFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearBookmarkListRequest(state) {
      state.isLoading = true;
    },
    clearBookmarkListSuccess(state, action) {
      state.isLoading = false;
      state.bookmarkLists = state.bookmarkLists.map((list) => {
        if (list._id === action.payload._id) {
          return action.payload;
        }
        return list;
      });
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.bookmarkList !== action.payload._id
      );
    },
    clearBookmarkListFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.bookmark,
      }),
    },
  },
});

export const {
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
  getBookmarkListsRequest,
  getBookmarkListsSuccess,
  getBookmarkListsFailure,
  createBookmarkListRequest,
  createBookmarkListSuccess,
  createBookmarkListFailure,
  isBookmarkedSuccess,
  addBookmarkRequest,
  addBookmarkSuccess,
  addBookmarkFailure,
  deleteBookmarkRequest,
  deleteBookmarkSuccess,
  deleteBookmarkFailure,
  getBookmarkListDetailRequest,
  getBookmarkListDetailSuccess,
  getBookmarkListDetailFailure,
  deleteBookmarkListRequest,
  deleteBookmarkListSuccess,
  deleteBookmarkListFailure,
  updateBookmarkListRequest,
  updateBookmarkListSuccess,
  updateBookmarkListFailure,
  clearBookmarkListRequest,
  clearBookmarkListSuccess,
  clearBookmarkListFailure,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
