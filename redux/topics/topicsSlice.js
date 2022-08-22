import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  latestTopics: [],
  bestTopics: [],
  trendingTopics: [],
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
