import _ from 'lodash';
import { call, takeEvery, put, all, select, fork } from 'redux-saga/effects';
import TopicsService from '@/services/topics';
import StoryService from '@/services/story';
import { storyActions } from './storySlice';
import { deleteStorySuccess } from '../bookmarks/bookmarkSlice';
import { deleteTopicWritersSaga, insertTopicsSaga } from '../topics/topicsSaga';

function* getFollowingStoriesSaga({ payload: { userId, page } }) {
  try {
    const info = yield select((state) => state.story.followingStoriesInfo);

    if (_.isNil(info) || page <= info.totalPages) {
      const { data, errors } = yield call(
        StoryService.getFollowingStories,
        userId,
        page
      );
      if (!_.isNil(data) && _.isNil(errors)) {
        yield put(
          storyActions.getFollowingStoriesSuccess({
            data: data.data,
            info: data.info,
          })
        );
      }
    }
  } catch (e) {
    console.error({ e });
  }
}
function* getStoryReplies({ payload: { story, page, limit, userId } }) {
  try {
    const { data, errors } = yield call(
      StoryService.getStoryReplies,
      story,
      page,
      limit,
      userId
    );
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.getStoryRepliesSuccess(data));
    }
  } catch (e) {
    yield put(storyActions.getStoryRepliesFailure(e));
  }
}

function* removeReply({ payload: reply }) {
  try {
    const { data, errors } = yield call(StoryService.removeReply, reply);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.removeReplySuccess(reply));
    }
  } catch (e) {
    yield put(storyActions.removeReplyFailure(e));
  }
}
function* editReply({ payload: reply }) {
  try {
    const { data, errors } = yield call(StoryService.editReply, reply);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.editReplySuccess(reply));
    }
  } catch (e) {
    yield put(storyActions.editReplyFailure(e));
  }
}
function* createReply({ payload: reply }) {
  try {
    const { data, errors } = yield call(StoryService.createReply, reply);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.createReplySuccess(data));
    }
  } catch (e) {
    yield put(storyActions.createReplyFailure(e));
  }
}

function* getReplyComments({ payload: reply }) {
  try {
    const { data, errors } = yield call(StoryService.getReplyComments, reply);
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.getReplyCommentsSuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(storyActions.getReplyCommentsFailure(e));
  }
}

function* createReplyComment({ payload: comment }) {
  try {
    const { data, errors } = yield call(
      StoryService.createReplyComment,
      comment
    );
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.createReplyCommentSuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(storyActions.createReplyCommentFailure(e));
  }
}
function* getRecommendedStoriesSaga({ payload: { page } }) {
  try {
    const user = yield select((state) => state.auth.user);
    const info = yield select((state) => state.story.recommendedStoriesInfo);

    if (_.isNil(info) || page <= info.totalPages) {
      if (!_.isNil(user) && !_.isEmpty(user.recommendedTopics)) {
        const { data, errors } = yield call(
          StoryService.GetRecommendedStoriesByUser,
          {
            recommendedTopics: user.recommendedTopics,
            page,
          }
        );
        if (!_.isNil(data) && _.isNil(errors)) {
          yield put(
            storyActions.getRecommendedStoriesSuccess({
              data: data.data,
              info: data.info,
            })
          );
        }
      } else {
        const { data, errors } = yield call(
          StoryService.getRecommendedStories,
          user?._id,
          page
        );
        if (!_.isNil(data) && _.isNil(errors)) {
          yield put(
            storyActions.getRecommendedStoriesSuccess({
              data: data.data,
              info: data.info,
            })
          );
        }
      }
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getStorySaga({ payload: id }) {
  try {
    const { data, errors } = yield call(StoryService.getStory, id);
    if (!_.isNil(data) && _.isNil(errors)) {
      yield put(storyActions.getStorySuccess(_.first(data)));
    }
  } catch (e) {
    console.error({ e });
  }
}

// export function* updateFollowerCountSaga(isIncrease) {
//   const story = yield select((state) => state.story.story);
//   if (isIncrease) {
//     yield put(
//       storyActions.getStorySuccess({
//         ...story,
//         user: {
//           ...story.user,
//           followerCount: story.user.followerCount + 1,
//         },
//       })
//     );
//   } else {
//     yield put(
//       storyActions.getStorySuccess({
//         ...story,
//         user: {
//           ...story.user,
//           followerCount: story.user.followerCount - 1,
//         },
//       })
//     );
//   }
// }

function* getStoryBySlugSaga({ payload: { storySlug, userId } }) {
  try {

    if (!_.isNil(userId)) {
      const { data, errors } = yield call(
        StoryService.getStoryBySlug,
        storySlug,
        userId
      );
      if (errors) throw errors;
      if (data.story) {
        if (userId === data.story.user._id) {
          yield put(storyActions.getStoryBySlugSuccess(data));
        } else if (data.story.isPublished && !data.story.isPrivate && !data.story.isDeleted) {
          yield put(storyActions.getStoryBySlugSuccess(data));
        } else {
          throw new Error('This user cannot see the story');
        }
      }
    } else {
      const { data, errors } = yield call(
        StoryService.getStoryBySlug,
        storySlug,
      );
      if (errors) throw errors;
      if (data.story && data.story.isPublished && !data.story.isPrivate && !data.story.isDeleted) {
        yield put(storyActions.getStoryBySlugSuccess(data));
      } else {
        throw new Error('This user cannot see the story');
      }
    }
  } catch (e) {
    console.error(e);

    yield put(storyActions.getStoryBySlugFailure(e));
  }
}

function* getMoreUserStoriesSaga({
  payload: { authorId, storyId, publicationId, page },
}) {
  try {
    const { data, errors } = yield call(
      StoryService.getMoreUserStories,
      authorId,
      storyId,
      publicationId,
      page
    );
    if (!_.isNil(data) && _.isNil(errors)) {
      yield put(storyActions.getMoreUserStoriesSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}

export function* updateStoryLikeCountSaga(isIncrease) {
  const story = yield select((state) => state.story.story);
  if (isIncrease) {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        likeCount: story.likeCount + 1,
      })
    );
  } else {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        likeCount: story.likeCount - 1,
      })
    );
  }
}

