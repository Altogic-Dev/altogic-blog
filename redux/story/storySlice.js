import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
  followingStories: null,
  followingStoriesInfo: null
};

// Actual Slice
export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {

    // Action to set the authentication status
    getFollowingStoriesRequest(state, action) {
    },
    getFollowingStoriesSuccess(state, action) {
      if(_.isArray(state.followingStories)) {
        state.followingStories = [...state.followingStories, ...action.payload.data]
      } else {
        state.followingStories = action.payload.data
      }
      state.followingStoriesInfo = action.payload.info
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.story,
        };
      },
    },

  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;