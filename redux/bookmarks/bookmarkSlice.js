import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  bookmarks: null,
  bookmarkLists: null,
  isLoading: false,
  error: null,
};

// Actual Slice
export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    // Action to set the authentication status
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
      state.bookmarkLists = action.payload;
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
    },
    createBookmarkListFailure(state, action) {
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
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