function* getUserStoriesSaga({ payload: { userId, page, limit } }) {
  try {
    let userID = userId;
    if (!userID) {
      userID = yield select((state) => _.get(state.auth.user, '_id'));
    }

    const { data, errors } = yield call(
      StoryService.getUserStories,
      userID,
      page,
      limit
    );
    if (errors) throw errors;
    if (data) {
      yield put(
        storyActions.getUserStoriesSuccess({
          data: data.result,
          info: data.countInfo,
          owner: userID,
        })
      );
    }
  } catch (e) {
    yield put(
      storyActions.getUserStoriesFailure(e)
    );
  }
}

function* getUserDraftStoriesSaga({ payload: { userId, page, limit } }) {
  try {
    let userID = userId;
    if (!userID) {
      userID = yield select((state) => _.get(state.auth.user, '_id'));
    }

    const { data, errors } = yield call(
      StoryService.getUserDraftStories,
      userID,
      page,
      limit
    );
    if (errors) throw errors;
    if (data) {
      yield put(
        storyActions.getUserDraftStoriesSuccess({
          data: data.data,
          info: data.info,
        })
      );
    }
  } catch (e) {
    yield put(
      storyActions.getUserDraftStoriesFailure(e)
    );
  }
}

function* deleteStorySaga({
  payload: { storyId, isPublished, categoryNames, onSuccess },
}) {
  try {
    const user = yield select(state => state.auth.user)
    const { errors } = yield call(StoryService.deleteStory, storyId);
    if (errors) throw errors;

    if (!_.isEmpty(categoryNames)) {
      yield fork(deleteTopicWritersSaga, storyId);
    }

    yield put(storyActions.deleteStorySuccess({ storyId, isPublished, username: user?.username }));
    yield put(deleteStorySuccess({ storyId, isPublished, username: user?.username }));
    if (_.isFunction(onSuccess)) onSuccess();
  } catch (e) {
    console.error({ e });
  }
}

function* updateCategoryNamesSaga({ payload: { storyId, newCategoryNames } }) {
  try {
    const { errors } = yield call(
      StoryService.updateCategory,
      storyId,
      newCategoryNames
    );
    yield call(
      TopicsService.insertTopics,
      newCategoryNames.map(item => {
        const topic = { name: item }
        return topic
      }));


    if (errors) throw errors;
    yield put(storyActions.updateCategoryNamesSuccess({ newCategoryNames, storyId }));
  } catch (e) {
    console.error({ e });
  }
}

