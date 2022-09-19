import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  followingStories: null,
  followingUser: null,
  isFollowing: false,
  followingStoriesLoading: false,
  followingActionResult: null,
  userFollowers: [],
  userFollowings: [],
  isLoading: false,
};

// Actual Slice
export const followerConnectionSlice = createSlice({
  name: 'followerConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    unfollowRequest() {},
    unfollowSuccess(state, action) {
      state.isFollowing = false;
      state.userFollowings = _.filter(
        state.userFollowings,
        (user) => user._id !== action.payload
      );
    },

    followRequest() {},
    followSuccess(state) {
      state.isFollowing = true;
    },
    getFollowingStoriesRequest(state) {
      state.followingStoriesLoading = true;
    },
    getFollowingStoriesSuccess(state, action) {
      state.followingStories = action.payload;
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
    getFollowingUsersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getFollowerUsersRequest() {},
    getFollowerUsersSuccess(state, action) {
      state.userFollowers = [...state.userFollowers, ...action.payload.data];
    },

    getFollowingUsersRequest() {},
    getFollowingUsersSuccess(state, action) {
      state.userFollowings = [...state.userFollowings, ...action.payload.data];
      state.userFollowings.page = action.payload.page;
    },

    setIsFollowing(state, action) {
      state.isFollowing = action.payload;
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
