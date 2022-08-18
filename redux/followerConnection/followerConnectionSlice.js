import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  followingStories: null,
};

// Actual Slice
export const followerConnectionSlice = createSlice({
  name: 'followerConnection',
  initialState,
  reducers: {
    // Action to set the authentication status

    unfollowRequest(state, action) {},
    unfollowSuccess(state, action) {},

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.followerConnection,
        };
      },
    },
  },
});

export const followerConnectionActions = followerConnectionSlice.actions;

export default followerConnectionSlice.reducer;
