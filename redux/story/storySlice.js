import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  followingStories: null,
  followingStoriesInfo: null,
  recommendedStories: null,
  recommendedStoriesInfo: null,
  story: null,
  moreUserStories: null,
  userStories: null,
  isLoading: false,
};

// Actual Slice
export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    // Action to set the authentication status
    getFollowingStoriesRequest(state) {
      state.isLoading = true;
    },
    getFollowingStoriesSuccess(state, action) {
      if (_.isArray(state.followingStories)) {
        state.followingStories = [
          ...state.followingStories,
          ...action.payload.data,
        ];
      } else {
        state.followingStories = action.payload.data;
      }
      state.followingStoriesInfo = action.payload.info;
    },
    getRecommendedStoriesRequest() {},
    getRecommendedStoriesSuccess(state, action) {
      if (_.isArray(state.recommendedStories)) {
        state.recommendedStories = [
          ...state.recommendedStories,
          ...action.payload.data,
        ];
      } else {
        state.recommendedStories = action.payload.data;
      }
      state.recommendedStoriesInfo = action.payload.info;
    },

    getStoryRequest() {},
    getStorySuccess(state, action) {
      state.story = action.payload;
    },
    createStoryRequest(state) {
      state.isLoading = true;
    },
    createStorySuccess(state, action) {
      state.story = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    createStoryFailure(state, action) {
      state.story = null;
      state.error = action.payload;
      state.isLoading = false;

    },
    getStoryRepliesRequest(state) {
      state.isLoading = true;
    },
    getStoryRepliesSuccess(state, action) {
      state.replies = action.payload;
      state.isLoading = false;
    },
    getStoryRepliesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;

    },
    createReplyRequest(state) {
      state.isLoading = true;
    },
    createReplySuccess(state, action) {
      state.replies = [action.payload, ...state.replies];
      state.isLoading = false;
    },
    createReplyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;

    },
    createReplyCommentRequest(state) {
      state.isLoading = true;
    },
    createReplyCommentSuccess(state, action) {
      state.story = action.payload;
      state.isLoading = false;
    },
    createReplyCommentFailure(state, action) {
      state.story = null;
      state.error = action.payload;
      state.isLoading = false;

    },
    getReplyCommentsRequest(state) {
      state.isLoading = true;
    },
    getReplyCommentsSuccess(state, action) {
      state.comments = action.payload;
      state.isLoading = false;
    },
    getReplyCommentsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;

    },
    updateStoryRequest(state) {
      state.isLoading = true;
    },
    updateStorySuccess(state, action) {
      state.story = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    updateStoryFailure(state, action) {
      state.story = null;
      state.error = action.payload;
      state.isLoading = false;
    },

    getStoryBySlugRequest() {},
    getStoryBySlugSuccess(state, action) {
      state.story = action.payload;
      
    },

    getMoreUserStoriesRequest() {},
    getMoreUserStoriesSuccess(state, action) {
      if (_.isArray(state.moreUserStories)) {
        state.moreUserStories = [...state.moreUserStories, ...action.payload];
      } else {
        state.moreUserStories = action.payload;
      }
    },

    getUserStoriesRequest() {},
    getUserStoriesSuccess(state, action) {
      state.userStories = action.payload;
    },

    deleteStoryRequest() {},
    deleteStorySuccess(state, action) {
      state.userStories = _.reject(
        state.userStories,
        (story) => story._id === action.payload
      );
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.story,
      }),
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
