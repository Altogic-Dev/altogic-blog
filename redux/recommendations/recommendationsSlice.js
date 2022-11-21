import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  whoToFollow: [],
  whoToFollowInfo: null,
  whoToFollowLoading: false,
  errors: [],
  topicWritersIdList: [],
  topWriters: [],
  topicWriters: null,
  count: 1,
};

// Actual Slice
export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    // Action to set the authentication status

    getWhoToFollowRequest(state) {
      state.whoToFollowLoading = true;
    },
    getWhoToFollowSuccess(state, action) {
      console.log(action.payload)
      state.whoToFollowLoading = false;
      state.whoToFollow = [...state.whoToFollow, ...action.payload.result];
      state.whoToFollowInfo = action.payload.countInfo
      
    },
    getWhoToFollowFailure(state, action) {
      state.whoToFollowLoading = false;
      state.errors = action.payload;
    },
    getTopWritersRequest(state) {
      state.whoToFollowLoading = true;
    },
    getTopWritersSuccess(state, action) {
      state.whoToFollowLoading = false;
      state.topWriters = action.payload;
    },
    getTopWritersFailure(state, action) {
      state.whoToFollowLoading = false;
      state.errors = action.payload;
    },
    getTopicTopWritersRequest(state) {
      state.isLoading = true;
    },
    getTopicTopWritersSuccess(state, action) {
      state.isLoading = false;
      state.topicWriters = action.payload;
    },
    getTopicTopWritersFailure(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper

    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.recommendations,
      }),
    },
  },
});

export const recommendationsActions = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
