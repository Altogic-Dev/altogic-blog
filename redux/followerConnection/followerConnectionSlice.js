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
  followingStoriesPage: 1,
};

// Actual Slice
export const followerConnectionSlice = createSlice({
  name: 'followerConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    unfollowRequest(state) {
      state.isLoading = true;
    },
    unfollowSuccess(state, action) {
      state.isLoading = false;

      state.isFollowing = false;
      state.userFollowings = state.userFollowings.filter(
        (following) => following.followingUser !== action.payload
      );
    },
    unfollowFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    followRequest(state) {
      state.isLoading = true;
    },
    followSuccess(state) {
      state.isFollowing = true;
      state.isLoading = false;
    },
    followFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
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

    getFollowingUsersRequest(state) {
      state.isLoading = true;
    },
    getFollowingUsersSuccess(state, action) {
      state.isLoading = false;
      state.userFollowings = [...state.userFollowings, ...action.payload.data];
      state.userFollowings.page = action.payload.page;
    },

    setIsFollowing(state, action) {
      state.isFollowing = action.payload;
    },
    increaseFollowingStoriesPage(state) {
      if (state.userFollowings?.length > 0) state.followingStoriesPage += 1;
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
