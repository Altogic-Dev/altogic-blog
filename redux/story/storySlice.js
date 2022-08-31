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
    getRecommendedStoriesRequest(state, action) {},
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

    getStoryRequest(state, action) {},
    getStorySuccess(state, action) {
      state.story = action.payload;
    },
    createStoryRequest(state, action) {
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
