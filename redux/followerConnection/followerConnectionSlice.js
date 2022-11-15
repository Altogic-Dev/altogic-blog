import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  followingStories: null,
  followingUser: null,
  isFollowing: false,
  profileFollowings: [],
  profileFollowingsCount: 0,
  isFollowings: [],
  myFollowings: [],
  followingStoriesLoading: false,
  followingActionResult: null,
  userFollowers: [],
  userFollowings: [],
  isLoading: false,
  followingUserLoading: false,
  followingStoriesPage: 1,
  userFollowingsCount: 0,
  userFollowingsOwner: null,
  subscriptions: [],
  subscriptionsLoading: false,
  userFollowingsPage: 1,
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
      if (!action.payload.dontUpdateFollowing)
        state.isFollowing = false;

      state.isFollowings = _.reject(
        state.isFollowings,
        (followingId) => followingId === action.payload.followingUserId
      );

      state.userFollowings = state.userFollowings.filter(
        (following) => following.followingUser !== action.payload.followingUserId
      );


      state.userFollowingsCount -= 1

    },
    unfollowFailure(state, action) {
      state.followingUserLoading = false;
      state.error = action.payload;
    },
    handleFollowingCount(state, action) {

      state.userFollowingsCount += action.payload;
    },
    followRequest(state) {
      state.followingUserLoading = true;
    },
    followSuccess(state, action) {
      if (!action.payload.dontUpdateFollowing)
        state.isFollowing = true;
      state.isFollowings = [
        ...state.isFollowings,
        action.payload.followingUser.followingUser,
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
    getFollowingUsersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getFollowerUsersRequest() { },
    getFollowerUsersSuccess(state, action) {
      state.userFollowers = [...state.userFollowers, ...action.payload.data];
      // const isFollowingsFollowers = _.reject(action.payload.data, (person) =>
      //   _.isNil(person.isFollowing)
      // );
      // const isFollowingFollowerIds = _.map(
      //   isFollowingsFollowers,
      //   'followerUser'
      // );
      // state.isFollowings = [...state.isFollowings, ...isFollowingFollowerIds];
    },

    getFollowingUsersRequest(state) {
      state.isLoading = true;
    },
    getFollowingUsersSuccess(state, action) {
      state.isLoading = false;
      console.log(state.profileFollowings)

      if (action.payload.sessionUser) {
        if (action.payload.page === 1) {
          state.userFollowings = action.payload.data
        }
        else {
          state.userFollowings = [
            ...state.userFollowings,
            ...action.payload.data,
          ];
        }
        state.userFollowingsCount = action.payload.info.count;
      }
      else if (action.payload.owner === state.userFollowingsOwner) {
        state.profileFollowings = [
          ...state.profileFollowings,
          ...action.payload.data,
        ];
        state.profileFollowingsCount = action.payload.info.count;
      } else {
        state.profileFollowingsCount = action.payload.info.count;
        state.profileFollowings = action.payload.data;
      }
      state.userFollowingsOwner = action.payload.owner;
      state.userFollowingsPage = action.payload.page;

      const isFollowingsFollowings = _.reject(action.payload.data, (person) =>
        _.isNil(person.isFollowing)
      );
      const isFollowingFollowingIds = _.map(
        isFollowingsFollowings,
        'followingUser'
      );
      state.isFollowings = [...state.isFollowings, ...isFollowingFollowingIds];
    },

    getSubscriptionsRequest(state) {
      state.subscriptionsLoading = true
    },
    getSubscriptionsSuccess(state, action) {
      try {
        state.subscriptionsLoading = false
        state.subscriptions = action.payload.data
      } catch (error) {
        console.log(error)
      }

    },
    getSubscriptionsFailure(state, action) {
      state.subscriptionsLoading = false
      state.error = action.payload

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
