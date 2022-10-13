import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  whoToFollow: [],
  whoToFollowLoading: false,
  whoToFollowMinimized: [],
  whoToFollowMinimizedLoading: false,
  errors: [],
  topWriters: []
};

// Actual Slice
export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    // Action to set the authentication status
    getWhoToFollowMinimizedRequest(state) {
      state.whoToFollowMinimizedLoading = true;
    },
    getWhoToFollowMinimizedSuccess(state, action) {
      state.whoToFollowMinimizedLoading = false;
      state.whoToFollowMinimized = action.payload;
    },
    getWhoToFollowMinimizedFailure(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    getWhoToFollowRequest(state) {
      state.whoToFollowLoading = true;
    },
    getWhoToFollowSuccess(state, action) {
      state.whoToFollowLoading = false;
      state.whoToFollow = [...state.whoToFollow,...action.payload]

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
      state.topWriters = [...state.topWriters,...action.payload]
    },
    getTopWritersFailure(state, action) {
      state.whoToFollowLoading = false;
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