function* updateStoryFieldSaga({ payload: { story, newStoryField } }) {
  try {
    const newStory = {
      ...story,
      ...newStoryField,
    };

    const { errors } = yield call(StoryService.updateStory, newStory);
    if (errors) throw errors;
    yield put(storyActions.updateStoryFieldSuccess(newStory));
  } catch (e) {
    yield put(storyActions.updateStoryFieldFailure(e));

  }
}

function* createStorySaga({ payload }) {
  try {
    const { data, errors } = yield call(StoryService.createStory, payload);
    if (!_.isNil(data)) {
      yield put(storyActions.createStorySuccess(data));
    }
    if (!_.isNil(errors)) {
      throw errors.items;
    }
  } catch (e) {
    yield put(storyActions.createStoryFailure(e));
  }
}
function* updateStorySaga({ payload: { story, onSuccess } }) {
  try {
    const { data, errors } = yield call(StoryService.updateStory, story);
    if (!_.isNil(data)) {
      yield put(storyActions.updateStorySuccess(data));
      if (_.isFunction(onSuccess)) onSuccess();
    }
    if (!_.isNil(errors)) {
      throw errors.items;
    }
  } catch (e) {
    yield put(storyActions.updateStoryFailure(e));
  }
}


function* publishStorySaga({
  payload: { story, isEdited, onSuccess, categoryPairs, selectedPublication },
}) {
  try {
    const operation = isEdited
      ? StoryService.updateStory
      : StoryService.publishStory;

    const { data, errors } = yield call(operation, story);
    if (!_.isNil(errors)) throw errors.items;
    const user = yield select((state) => state.auth.user);
    const publishedStory = {
      ...data,
      user,
    };
    if (selectedPublication)
      publishedStory.publication = selectedPublication
    yield put(storyActions.publishStorySuccess(data));
    if (!_.isEmpty(story.categoryNames)) {


      yield call(StoryService.updateCategoryPairs, categoryPairs)
      yield fork(insertTopicsSaga, story, story.categoryNames.map(item => {
        const topic = { name: item }
        return topic
      }));
    }
    if (_.isFunction(onSuccess)) onSuccess();

  } catch (e) {
    yield put(storyActions.publishStoryFailure(e));
  }
}
function* popularStoriesSaga() {
  try {
    const { data, errors } = yield call(StoryService.getPopularStories);
    if (!_.isNil(errors)) throw errors.items;

    if (!_.isNil(data)) {
      yield put(storyActions.popularStoriesSuccess(data));
    }
  } catch (e) {
    yield put(storyActions.popularStoriesFailure(e));
  }
}
function* getPublicationsStoriesSaga({ payload }) {
  try {
    const { data, errors } = yield call(
      StoryService.getStoriesByPublication,
      payload
    );
    if (!_.isNil(errors)) throw errors.items;

    if (!_.isNil(data)) {
      yield put(storyActions.getPublicationsStoriesSuccess(data));
    }
  } catch (e) {
    yield put(storyActions.getPublicationsStoriesFailure(e));
  }
}
function* selectFeatureStoriesSaga({
  payload: { index, story, sectionIndex },
}) {
  const selectedFeatureStories = yield select(
    (state) => state.story.featureStories
  );
  let newFeatureStories = { ...selectedFeatureStories };
  if (!(`section-${sectionIndex}` in newFeatureStories)) {
    Object.assign(newFeatureStories, {
      [`section-${sectionIndex}`]: [],
    });
  }
  newFeatureStories = JSON.parse(JSON.stringify(newFeatureStories));
  newFeatureStories[`section-${sectionIndex}`][index] = story;
  yield put(storyActions.selectFeatureStoriesSuccess(newFeatureStories));
}
function* selectStoriesArraySaga({ payload: { stories, sectionIndex } }) {
  const selectedFeatureStories = yield select(
    (state) => state.story.featureStories
  );
  let newFeatureStories = { ...selectedFeatureStories };
  if (stories.length === 0) {
    delete newFeatureStories[`section-${sectionIndex}`];
    yield put(storyActions.selectFeatureStoriesSuccess(newFeatureStories));
    return;
  }
  stories.forEach((story, index) => {
    if (!(`section-${sectionIndex}` in newFeatureStories)) {
      Object.assign(newFeatureStories, {
        [`section-${sectionIndex}`]: [],
      });
    }
    newFeatureStories = JSON.parse(JSON.stringify(newFeatureStories));
    newFeatureStories[`section-${sectionIndex}`][index] = story;
  });
  yield put(storyActions.selectFeatureStoriesSuccess(newFeatureStories));
}
function* getPublicationStoriesByTopicSaga({
  payload: { publication, topic, limit, sectionIndex },
}) {
  try {
    const { data, errors } = yield call(
      StoryService.getPublicationStoriesByTopic,
      publication,
      topic,
      limit
    );
    if (!_.isNil(errors)) throw errors.items;

    if (!_.isNil(data)) {
      yield put(
        storyActions.getPublicationsStoriesByTopicSuccess({
          data,
          sectionIndex,
        })
      );
      yield fork(selectStoriesArraySaga, {
        payload: { stories: data, sectionIndex },
      });
    }
  } catch (e) {
    yield put(storyActions.getPublicationsStoriesByTopicFailure(e));
  }
}
function* visitStorySaga({ payload: visit }) {
  try {
    const { data, errors } = yield call(StoryService.visitStory, visit);

    if (!_.isNil(errors)) throw errors.items;

    if (!_.isNil(data)) {
      yield put(storyActions.visitStorySuccess(data));
    }
  } catch (e) {
    yield put(storyActions.visitStoryFailure(e));
  }
}

