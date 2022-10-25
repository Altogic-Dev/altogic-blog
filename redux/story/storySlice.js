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
  userStories: [],
  userStoriesInfo: null,
  userDraftStories: null,
  userDraftStoriesInfo: null,
  publicationsStories: [],
  isLoading: false,
  replyLoading: false,
  deletingIsLoading: false,
  replies: [],
  replyCount: 0,
  replyPageSize: null,
  featureStories: {},
  userStoriesOwner: null,
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
      state.userDraftStoriesInfo = {
        ...state.userDraftStoriesInfo,
        count: state.userDraftStoriesInfo.count + 1,
      };
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
      state.replies = action.payload.result;
      state.replyCount = action.payload.countInfo.count;
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
      state.replyLoading = true;
    },
    editReplySuccess(state, action) {
      state.replies = state.replies.map((reply) => {
        if (reply._id === action.payload._id) {
          return action.payload;
        }
        return reply;
      });
      state.replyLoading = false;
    },
    editReplyFailure(state, action) {
      state.error = action.payload;
      state.replyLoading = false;
    },
    removeReplyRequest(state) {
      state.deletingIsLoading = true;
    },
    removeReplySuccess(state, action) {
      state.replies = state.replies.filter(
        (reply) => reply._id !== action.payload._id
      );
      state.replyCount -= 1;
      state.deletingIsLoading = false;
      state.replyLoading = false;
    },
    removeReplyFailure(state, action) {
      state.error = action.payload;
      state.deletingIsLoading = false;
    },
    createReplyCommentRequest(state) {
      state.replyLoading = true;
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
      state.replyLoading = false;
    },
    createReplyCommentFailure(state, action) {
      state.story = null;
      state.error = action.payload;
      state.replyLoading = false;
    },
    getReplyCommentsRequest(state) {
      state.replyLoading = true;
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
      state.replyLoading = false;
    },
    getReplyCommentsFailure(state, action) {
      state.error = action.payload;
      state.replyLoading = false;
    },
    updateStoryRequest(state) {
      state.isLoading = true;
    },
    updateStoryWorkerRequest(state) {
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
      state.userStoriesOwner = null;
    },

    getUserStoriesRequestNextPage(state) {
      state.isLoading = true;
    },
    getUserStoriesSuccess(state, action) {
      if (state.userStoriesOwner === action.payload.owner) {
        state.userStories = [...state.userStories, ...action.payload.data];
      } else {
        state.userStories = action.payload.data;
      }
      state.userStoriesOwner = action.payload.owner;
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
      toast.success('Story updated successfully', { hideProgressBar: true });
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
      toast.success('Story updated successfully', { hideProgressBar: true });
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
      state.userDraftStoriesInfo = {
        ...state.userDraftStoriesInfo,
        count: state.userDraftStoriesInfo.count - 1,
      };
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
    removeRecommendedStories(state, action) {
      state.recommendedStories = action.payload;
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
