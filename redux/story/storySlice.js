import ToastMessage from '@/utils/toast';
import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  likedStories: [],
  replyIsLiked: false,
  followingStories: null,
  followingStoriesInfo: null,
  recommendedStories: null,
  recommendedStoriesInfo: null,
  popularStories: null,
  story: null,
  moreUserStories: null,
  userStories: [],
  userStoriesInfo: null,
  userStoriesLoading: false,
  userDraftStories: null,
  userDraftStoriesInfo: null,
  publicationsStories: [],
  isLoading: false,
  publishLoading: false,
  replyLoading: false,
  deletingIsLoading: false,
  replies: [],
  replyCount: 0,
  replyPageSize: null,
  featureStories: {},
  userStoriesOwner: null,
  userFollows: false,
  error: null,
  mutedUsers: [],
  likeLoading: false,
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

      try {
        const filteredList = action.payload.data.filter(story => !state.mutedUsers.some(user => user.blockedUser === story.user))

        state.isLoading = false;
        if (_.isArray(state.followingStories) && action.payload.page !== 1) {
          state.followingStories = [
            ...state.followingStories,
            ...filteredList,
          ];
        } else {
          state.followingStories = filteredList;
        }
        state.followingStoriesInfo = action.payload.info;
      } catch (error) {
        console.log(error)
      }
    },
    getRecommendedStoriesRequest(state) {
      state.isLoading = true;
    },

    resetStories(state, action) {
      state.recommendedStories = null;
      state.followingStories = null;
      state.mutedUsers = state.mutedUsers.filter(user => user.blockedUser !== action.payload)
    },
    getRecommendedStoriesSuccess(state, action) {

      const filteredList = action.payload.data.filter(story => !state.mutedUsers.some(user => user.blockedUser === story.user))
      state.isLoading = false;
      if (_.isArray(state.recommendedStories)) {
        state.recommendedStories = [
          ...state.recommendedStories,
          ...filteredList,
        ];
      } else {
        state.recommendedStories = filteredList;
      }
      state.recommendedStoriesInfo = action.payload.info;
    },

    getStoryRequest(state) {
      state.story = null;
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
      try {
        state.story = action.payload;
        state.error = null;
        state.isLoading = false;
        if (!_.isNil(state.userDraftStoriesInfo)) {
          state.userDraftStoriesInfo = {
            ...state.userDraftStoriesInfo,
            count: state.userDraftStoriesInfo.count + 1,
          };
          state.userDraftStories = _.orderBy(
            [...state.userDraftStories, action.payload],
            ['pinnedStory', 'createdAt'],
            ['desc', 'desc'])
        }
      } catch (error) {
        console.log(error)
      }

    },
    createStoryFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getStoryRepliesRequest(state) {
      state.isLoading = true;
    },
    getStoryRepliesSuccess(state, action) {
      state.isLoading = false;
      state.replies = action.payload.result;
      state.replyCount = action.payload.countInfo.count;
    },
    getStoryRepliesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createReplyRequest(state) {
      state.isLoading = true;
    },
    createReplySuccess(state, action) {
      state.replies = [...state.replies, action.payload];
      state.story.commentCount += 1;
      state.isLoading = false;
    },
    createReplyFailure(state, action) {
      ToastMessage.error("This story doesn't exist any longer");
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
      state.story.commentCount -= 1;
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
        if (reply._id === action.payload[0]?.reply) {
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
      state.isLoading = false;
      if (_.some(current(state.userStories), (item => item._id === action.payload._id))) {
        /// userStoriesCount--
        if (_.isArray(state.userStories)) {
          state.userStories = _.filter(state.userStories,
            (story) => story._id !== action.payload._id
          );

          state.userStoriesInfo = {
            ...state.userStoriesInfo,
            count: state.userStoriesInfo.count - 1,
          };
        }

        /// userDraftStoriesState Update
        if (_.isArray(state.userDraftStories)) {
          state.userDraftStoriesInfo = {
            ...state.userDraftStoriesInfo,
            count: state.userDraftStoriesInfo.count + 1,
          };


        }
      }
      if (!_.isEmpty(state.userDraftStories)) {
        state.userDraftStories = _.orderBy(
          [...(state.userDraftStories.filter(item => item._id !== action.payload._id)), action.payload],
          ['pinnedStory', 'createdAt'],
          ['desc', 'desc']
        );
      }
      state.story = action.payload;
      state.error = null;

    },
    updateStoryFailure(state, action) {
      state.isLoading = false;

      state.error = action.payload;
    },

    getStoryBySlugRequest(state) {
      state.isLoading = true;
      state.userFollows = false
      state.error = null;
    },
    getStoryBySlugSuccess(state, action) {
      state.userFollows = !!action.payload.userFollows.length
      state.isLoading = false;
      state.story = action.payload.story;
    },
    getStoryBySlugFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload
    },

    getMoreUserStoriesRequest(state) {
      state.isLoading = true;
    },
    getMoreUserStoriesSuccess(state, action) {
      state.isLoading = false;
      state.moreUserStories = action.payload;
    },

    getUserStoriesRequest(state) {
      state.userStoriesLoading = true;
      state.userStoriesOwner = null;
    },

    getUserStoriesRequestNextPage(state) {
      state.userStoriesLoading = true;
    },
    getUserStoriesSuccess(state, action) {
      if (state.userStoriesOwner === action.payload.owner) {
        state.userStories =
          _.orderBy(
            [...state.userStories, ...action.payload.data],
            ['pinnedStory', 'createdAt'],
            ['desc', 'desc'])

      } else {
        state.userStories = action.payload.data;
      }
      state.userStoriesOwner = action.payload.owner;
      state.userStoriesInfo = action.payload.info;
      state.userStoriesLoading = false;

    },


    getUserStoriesFailure(state) {
      state.userStoriesLoading = false;
    },

    getUserDraftStoriesRequest(state) {
      state.userStoriesLoading = true;
    },
    getUserDraftStoriesSuccess(state, action) {
      state.userStoriesLoading = false;
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

    getUserDraftStoriesFailure(state) {
      state.userStoriesLoading = false;
    },

    deleteStoryRequest(state) {
      state.isLoading = true;
    },
    deleteStorySuccess(state, action) {

      if (action.payload.isPublished && _.size(state.userStories)) {
        state.userStories = _.reject(
          state.userStories,
          (story) => story._id === action.payload.storyId
        );
        if (_.get(state.userStoriesInfo, 'count'))
          state.userStoriesInfo.count -= 1;
      } else if (_.size(state.userDraftStories)) {
        state.userDraftStories = _.reject(
          state.userDraftStories,
          (story) => story._id === action.payload.storyId
        );
        state.userDraftStoriesInfo.count -= 1;
      }
      state.isLoading = false;
    },

    updateCategoryNamesRequest(state) {
      state.isLoading = true;
    },
    updateCategoryNamesSuccess(state, action) {
      try {
        if (_.some(state.userStories, story => story._id === action.payload.storyId)) {
          const index = _.findIndex(state.userStories, story => story._id === action.payload.storyId)
          state.userStories[index].categoryNames = action.payload.newCategoryNames
        }
        else if (_.some(state.userDraftStories, story => story._id === action.payload.storyId)) {
          const index = _.findIndex(state.userDraftStories, story => story._id === action.payload.storyId)
          state.userDraftStories[index].categoryNames = action.payload.newCategoryNames
        }
        ToastMessage.success('Story updated successfully', { hideProgressBar: true });
        state.isLoading = false;
        if (state.story) {
          state.story = {
            ...state.story,
            categoryNames: action.payload.newCategoryNames,
          };
        }
      } catch (error) {
        console.log(error)
      }
    },

    updateStoryFieldRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateStoryFieldSuccess(state, action) {
      ToastMessage.success('Story updated successfully');


      if (state.story?.isPublished) {
        if (!_.isNil(state.userStories)) {
          state.userStories = _.orderBy(
            _.map(state.userStories, (story) =>
              story._id === action.payload._id ? action.payload : story
            ),
            ['pinnedStory', 'createdAt'],
            ['desc', 'desc'])
        }
      } else if (!_.isNil(state.userDraftStories)) {
        state.userDraftStories = _.orderBy(_.map(state.userDraftStories, (story) =>
          story._id === action.payload._id ? action.payload : story
        ), ['pinnedStory', 'createdAt'],
          ['desc', 'desc'])
      }

      state.isLoading = false;
      state.story = action.payload;
    },
    updateStoryFieldFailure(state, action) {
      state.isLoading = false;
      state.error = _.first(action.payload.items)
    },

    publishStoryRequest(state) {
      state.publishLoading = true;
    },
    publishStorySuccess(state, action) {
      state.story = action.payload;
      state.publishLoading = false;
      if (!_.isNil(state.userStoriesInfo)) {
        state.userStoriesInfo = {
          ...state.userStoriesInfo,
          count: state.userStoriesInfo.count + 1,
        };
        state.userDraftStoriesInfo = {
          ...state.userDraftStoriesInfo,
          count: state.userDraftStoriesInfo.count - 1,
        };
        state.userStories = _.orderBy(
          [...state.userStories, action.payload],
          ['pinnedStory', 'createdAt'],
          ['desc', 'desc']
        );
        state.userDraftStories = state.userDraftStories.filter(
          (story) => story._id !== action.payload._id
        );
      }
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
    visitStoryRequest() { },
    visitStorySuccess() { },
    visitStoryFailure() { },

    removeUnfollowingStories(state, action) {
      state.followingStories = action.payload;
    },
    removeRecommendedStories(state, action) {
      state.recommendedStories = action.payload;
    },
    updateUserFromStories(state, action) {
      if (!_.isNil(state.userDraftStories)) {
        state.userDraftStories = _.map(state.userDraftStories, (story) =>
          story.user === action.payload._id
            ? {
              ...story,
              username: action.payload.username,
              userProfilePicture: action.payload.profilePicture,
            }
            : story
        );
      }
      if (!_.isNil(state.userStories)) {
        state.userStories = _.map(state.userStories, (story) =>
          story.user === action.payload._id
            ? {
              ...story,
              username: action.payload.username,
              userProfilePicture: action.payload.profilePicture,
            }
            : story
        );
      }
      if (state.story?.user?._id === action.payload._id) {
        state.story = {
          ...state.story,
          username: action.payload.username,
          userProfilePicture: action.payload.profilePicture,
          user: action.payload,
        };
      }
    },

    likeStoryRequest(state) {

      state.likeLoading = true
    },
    likeStorySuccess(state, action) {
      try {

        state.likedStories = [...state.likedStories, action.payload];
        state.likeLoading = false
      } catch (error) {
        console.log(error)
      }

    },
    likeStoryFailure(state) {
      ToastMessage.error("This story doesn't exist any longer");
      state.likeLoading = false


    },
    unlikeStoryRequest(state) {
      state.likeLoading = true
    },
    unlikeStorySuccess(state, action) {

      state.likedStories = state.likedStories.filter(like => like !== action.payload)
      state.likeLoading = false
    },

    isLikedStoryRequest() { },
    isLikedStorySuccess(state, action) {
      state.likedStories = [...state.likedStories, action.payload];
    },

    likeReplyRequest(state) {
      state.likeLoading = true
    },
    likeReplySuccess(state, action) {
      try {
        state.replies = state.replies.map(reply => {
          if (reply._id === action.payload.reply) {
            const temp = { ...reply }
            temp.likeCount += 1
            temp.reply_likes = true
            return temp
          }
          return reply
        })
      } catch (error) {
        console.log(error)
      }
      state.replyIsLiked = true
      state.likeLoading = false

    },
    likeReplyFailure(state) {
      state.likeLoading = false

    },
    unlikeReplyRequest(state) {
      state.replyIsLiked = true
      state.likeLoading = true

    }
    ,
    unlikeReplySuccess(state, action) {
      try {
        state.replies = state.replies.map(reply => {
          if (reply._id === action.payload.ids.id) {
            const temp = { ...reply }
            temp.likeCount -= 1
            temp.reply_likes = false
            return temp
          }
          return reply
        })
        state.replyIsLiked = true
      } catch (error) {
        console.log(error)
      }
      state.likeLoading = false

    },
    unlikeReplyFailure(state) {
      state.replyIsLiked = true
      state.likeLoading = false

    },

    getMutedUsersRequest() {

    },
    getMutedUsersSuccess(state, action) {
      state.mutedUsers = action.payload

    },
    getMutedUsersFailure() {

    },
    followUserFromStoryRequest(state) {
      state.story.user.followerCount += 1;
    },
    unfollowUserFromStoryRequest(state) {
      state.story.user.followerCount -= 1;
    },
    putStory(state, action) {
      state.story = action.payload;
    },
    putStoryRequest(state, action) {
      state.story = action.payload;
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
