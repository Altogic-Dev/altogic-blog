import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  whoToFollow: [],
  whoToFollowLoading: false,
  whoToFollowMinimized: [],
  whoToFollowMinimizedLoading: false,
  isLoading: false,
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
      state.isLoading = false;
    },
    getWhoToFollowRequest(state) {
      state.whoToFollowLoading = true;
    },
    getWhoToFollowSuccess(state, action) {
      state.isLoading = false;
      state.whoToFollow = action.payload;
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
