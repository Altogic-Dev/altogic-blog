import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  followingStories: null,
  followingStoriesInfo: null,
  recommendedStories: null,
  recommendedStoriesInfo: null,
  popularStories: null,
  story: null,
  moreUserStories: null,
  userStories: null,
  userStoriesInfo: null,
  userDraftStories: null,
  userDraftStoriesInfo: null,
  publicationsStories: [],
  isLoading: false,
  commentIsLoading: false,
  replies: [],
  replyCount: 0,
  replyPageSize: null,
  featureStories: {},
};

// Actual Slice
export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    // Action to set the authentication status
    getFollowingStoriesRequest(state) {
      state.isLoading = true;
    },
    getFollowingStoriesSuccess(state, action) {
      state.isLoading = false;
      if (_.isArray(state.followingStories)) {
        state.followingStories = [
          ...state.followingStories,
          ...action.payload.data,
        ];
      } else {
        state.followingStories = action.payload.data;
      }
      state.followingStoriesInfo = action.payload.info;
    },
    getRecommendedStoriesRequest(state) {
      state.isLoading = true;
    },
    getRecommendedStoriesSuccess(state, action) {
      state.isLoading = false;
      if (_.isArray(state.recommendedStories)) {
        state.recommendedStories = [
          ...state.recommendedStories,
          ...action.payload.data,
        ];
      } else {
        state.recommendedStories = action.payload.data;
      }
      state.recommendedStoriesInfo = action.payload.info;
    },

    getStoryRequest(state) {
      state.isLoading = true;
    },
    getStorySuccess(state, action) {
      state.story = action.payload;
      state.isLoading = false;
    },
    createStoryRequest(state) {
      state.isLoading = true;
    },
    createStorySuccess(state, action) {
      state.story = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    createStoryFailure(state, action) {
      state.story = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    getStoryRepliesRequest(state) {
      state.isLoading = true;
    },
    getStoryRepliesSuccess(state, action) {
      state.replies = action.payload.data;
      state.replyCount = action.payload.info.count;
      state.isLoading = false;
    },
    getStoryRepliesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createReplyRequest(state) {
      state.isLoading = true;
    },
    createReplySuccess(state, action) {
      state.replies = [action.payload, ...state.replies];
      state.replyCount += 1;
      state.isLoading = false;
    },
    createReplyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    editReplyRequest(state) {
      state.isLoading = true;
    },
    editReplySuccess(state, action) {
      state.replies = [action.payload, ...state.replies];
      state.replyCount += 1;
      state.isLoading = false;
    },
    editReplyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeReplyRequest(state) {
      state.isLoading = true;
    },
    removeReplySuccess(state, action) {
      state.replies = [action.payload, ...state.replies];
      state.replyCount -= 1;
      state.isLoading = false;
    },
    removeReplyFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createReplyCommentRequest(state) {
      state.commentIsLoading = true;
    },
    createReplyCommentSuccess(state, action) {
      state.replies = state.replies.map((reply) => {
        const temp = reply;
        if (reply._id === action.payload.reply) {
          temp.commentCount += 1;
          if (reply.comments) {
            temp.comments.push(action.payload);
            return temp;
          }
          temp.comments = [action.payload];
        }
        return temp;
      });
      state.commentIsLoading = false;
    },
    createReplyCommentFailure(state, action) {
      state.story = null;
      state.error = action.payload;
      state.commentIsLoading = false;
    },
    getReplyCommentsRequest(state) {
      state.commentIsLoading = true;
    },
    getReplyCommentsSuccess(state, action) {
      state.replies = state.replies.map((reply) => {
        if (reply._id === action.payload[0].reply) {
          return {
            ...reply,
            comments: action.payload,
          };
        }
        return reply;
      });
      state.commentIsLoading = false;
    },
    getReplyCommentsFailure(state, action) {
      state.error = action.payload;
      state.commentIsLoading = false;
    },
    updateStoryRequest(state) {
      state.isLoading = true;
    },
    updateStorySuccess(state, action) {
      state.story = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    updateStoryFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getStoryBySlugRequest(state) {
      state.isLoading = true;
    },
    getStoryBySlugSuccess(state, action) {
      state.isLoading = false;
      state.story = action.payload;
    },

    getMoreUserStoriesRequest(state) {
      state.isLoading = true;
    },
    getMoreUserStoriesSuccess(state, action) {
      state.isLoading = false;
      state.moreUserStories = action.payload;
    },

    getUserStoriesRequest(state) {
      state.isLoading = true;
    },
    getUserStoriesSuccess(state, action) {
      if (_.isArray(state.userStories)) {
        state.userStories = [
          ...state.userStories.filter((s) => s.user === action.payload.userId),
          ...action.payload.data,
        ];
      } else {
        state.userStories = action.payload.data;
      }
      state.userStoriesInfo = action.payload.info;
      state.isLoading = false;
    },

    getUserDraftStoriesRequest(state) {
      state.isLoading = true;
    },
    getUserDraftStoriesSuccess(state, action) {
      state.isLoading = false;
      if (_.isArray(state.userDraftStories)) {
        state.userDraftStories = [
          ...state.userDraftStories,
          ...action.payload.data,
        ];
      } else {
        state.userDraftStories = action.payload.data;
      }
      state.userDraftStoriesInfo = action.payload.info;
    },

    deleteStoryRequest(state) {
      state.isLoading = true;
    },
    deleteStorySuccess(state, action) {
      state.isLoading = false;
      if (action.payload.isPublished) {
        state.userStories = _.reject(
          state.userStories,
          (story) => story._id === action.payload.storyId
        );
        state.userStoriesInfo.count -= 1;
      } else {
        state.userDraftStories = _.reject(
          state.userDraftStories,
          (story) => story._id === action.payload.storyId
        );
        state.userDraftStoriesInfo.count -= 1;
      }
    },

    updateCategoryNamesRequest(state) {
      state.isLoading = true;
    },
    updateCategoryNamesSuccess(state, action) {
      toast.success('Story updated successfully');
      state.isLoading = false;
      state.story = {
        ...state.story,
        categoryNames: action.payload,
      };
    },

    updateStoryFieldRequest(state) {
      state.isLoading = true;
    },
    updateStoryFieldSuccess(state, action) {
      toast.success('Story updated successfully');
      state.isLoading = false;
      state.story = action.payload;
    },
    cacheStoryRequest() {},

    getCacheStoryRequest(state) {
      state.isLoading = true;
    },
    getCacheStorySuccess(state, action) {
      state.isLoading = false;
      state.story = action.payload;
    },

    publishStoryRequest(state) {
      state.isLoading = true;
    },
    publishStorySuccess(state, action) {
      state.story = action.payload;
      state.isLoading = false;
    },
    publishStoryFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearStory(state) {
      state.story = null;
    },
    popularStoriesRequest(state) {
      state.isLoading = true;
    },
    popularStoriesSuccess(state, action) {
      state.isLoading = false;
      state.popularStories = action.payload;
    },
    popularStoriesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPublicationsStoriesRequest(state) {
      state.isLoading = true;
    },
    getPublicationsStoriesSuccess(state, action) {
      state.isLoading = false;
      state.publicationsStories = action.payload;
    },
    getPublicationsStoriesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPublicationsStoriesByTopicRequest(state) {
      state.isLoading = true;
    },
    getPublicationsStoriesByTopicSuccess(state, action) {
      state.isLoading = false;
      state.publicationsStories[action.payload.sectionIndex] =
        action.payload.data;
    },
    getPublicationsStoriesByTopicFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    selectFeatureStoriesRequest(state) {
      state.isLoading = true;
    },
    selectFeatureStoriesSuccess(state, action) {
      state.featureStories = action.payload;
    },
    selectFeatureStoriesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    visitStoryRequest() {},
    visitStorySuccess() {},
    visitStoryFailure() {},

    removeUnfollowingStories(state, action) {
      state.followingStories = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.story,
      }),
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
