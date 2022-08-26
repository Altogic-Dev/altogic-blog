import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  isLiked: false,
};

// Actual Slice
export const storyLikesSlice = createSlice({
  name: 'storyLikes',
  initialState,
  reducers: {
    // Action to set the authentication status
    likeStoryRequest() {},
    likeStorySuccess(state) {
      state.isLiked = true;
    },

    unlikeStoryRequest() {},
    unlikeStorySuccess(state) {
      state.isLiked = false;
    },

    isLikedStoryRequest() {},
    isLikedStorySuccess(state, action) {
      state.isLiked = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.storyLikes,
        };
      },
    },
  },
});

export const storyLikesActions = storyLikesSlice.actions;

export default storyLikesSlice.reducer;