export function* removeUnfollowingStories(authorId) {
  const followingStories = yield select(
    (state) => state.story.followingStories
  );
  const newFollowingStories = _.reject(
    followingStories,
    (story) => story.user === authorId
  );
  yield put(storyActions.removeUnfollowingStories(newFollowingStories));
}

export function* removeRecommendedStories(authorId) {
  const recommendedStories = yield select(
    (state) => state.story.recommendedStories
  );
  const newRecommendedStories = _.reject(
    recommendedStories,
    (story) => story.user === authorId
  );
  yield put(storyActions.removeRecommendedStories(newRecommendedStories));
}
function* updateStoryWorkerSaga({ payload: { data, errors } }) {
  try {
    if (!_.isNil(data)) {
      yield put(storyActions.updateStorySuccess(data));
    }
    if (!_.isNil(errors)) {
      throw errors.items;
    }
  } catch (e) {
    yield put(storyActions.updateStoryFailure(e));
  }
}

function* likeNormalizeStorySaga(likeNormalizedBody) {
  try {
    const { errors } = yield call(
      StoryService.likeNormalize,
      likeNormalizedBody
    );
    if (errors) throw errors;
  } catch (e) {
    console.error(e);
  }
}

function* likeStorySaga({
  payload: { userId, storyId, authorId, publicationId, categoryNames },
}) {
  try {
    const likeNormalizedBody = _.map(categoryNames, (category) => ({
      topic: category,
      storyId,
      userId,
    }));
    const { errors } = yield call(
      StoryService.like,
      userId,
      storyId,
      authorId,
      publicationId,
      categoryNames
    );
    if (errors) throw errors;
    if (!_.isEmpty(categoryNames)) {
      yield fork(likeNormalizeStorySaga, likeNormalizedBody);
    }
    yield put(storyActions.likeStorySuccess(storyId));
    yield fork(updateStoryLikeCountSaga, true);
  } catch (e) {
    console.log(e)
    yield put(storyActions.likeStoryFailure(e));

    console.error({ e });
  }
}

function* unlikeNormalizeStorySaga(storyId) {
  try {
    const { errors } = yield call(StoryService.unlikeNormalize, storyId);
    if (errors) throw errors;
  } catch (e) {
    console.error(e);
  }
}

function* unlikeStorySaga({ payload: { userId, storyId } }) {
  try {
    const { errors } = yield call(StoryService.unlike, userId, storyId);
    if (errors) throw errors;
    yield fork(unlikeNormalizeStorySaga, storyId);
    yield put(storyActions.unlikeStorySuccess(storyId));
    yield fork(updateStoryLikeCountSaga, false);
  } catch (e) {
    console.error({ e });

  }
}

function* isLikedSaga({ payload: { userId, storyId } }) {
  try {
    const { data, errors } = yield call(
      StoryService.isLiked,
      userId,
      storyId
    );
    if (errors) throw errors;
    if (!_.isNil(data) && !_.isEmpty(data)) {
      yield put(storyActions.isLikedStorySuccess(storyId));
    }
  } catch (e) {
    console.error({ e });
  }
}

