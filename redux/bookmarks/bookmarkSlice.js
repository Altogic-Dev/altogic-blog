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

  bookmarks: {},

  bookmarkListsUser: [],
  bookmarkList: null,

  createdBookmarkList: null,


  isLoading: false,
  bookmarkListLoading: true,
  bookmarkListsUserLoading: false,
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
        bookmarkLists: [...(_.get(state.bookmarkLists, `${action.payload.username}.bookmarkLists`) ?? []), ...action.payload.data],
        totalPages: action.payload.info.totalPages,
        page: action.payload.info.currentPage,
        count: action.payload.info.count
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
      state.isLoading = false;
      state.bookmarkLists[action.payload.username].bookmarkLists = [...state.bookmarkLists[action.payload.username].bookmarkLists, action.payload]
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
      state.myBookmarks = [...state.myBookmarks, action.payload.bookmark];
      const index = _.findIndex(state.bookmarkLists[action.payload.username].bookmarkLists, list => list._id === action.payload.bookmarkList._id)
      state.bookmarkLists[action.payload.username].bookmarkLists[index].storyCount += 1
      state.bookmarks[action.payload.bookmarkList._id] = [...(state.bookmarks[action.payload.bookmarkList._id] ?? []), action.payload.bookmark]
      state.createdBookmarkList = null;
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
      state.bookmarks[action.payload.data.bookmarkList] = state.bookmarks[action.payload.data.bookmarkList].filter(
        (bookmark) => bookmark._id !== action.payload.data._id
      );

      const index = _.findIndex(state.bookmarkLists[action.payload.username].bookmarkLists, list => list._id === action.payload.data.bookmarkList)
      state.bookmarkLists[action.payload.username].bookmarkLists[index].storyCount -= 1

      state.myBookmarks = state.myBookmarks.filter(
        (bookmark) => bookmark._id !== action.payload.data._id
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

      if (!state.bookmarkLists[action.payload.list.username]) {
        state.bookmarkLists[action.payload.list.username] = { bookmarkLists: [] }
      }
      state.bookmarkLists[action.payload.list.username].bookmarkLists = [...state.bookmarkLists[action.payload.list.username].bookmarkLists, action.payload.list]
      state.bookmarks[action.payload.list._id] = [...(state.bookmarks[action.payload.list._id] ?? []), ...action.payload.bookmarks]

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
      state.bookmarkLists[action.payload.username].bookmarkLists = state.bookmarkLists[action.payload.username].bookmarkLists.filter(list => list._id !== action.payload.listId)
      state.myBookmarks = state.myBookmarks.filter(item => item.bookmarkList !== action.payload.listId)
      delete state.bookmarks[action.payload.listId]
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
      state.myBookmarks = state.myBookmarks.filter(item => item.bookmarkList !== action.payload._id)
      const index = _.findIndex(state.bookmarkLists[action.payload.username].bookmarkLists, list => list._id === action.payload._id)
      state.bookmarkLists[action.payload.username].bookmarkLists[index].storyCount = 0
      state.bookmarks[action.payload._id] = []
    },
    clearBookmarkListFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteStorySuccess(state, action) {
      state.isLoading = false;

      state.bookmarks = Object.values(state.bookmarks).map(bookmarkList => {
        if (bookmarkList.some(item => item.story._id === action.payload.storyId)) {
          const index = _.findIndex(state.bookmarkLists[action.payload.username].bookmarkLists, list => list._id === _.first(bookmarkList).bookmarkList)
          state.bookmarkLists[action.payload.username].bookmarkLists[index].storyCount -= 1
        }

        return bookmarkList.filter(
          (bookmark) => bookmark.story._id !== action.payload.storyId
        )
      }
      )
      state.myBookmarks = state.myBookmarks.filter(
        (bookmark) => bookmark.story._id !== action.payload.storyId
      );

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
  deleteStorySuccess
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
