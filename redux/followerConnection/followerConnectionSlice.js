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
  myFollowings: [],
  followingsData: {},
  followersData: {},
  followingStoriesLoading: false,
  followingActionResult: null,
  isLoading: false,
  followingUserLoading: false,

  isUnfollowed: false,
};

// Actual Slice
export const followerConnectionSlice = createSlice({
  name: 'followerConnection',
  initialState,
  reducers: {
    // Action to set the authentication status
    unfollowRequest(state) {
      state.isUnfollowed = false
      state.followingUserLoading = true;
    },
    unfollowSuccess(state, action) {
      state.isUnfollowed = true

      if (!_.isEmpty(state.myFollowings)) {
        state.myFollowings = _.filter(state.myFollowings, following => !(following.followingUser === action.payload.personId || following.followingUser === action.payload.personId))

      }
      if (!_.isNil(_.get(state.followingsData[action.payload.sessionUsername], 'userFollowings'))) {
        state.followingsData[action.payload.sessionUsername].userFollowings = _.filter(state.followingsData[action.payload.sessionUsername].userFollowings, (following) => !(following._id === action.payload.personId || following.followingUser === action.payload.personId))
        state.followingsData[action.payload.sessionUsername].count -= 1
      }

      if (!_.isNil(_.get(state.followersData[action.payload.followingUsername], 'userFollowers'))) {
        state.followersData[action.payload.followingUsername].userFollowers = _.filter(state.followingsData[action.payload.followingUsername].userFollowers, follower => follower.followerUsername !== action.payload.sessionUsername)
        state.followersData[action.payload.followingUsername].count -= 1
      }
      state.followingUserLoading = false;

    },
    unfollowFailure(state, action) {
      state.followingUserLoading = false;
      state.error = action.payload;
    },
    handleFollowingCount(state, action) {

      state.followersData[action.payload.username].count += action.payload;
    },
    followRequest(state) {
      state.followingUserLoading = true;
    },
    followSuccess(state, action) {

      const newFollowing = {
        followingUser: action.payload.followingUser.followingUser,
        followingUsername: action.payload.followingUser.followingUsername
      }
      state.myFollowings.push(newFollowing)
      if (!_.isNil(_.get(state.followingsData[action.payload.followerUser.username], 'userFollowings'))) {
        state.followingsData[action.payload.followerUser.username].userFollowings = [...(_.get(state.followingsData[action.payload.followerUser.username], 'userFollowings') || []), action.payload.followingUser]
        state.followingsData[action.payload.followerUser.username].count += 1
      }
      if (!_.isNil(_.get(state.followersData[action.payload.followingUser], 'userFollowers'))) {
        state.followersData[action.payload.followingUser].userFollowers = [...state.followersData[action.payload.followingUser].userFollowers, action.payload.followingUser]
        state.followersData[action.payload.followingUser].count += 1
      }

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

    getFollowerUsersRequest(state) {
      state.isLoading = true;

    },
    getFollowerUsersSuccess(state, action) {
      state.followersData[action.payload.username] = {
        userFollowers: action.payload.page === 1 ? action.payload.data : [...(_.get(state.followersData, `${action.payload.username}.userFollowers`) ?? []), ...action.payload.data],
        count: action.payload.count,
        totalPages: action.payload.info.totalPages,
        page: action.payload.page
      }
      state.isLoading = false;

    },

    getFollowingUsersRequest(state) {
      state.isLoading = true;
    },
    getFollowingUsersSuccess(state, action) {

      try {
        state.followingsData[action.payload.username] = {
          userFollowings: [...(_.get(state.followingsData, `${action.payload.username}.userFollowings`) ?? []), ...action.payload.data],
          count: action.payload.info.count,
          totalPages: action.payload.info.totalPages,
          page: action.payload.page
        }
        state.followingsData[action.payload.username].userFollowings = _.uniqBy(state.followingsData[action.payload.username].userFollowings, item => item.followingUser);
        if (action.payload.sessionUser) {

          state.myFollowings = [...state.myFollowings, ...action.payload.data]
        }
        else {
          action.payload.data.forEach(item => {
            if (item.isFollowing) {
              const followingUser = {
                followingUser: item.followingUser,
                followingUsername: item.followingUsername
              }
              state.myFollowings.push(followingUser)
            }
          })
        }
        state.isUnfollowed = false

        state.isLoading = false

      } catch (error) {
        console.log(error)
      }
    },


    setIsFollowing(state, action) {
      const { followingUser, followerUser } = action.payload
      state.myFollowings = [...state.myFollowings, { followingUser, followerUser }]
      state.isLoading = false
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
