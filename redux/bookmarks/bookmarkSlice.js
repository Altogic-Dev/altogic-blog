import ToastMessage from '@/utils/toast';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  myBookmarks: [],
  myBookmarksLoading: true,
  updatedBookmark: null,
  bookmarkLists: {},
  bookmarkListCounts: {},

  bookmarks: {},

  bookmarkListsUser: [],
  bookmarkList: null,

  createdBookmarkList: null,


  isLoading: false,
  bookmarkListLoading: true,
  bookmarkListsUserLoading: true,
  error: null,
  isStoryBookmarked: null,
};

// Actual Slice
export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {


    getMyBookmarksRequest(state) {
      state.myBookmarksLoading = true;
    },

    getMyBookmarksSuccess(state, action) {
      state.myBookmarks = action.payload.data
      action.payload.data.forEach(item => {
        state.bookmarks[item.bookmarkList] = [...state.bookmarks[item.bookmarkList] ?? [], item]
      }
      )

      state.isLoading = false;

    },

    getMyBookmarksFailure(state, action) {

      state.isLoading = false;
      state.error = action.payload;
    },
    getUserBookmarkListsRequest(state) {
      state.bookmarkListsUserLoading = true;
    },
    getUserBookmarkListsSuccess(state, action) {
      state.bookmarkListsUserLoading = false;
      state.bookmarkLists[action.payload.username] = {
        bookmarkLists: [...(_.get(state.bookmarkList, `${action.payload.username}.data`) ?? []), ...action.payload.data],
        totalPages: action.payload.info.totalPages,
        page: action.payload.page
      }

    },
    getUserBookmarkListsFailure(state, action) {
      state.bookmarkListsUserLoading = false;
      state.error = action.payload;
    },
    createBookmarkListRequest(state) {
      state.isLoading = true;
    },
    createBookmarkListSuccess(state, action) {
      try {
        state.isLoading = false;
        state.bookmarkLists[action.payload.username].bookmarkLists = [...state.bookmarkLists[action.payload.username].bookmarkLists, action.payload]
        state.createdBookmarkList = action.payload;
      } catch (error) {
        console.log(error)
      }
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
      
      try {
        state.isLoading = false;
        state.myBookmarks = [...state.myBookmarks, action.payload.bookmark];
        state.bookmarks[action.payload.bookmarkList._id] = [...(state.bookmarks[action.payload.bookmarkList._id] ?? []), action.payload.bookmark]

        state.createdBookmarkList = null;
      } catch (error) {
        console.log(error)
      }
    },
    addBookmarkFailure(state, action) {
      ToastMessage.error("This story doesn't exist any longer");
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteBookmarkRequest(state) {
      state.isLoading = true;
    },
    deleteBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.bookmarks[action.payload.bookmarkList] = state.bookmarks[action.payload.bookmarkList].filter(
        (bookmark) => bookmark._id !== action.payload._id
      );



      state.myBookmarks = state.myBookmarks.filter(
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
      state.bookmarkLists[action.payload.username].bookmarkLists.bookmarks = [...(state.bookmarkLists[action.payload.username].bookmarkLists.bookmarks ?? []), ...action.payload.bookmarks]

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
      state.bookmarkLists[action.payload.username].bookmarkLists = state.bookmarkLists[action.payload.username].bookmarkLists.map(list => {
        if (list._id === action.payload._id)
          return action.payload
        return list
      })
      state.updatedBookmark = action.payload
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

  getMyBookmarksRequest,
  getMyBookmarksSuccess,
  getMyBookmarksFailure,
  getUserBookmarkListsRequest,
  getUserBookmarkListsSuccess,
  getUserBookmarkListsFailure,
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
  getMyBookmarksProfileRequest,
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
