import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  followingStories: null,
  followingUser: null,
  isFollowing: false,
  isFollowings: [],
  followingStoriesLoading: false,
  followingActionResult: null,
  userFollowers: [],
  userFollowings: [],
  isLoading: false,
  followingUserLoading: false,
  followingStoriesPage: 1,
  userFollowingsCount: 0,
  userFollowingsOwner: null
};

// Actual Slice
export const followerConnectionSlice = createSlice({
  name: 'followerConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    unfollowRequest(state) {
      state.followingUserLoading = true;
    },
    unfollowSuccess(state, action) {
      state.followingUserLoading = false;
      state.isFollowing = false;
      state.isFollowings = _.reject(
        state.isFollowings,
        (followingId) => followingId === action.payload
      );
      state.userFollowings = state.userFollowings.filter(
        (following) => following.followingUser !== action.payload
      );
    },
    unfollowFailure(state, action) {
      state.followingUserLoading = false;
      state.error = action.payload;
    },

    followRequest(state) {
      state.followingUserLoading = true;
    },
    followSuccess(state, action) {
      state.isFollowing = true;
      state.isFollowings = [
        ...state.isFollowings,
        action.payload.followingUser,
      ];
      state.followingUserLoading = false;
    },
    followFailure(state, action) {
      state.followingUserLoading = false;
      state.error = action.payload;
    },
    getFollowingStoriesRequest(state) {
      state.followingStoriesLoading = true;
    },
    getFollowingStoriesSuccess(state, action) {
      state.followingStories = action.payload;
    },

    followUserRequest(state) {
      state.followingUserLoading = true;
    },
    followUserSuccess(state, action) {
      state.followingUserLoading = false;
      state.followingActionResult = action.payload;
    },
    followUserFailure(state, action) {
      state.followingUserLoading = false;
      state.error = action.payload;
    },
    getFollowingUsersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getFollowerUsersRequest() {},
    getFollowerUsersSuccess(state, action) {
      state.userFollowers = [...state.userFollowers, ...action.payload.data];
      const isFollowingsFollowers = _.reject(action.payload.data, (person) =>
        _.isNil(person.isFollowing)
      );
      const isFollowingFollowerIds = _.map(
        isFollowingsFollowers,
        'followerUser'
      );
      state.isFollowings = [...state.isFollowings, ...isFollowingFollowerIds];
    },

    getFollowingUsersRequest(state) {
      state.isLoading = true;
    },
    getFollowingUsersSuccess(state, action) {
      state.isLoading = false;
      console.log(action.payload)
      console.log(action.payload.owner,state.userFollowingsOwner)
      if (action.payload.owner === state.userFollowingsOwner) {
        state.userFollowings = [
          ...state.userFollowings,
          ...action.payload.data,
        ];
      } else {
        state.userFollowings = action.payload.data;
        state.userFollowingsOwner = action.payload.owner;
      }
      state.userFollowings.page = action.payload.page;
      state.userFollowingsCount = action.payload.info.count;
      const isFollowingsFollowings = _.reject(action.payload.data, (person) =>
        _.isNil(person.isFollowing)
      );
      const isFollowingFollowingIds = _.map(
        isFollowingsFollowings,
        'followingUser'
      );
      state.isFollowings = [...state.isFollowings, ...isFollowingFollowingIds];
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