function* likeReplySaga({ payload: { userId, replyId } }) {
  try {
    const { data, errors } = yield call(StoryService.likeReply, userId, replyId);
    if (errors) throw errors;
    yield put(storyActions.likeReplySuccess(data));
  } catch (e) {
    yield put(storyActions.likeReplyFailure(e));

    console.error({ e });

  }
}
function* unlikeReplySaga({ payload: { userId, replyId } }) {
  try {
    const { data, errors } = yield call(StoryService.unlikeReply, userId, replyId);
    if (errors) throw errors;
    yield put(storyActions.unlikeReplySuccess(data));
  } catch (e) {
    yield put(storyActions.likeReplyFailure(e));

    console.error({ e });

  }
}

export function* getMutedUsersSaga({ payload: { user } }) {
  try {
    const { data, errors } = yield call(
      StoryService.getMutedUsers,
      user._id
    );
    if (errors) throw errors;
    if (data) {
      yield put(storyActions.getMutedUsersSuccess(data));
    }
  } catch (e) {
    yield put(storyActions.getMutedUsersFailure(e));

  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(
      storyActions.getFollowingStoriesRequest.type,
      getFollowingStoriesSaga
    ),
    takeEvery(
      storyActions.getRecommendedStoriesRequest.type,
      getRecommendedStoriesSaga
    ),
    takeEvery(storyActions.getStoryRequest.type, getStorySaga),
    takeEvery(storyActions.getStoryBySlugRequest.type, getStoryBySlugSaga),
    takeEvery(storyActions.getMutedUsersRequest.type, getMutedUsersSaga),

    takeEvery(
      storyActions.getMoreUserStoriesRequest.type,
      getMoreUserStoriesSaga
    ),
    takeEvery(storyActions.getUserStoriesRequest.type, getUserStoriesSaga),
    takeEvery(
      storyActions.getUserStoriesRequestNextPage.type,
      getUserStoriesSaga
    ),
    takeEvery(storyActions.deleteStoryRequest.type, deleteStorySaga),
    takeEvery(
      storyActions.updateCategoryNamesRequest.type,
      updateCategoryNamesSaga
    ),
    takeEvery(
      storyActions.getUserDraftStoriesRequest.type,
      getUserDraftStoriesSaga
    ),
    takeEvery(storyActions.getStoryRepliesRequest.type, getStoryReplies),
    takeEvery(storyActions.createReplyRequest.type, createReply),
    takeEvery(storyActions.editReplyRequest.type, editReply),
    takeEvery(storyActions.removeReplyRequest.type, removeReply),
    takeEvery(storyActions.createReplyCommentRequest.type, createReplyComment),
    takeEvery(storyActions.getReplyCommentsRequest.type, getReplyComments),
    takeEvery(storyActions.createStoryRequest.type, createStorySaga),
    takeEvery(storyActions.updateStoryRequest.type, updateStorySaga),
    takeEvery(storyActions.updateStoryFieldRequest.type, updateStoryFieldSaga),
    takeEvery(storyActions.publishStoryRequest.type, publishStorySaga),
    takeEvery(storyActions.popularStoriesRequest.type, popularStoriesSaga),
    takeEvery(
      storyActions.getPublicationsStoriesRequest.type,
      getPublicationsStoriesSaga
    ),
    takeEvery(
      storyActions.selectFeatureStoriesRequest.type,
      selectFeatureStoriesSaga
    ),
    takeEvery(
      storyActions.getPublicationsStoriesByTopicRequest.type,
      getPublicationStoriesByTopicSaga
    ),
    takeEvery(storyActions.visitStoryRequest.type, visitStorySaga),
    takeEvery(
      storyActions.updateStoryWorkerRequest.type,
      updateStoryWorkerSaga
    ),
    takeEvery(storyActions.likeStoryRequest.type, likeStorySaga),
    takeEvery(storyActions.unlikeStoryRequest.type, unlikeStorySaga),
    takeEvery(storyActions.isLikedStoryRequest.type, isLikedSaga),
    takeEvery(storyActions.likeReplyRequest.type, likeReplySaga),
    takeEvery(storyActions.unlikeReplyRequest.type, unlikeReplySaga),
  ]);
}
