import _ from 'lodash';
import { call, takeEvery, put, all, select, fork } from 'redux-saga/effects';
import StoryService from '@/services/story';
import { storyActions } from './storySlice';
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
function* getStoryReplies({ payload: { story, page, limit } }) {
  try {
    const { data, errors } = yield call(
      StoryService.getStoryReplies,
      story,
      page,
      limit
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

export function* updateFollowerCountSaga(isIncrease) {
  const story = yield select((state) => state.story.story);
  if (isIncrease) {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        user: {
          ...story.user,
          followerCount: story.user.followerCount + 1,
        },
      })
    );
  } else {
    yield put(
      storyActions.getStorySuccess({
        ...story,
        user: {
          ...story.user,
          followerCount: story.user.followerCount - 1,
        },
      })
    );
  }
}

function* getStoryBySlugSaga({ payload: slug }) {
  try {
    const sessionUser = yield select((state) => state.auth.user);

    if (!_.isNil(sessionUser)) {
      const { data: story, errors } = yield call(
        StoryService.getStoryBySlug,
        slug
      );
      if (errors) throw errors;
      if (story) {
        if (sessionUser._id === story.user._id) {
          yield put(storyActions.getStoryBySlugSuccess(story));
        } else if (story.isPublished && !story.isPrivate && !story.isDeleted) {
          yield put(storyActions.getStoryBySlugSuccess(story));
        } else {
          throw new Error('This user cannot see the story');
        }
      }
    } else {
      const { data: story, errors } = yield call(
        StoryService.getStoryBySlug,
        slug
      );
      if (errors) throw errors;
      if (story && story.isPublished && !story.isPrivate && !story.isDeleted) {
        yield put(storyActions.getStoryBySlugSuccess(story));
      } else {
        throw new Error('This user cannot see the story');
      }
    }
  } catch (e) {
    console.error(e);
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
          data: data.data,
          info: data.info,
          owner: userID,
          userID,
        })
      );
    }
  } catch (e) {
    console.error({ e });
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
    console.error({ e });
  }
}

function* deleteStorySaga({
  payload: { storyId, isPublished, categoryNames, onSuccess },
}) {
  try {
    const { errors } = yield call(StoryService.deleteStory, storyId);
    if (errors) throw errors;

    if (!_.isEmpty(categoryNames)) {
      yield fork(deleteTopicWritersSaga, storyId);
    }

    yield put(storyActions.deleteStorySuccess({ storyId, isPublished }));
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
    if (errors) throw errors;
    yield put(storyActions.updateCategoryNamesSuccess(newCategoryNames));
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
    console.error({ e });
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
function* cacheStorySaga({ payload: { story } }) {
  try {
    yield call(StoryService.cacheStory, story);
  } catch (e) {
    console.error({ e });
  }
}

function* getCacheStorySaga({ payload: storySlug }) {
  try {
    const { data, errors } = yield call(StoryService.getCacheStory, storySlug);
    if (!_.isNil(errors)) throw errors.items;

    if (!_.isNil(data)) {
      yield put(storyActions.getCacheStorySuccess(data));
    } else {
      yield fork(getStoryBySlugSaga, { payload: storySlug });
    }
  } catch (e) {
    console.error(e);
  }
}

function* publishStorySaga({
  payload: { story, isEdited, onSuccess, categoryPairs, topicsWillCreate },
}) {
  try {
    const operation = isEdited
      ? StoryService.updateStory
      : StoryService.publishStory;

    const { data, errors } = yield call(operation, story);
    if (!_.isNil(errors)) throw errors.items;

    if (_.isFunction(onSuccess)) onSuccess();
    const user = yield select((state) => state.auth.user);
    const publishedStory = {
      ...data,
      user,
    };
    yield put(storyActions.publishStorySuccess(publishedStory));
    if (!_.isEmpty(story.categoryNames)) {
      yield call(StoryService.updateCategoryPairs, categoryPairs);

      yield fork(insertTopicsSaga, story);
      yield fork(insertTopicsSaga, story, topicsWillCreate);
    }
    yield call(StoryService.deleteCacheStory, story.storySlug);
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
    takeEvery(storyActions.cacheStoryRequest.type, cacheStorySaga),
    takeEvery(storyActions.getCacheStoryRequest.type, getCacheStorySaga),
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
  ]);
}
