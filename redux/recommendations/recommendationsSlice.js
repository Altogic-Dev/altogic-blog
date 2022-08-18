import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  whoToFollow: [],
  whoToFollowLoading: false,
  whoToFollowMinimized: [],
  whoToFollowMinimizedLoading: false,
};

// Actual Slice
export const recommendationsSlice = createSlice({
  name: 'whoToFollow',
  initialState,
  reducers: {
    // Action to set the authentication status
    getWhoToFollowMinimizedRequest(state, action) {
      state.whoToFollowMinimizedLoading = true;
    },
    getWhoToFollowMinimizedSuccess(state, action) {
      state.whoToFollowMinimizedLoading = false;
      state.whoToFollowMinimized = action.payload;
    },
    getWhoToFollowRequest(state, action) {
      state.isLoading = true;
    },
    getWhoToFollowSuccess(state, action) {
      state.isLoading = false;
      state.whoToFollow = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.whoToFollow,
          ...action.payload.whoToFollowMinimized,
        };
      },
    },
  },
});

export const recommendationsActions = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
