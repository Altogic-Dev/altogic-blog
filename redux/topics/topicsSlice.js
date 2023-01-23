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
  searchTopics: [],
  topicAnalytics: null,
  bestLoading: false,
  trendingLoading: false,
  latestLoading: false,
  error: null,
};

// Actual Slice
export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // Action to set the authentication status
    getTrendingTopicsRequest(state) {
      state.trendingLoading = true;
    },
    getTrendingTopicsSuccess(state, action) {
      state.trendingTopics = action.payload;
      state.trendingLoading = false;
    },
    getTrendingTopicsFailure(state, action) {
      state.error = action.payload;
      state.trendingLoading = false;
    },
    getLatestsOfTopicRequest(state) {
      state.latestLoading = true;
    },
    getLatestsOfTopicSuccess(state, action) {
      state.latestTopics = action.payload;
      state.latestLoading = false;
    },
    getLatestsOfTopicFailure(state, action) {
      state.latestLoading = false;
      state.error = action.payload;
    },
    getBestsOfTopicRequest(state) {
      state.bestLoading = true;
    },
    getBestsOfTopicSuccess(state, action) {
      state.bestTopics = action.payload;
      state.bestLoading = false;
    },
    getBestsOfTopicFailure(state, action) {
      state.bestLoading = false;
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

    getTopicAnalyticsRequest() { },
    getTopicAnalyticsSuccess(state, action) {
      state.topicAnalytics = action.payload;
    },
    getPublicationsTopicsRequest(state) {
      state.isLoading = true;
    },
    getPublicationsTopicsSuccess(state, action) {
      state.isLoading = false;
      state.publicationsTopics = action.payload.map(group => {
        const temp = group
        temp.topic = group.groupby.group
        return temp
      });
    },
    getPublicationsTopicsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    searchTopicsRequest(state) {
      state.searchTopics = []
      state.isLoading = true;
    },
    searchTopicsSuccess(state, action) {
      state.isLoading = false;
      state.searchTopics = action.payload;
    },
    searchTopicsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearTopicsDataRequest(state) {
      state.latestTopics = [];
      state.bestTopics = [];
      state.trendingTopics = [];
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
