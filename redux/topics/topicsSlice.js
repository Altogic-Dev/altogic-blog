import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  latestTopics: [],
  bestTopics: [],
  trendingTopics: [],
  relatedTopics: [],
  popularTopics: [],
  topWriters: [],
  isLoading: false,
  error: null,
};

// Actual Slice
export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // Action to set the authentication status
    getTrendingsOfTopicRequest(state) {
      state.isLoading = true;
    },
    getTrendingsOfTopicSuccess(state, action) {
      state.trendingTopics = action.payload;
      state.isLoading = false;
    },
    getTrendingsOfTopicFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getLatestsOfTopicRequest(state) {
      state.isLoading = true;
    },
    getLatestsOfTopicSuccess(state, action) {
      state.latestTopics = action.payload;
      state.isLoading = false;
    },
    getLatestsOfTopicFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBestsOfTopicRequest(state) {
      state.isLoading = true;
    },
    getBestsOfTopicSuccess(state, action) {
      state.bestTopics = action.payload;
      state.isLoading = false;
    },
    getBestsOfTopicFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getPopularTopicsRequest(state) {
      state.isLoading = true;
    },
    getPopularTopicsSuccess(state, action) {
      state.isLoading = false;
      state.popularTopics = action.payload;
    },
    getPopularTopicsFailure(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    getRelatedTopicsRequest(state) {
      state.isLoading = true;
    },
    getRelatedTopicsSuccess(state, action) {
      state.isLoading = false;
      state.relatedTopics = action.payload;
    },
    getRelatedTopicsFailure(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    getTopicTopWritersRequest(state) {
      state.isLoading = true;
    },
    getTopicTopWritersSuccess(state, action) {
      state.isLoading = false;
      state.topWriters = action.payload;
    },
    getTopicTopWritersFailure(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },


    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.topics,
      }),
    },
  },
});

export const topicsActions = topicsSlice.actions;

export default topicsSlice.reducer;
