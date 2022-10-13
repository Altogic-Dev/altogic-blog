import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  latestTopics: [],
  bestTopics: [],
  trendingTopics: [],
  relatedTopics: [],
  popularTopics: [],
  publicationsTopics: [],
  topWritersIdList: [],
  topWriters: [],
  publicationStoriesByTopic: [],
  topicAnalytics: null,
  isLoading: false,
  error: null,
};

// Actual Slice
export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // Action to set the authentication status
    getTrendingTopicsRequest(state) {
      state.isLoading = true;
    },
    getTrendingTopicsSuccess(state, action) {
      state.trendingTopics = action.payload;
      state.isLoading = false;
    },
    getTrendingTopicsFailure(state, action) {
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
    getTopicTopWritersIdListRequest(state) {
      state.isLoading = true;
    },
    getTopicTopWritersIdListSuccess(state, action) {
      state.isLoading = false;
      state.topWritersIdList = action.payload;
    },
    getTopicTopWritersIdListFailure(state, action) {
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

    getTopicAnalyticsRequest() {},
    getTopicAnalyticsSuccess(state, action) {
      state.topicAnalytics = action.payload;
    },
    getPublicationsTopicsRequest(state) {
      state.isLoading = true;
    },
    getPublicationsTopicsSuccess(state, action) {
      state.isLoading = false;
      state.publicationsTopics = action.payload;
    },
    getPublicationsTopicsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getPublicationsStoriesByTopicRequest() {},
    getPublicationsStoriesByTopicSuccess(state, action) {
      state.publicationStoriesByTopic = action.payload;
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
