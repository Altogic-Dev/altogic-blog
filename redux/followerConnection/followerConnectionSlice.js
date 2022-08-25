import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  followingStories: null,
  followingUser: null,
  isFollowing: false,
  followingStoriesLoading: false,
  followingUsers: [],
  followingActionResult: null,
  isLoading: false,
};

// Actual Slice
export const followerConnectionSlice = createSlice({
  name: 'followerConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    unfollowRequest() {},
    unfollowSuccess(state) {
      state.isFollowing = false;
    },

    followRequest() {},
    followSuccess(state) {
      state.isFollowing = true;
    },

    getFollowingRequest() {},
    getFollowingSuccess(state, action) {
      state.followingUser = action.payload;
      state.isFollowing = !_.isNull(action.payload);
    },
    getFollowingStoriesRequest(state) {
      state.followingStoriesLoading = true;
    },
    getFollowingStoriesSuccess(state, action) {
      state.followingStories = action.payload;
    },

    unfollowRequest(state) {
      state.isLoading = true;
    },
    unfollowSuccess(state) {
      state.isLoading = false;
    },

    followUserRequest(state) {
      state.isLoading = true;
    },
    followUserSuccess(state, action) {
      state.isLoading = false;
      state.followingActionResult = action.payload;
    },
    followUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFollowingUsersRequest(state) {
      state.isLoading = true;
    },
    getFollowingUsersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },
    getFollowingUsersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.followerConnection,
      }),
    },
  },
});

export const followerConnectionActions = followerConnectionSlice.actions;

export default followerConnectionSlice.reducer;
