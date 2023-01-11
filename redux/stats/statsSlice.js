import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DateTime } from 'luxon';
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
  likesPeriodically: [],
  viewsPeriodically: [],
  readsPeriodically: [],
  likesDateType: '30 Days',
  viewsDateType: '30 Days',
  readsDateType: '30 Days',
  storyCreatedAt: null,
  readingDateType: '30 Days',
  viewDateType: '30 Days',
  storyName: null,
  publicationStories: [],
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
      state.isLoading = false;
      state.storiesStatistics = action.payload;
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
      state.internalViews = _.first(action.payload.internalViews)?.count ?? 0;
      state.externalViews = _.first(action.payload.externalViews)?.count ?? 0;
      state.totalLikes = _.first(action.payload.totalLikes)?.count ?? 0;
      state.storyTotalReadTime =
        _.first(action.payload.totalReadTime)?.sum ?? 0;
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
      state.internalViewsPeriodically = {
        ...state.internalViewsPeriodically,
        [action.payload.type]: action.payload.internalPeriodically,
      };
      state.externalViewsPeriodically = {
        ...state.externalViewsPeriodically,
        [action.payload.type]: action.payload.externalPeriodically,
      };
      state.viewDateType = action.payload.type;

      state.error = null;
      state.isLoading = false;
    },
    getStoryStatisticsPeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getPublicationLikesPeriodicallyRequest(state) {
      state.isLoading = true;
    },
    getPublicationLikesPeriodicallySuccess(state, action) {
      state.likesPeriodically = {
        ...state.likesPeriodically,
        [action.payload.type]: action.payload,
      };

      state.likesDateType = action.payload.type;

      state.error = null;
      state.isLoading = false;
    },
    getPublicationLikesPeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPublicationViewsPeriodicallyRequest(state) {
      state.isLoading = true;
    },
    getPublicationViewsPeriodicallySuccess(state, action) {
      state.viewsPeriodically = {
        ...state.viewsPeriodically,
        [action.payload.type]: action.payload,
      };
      state.viewsDateType = action.payload.type;

      state.error = null;
      state.isLoading = false;
    },
    getPublicationViewsPeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPublicationReadsPeriodicallyRequest(state) {
      state.isLoading = true;
    },
    getPublicationReadsPeriodicallySuccess(state, action) {
      state.readsPeriodically = {
        ...state.readsPeriodically,
        [action.payload.type]: action.payload,
      };

      state.readsDateType = action.payload.type;

      state.error = null;
      state.isLoading = false;
    },
    getPublicationReadsPeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getStoryReadingTimePeriodicallyRequest(state) {
      state.isLoading = true;
    },
    getStoryReadingTimePeriodicallySuccess(state, action) {
      state.storyTotalReadTimePeriodically = {
        ...state.storyTotalReadTimePeriodically,
        [action.payload.type]: action.payload,
      };
      state.readingDateType = action.payload.type;
      state.error = null;
      state.isLoading = false;
    },
    getStoryReadingTimePeriodicallyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPublicationsStoriesStatsRequest(state) {
      state.isLoading = true;
    },
    getPublicationsStoriesStatsSuccess(state, action) {
      const dateFirst = DateTime.fromISO(action.payload.oneMonth[0]?.createdAt);
      const oneMonthName = `${dateFirst.monthLong} ${dateFirst.year}`;

      const dateSecond = DateTime.fromISO(
        action.payload.twoMonths[0]?.createdAt
      );
      const twoMonthsName = `${dateSecond.monthLong} ${dateSecond.year}`;

      const dateThird = DateTime.fromISO(
        action.payload.threeMonths[0]?.createdAt
      );
      const threeMonthsName = `${dateThird.monthLong} ${dateThird.year}`;
      if (action.payload.oneMonth.length > 0)
        state.publicationStories.push({
          data: action.payload.oneMonth,
          name: oneMonthName,
          page: action.payload.page,
        });
      if (action.payload.twoMonths.length > 0)
        state.publicationStories.push({
          data: action.payload.twoMonths,
          name: twoMonthsName,
          page: action.payload.page,
        });
      if (action.payload.threeMonths.length > 0)
        state.publicationStories.push({
          data: action.payload.threeMonths,
          name: threeMonthsName,
          page: action.payload.page,
        });

      state.isLoading = false;
    },
    getPublicationsStoriesStatsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearStoryDataRequest(state) {
      state.internalViewsPeriodically = []
      state.externalViewsPeriodically = []
      state.storyTotalReadTimePeriodically = []
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
