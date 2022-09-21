import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  totalReadingTime: 0,
  totalReadingCount: 0,
  totalLikes: 0,
  totalReplies: 0,
  totalReadsLastXDays: [],
  totalLikesLastXDays: [],
  totalViewsLastXDays: [],
  statistics: null,
  storiesStatistics: [],
  externalViews: 0,
  internalViews: 0,
  storyTotalReadTime: 0,
  internalViewsPeriodically: [],
  externalViewsPeriodically: [],
  storyTotalReadTimePeriodically: [],
  storyCreatedAt: null,
  readingDateType: '30 Days',
  viewDateType: '30 Days',
  storyName: null,
};

// Actual Slice
export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    // Action to set the authentication status
    getStatisticsRequest(state) {
      state.isLoading = true;
    },
    getStatisticsSuccess(state, action) {
      state.statistics = action.payload;
      state.isLoading = false;
    },
    getStatisticsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getTotalReadsLastXDaysRequest(state) {
      state.isLoading = true;
    },
    getTotalReadsLastXDaysSuccess(state, action) {
      state.totalReadsLastXDays = action.payload;
      state.isLoading = false;
    },
    getTotalReadsLastXDaysFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getTotalViewsLastXDaysRequest(state) {
      state.isLoading = true;
    },
    getTotalViewsLastXDaysSuccess(state, action) {
      state.totalViewsLastXDays = action.payload;
      state.isLoading = false;
    },
    getTotalViewsLastXDaysFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getTotalLikesLastXDaysRequest(state) {
      state.isLoading = true;
    },
    getTotalLikesLastXDaysSuccess(state, action) {
      state.totalLikesLastXDays = action.payload;
      state.isLoading = false;
    },
    getTotalLikesLastXDaysFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getAllStoriesStatisticsRequest(state) {
      state.isLoading = true;
    },
    getAllStoriesStatisticsSuccess(state, action) {
      state.storiesStatistics = action.payload;
      state.isLoading = false;
    },
    getAllStoriesStatisticsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getStoryStatisticsRequest(state) {
      state.isLoading = true;
    },
    getStoryStatisticsSuccess(state, action) {
      state.storyCreatedAt = action.payload.story.createdAt;
      state.storyName = action.payload.story.title;
      state.internalViews= _.first(action.payload.internalViews)?.count ?? 0
      state.externalViews= _.first(action.payload.externalViews)?.count ?? 0
      state.totalLikes = _.first(action.payload.totalLikes)?.count ?? 0
      state.storyTotalReadTime= _.first(action.payload.totalReadTime)?.sum ?? 0
      state.error = null;
      state.isLoading = false;
    },
    getStoryStatisticsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getStoryStatisticsPeriodicallyRequest(state) {
      state.isLoading = true;
    },
    getStoryStatisticsPeriodicallySuccess(state, action) {
      state.internalViewsPeriodically= {...state.internalViewsPeriodically, [action.payload.type]: action.payload.internalPeriodically }
      state.externalViewsPeriodically= {...state.externalViewsPeriodically, [action.payload.type]: action.payload.externalPeriodically }
      state.viewDateType= action.payload.type

      state.error = null;
      state.isLoading = false;
    },
    getStoryStatisticsPeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getStoryReadingTimePeriodicallyRequest(state) {
      state.isLoading = true;
    },
    getStoryReadingTimePeriodicallySuccess(state, action) {
      state.storyTotalReadTimePeriodically= {...state.storyTotalReadTimePeriodically, [action.payload.type]:  action.payload}
      state.readingDateType= action.payload.type
      state.error = null;
      state.isLoading = false;
    },
    getStoryReadingTimePeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.stats,
      }),
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice.reducer;