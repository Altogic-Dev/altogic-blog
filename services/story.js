import _ from 'lodash';
import { db, endpoint, cache } from '@/utils/altogic';

const StoryService = {
  getFollowingStories(userId, mutedUsers, page = 1, limit = 10) {
    const query = () => {
      if (_.isArray(mutedUsers) && !_.isEmpty(mutedUsers)) {
        const mutedUserQuery = _.map(mutedUsers, (user, index) =>
          index === 0 ? `this.user != '${user}'` : `|| this.user != '${user}'`
        );
        return `EXISTS(followerConnection) && !isDeleted && isPublished && !isPrivate && (${mutedUserQuery})`;
      }
      return 'EXISTS(followerConnection) && !isDeleted && isPublished && !isPrivate';
    };

    return db
      .model('story')
      .lookup({
        modelName: 'follower_connection',
        name: 'followerConnection',
        query: `this.user == lookup.followingUser && lookup.followerUser == '${userId}'`,
      })
      .filter(query())
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
      .get(true);
  },

  getRecommendedStories(page = 1, limit = 10) {
    return endpoint.get('story/recommended', { page, limit });
  },

  GetRecommendedStoriesByUser({
    recommendedTopics,
    mutedUsers,
    page = 1,
    limit = 10,
  }) {
    return endpoint.put('/story/recommendedByUser', {
      recommendedTopics,
      mutedUsers,
      page,
      limit,
    });
  },

  getStory(id) {
    return db
      .model('story')
      .filter(`_id == '${id}'`)
      .lookup({ field: 'publication' })
      .get();
  },

  getStoryBySlug(storySlug) {
    return endpoint.get(`/story/bySlug`, { storySlug });
  },

  getMoreUserStories(authorId, storyId, page = 1, limit = 5) {
    return db
      .model('story')
      .filter(
        `_id != '${storyId}' && user == '${authorId}' && isPublished && !isPrivate`
      )
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },

  getUserStories(userId, page = 1, limit = 6) {
    return db
      .model('story')
      .filter(`user == '${userId}' && !isDeleted && isPublished`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get(true);
  },

  getUserDraftStories(userId, page = 1, limit = 6) {
    return db
      .model('story')
      .filter(`user == '${userId}' && !isDeleted && !isPublished`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get(true);
  },
  getStoryReplies(storyId, page, limit) {
    return db
      .model('replies')
      .filter(`story == '${storyId}'`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get(true);
  },
  getReplyComments(reply) {
    return db
      .model('reply_comments')
      .filter(`reply == '${reply}'`)
      .sort('createdAt', 'desc')
      .get();
  },
  createReply(reply) {
    return db.model('replies').create(reply);
  },

  createReplyComment(comment) {
    return endpoint.post(`/reply_comments`, comment);
  },

  createStory(story) {
    return db.model('story').object(story._id).create(story);
  },
  updateStory(story) {
    return db.model('story').object(story._id).update(story);
  },
  deleteStory(storyId) {
    return db.model('story').object(storyId).delete();
  },

  updateCategory(storyId, newCategoryNames) {
    return db.model('story').object(storyId).updateFields({
      field: 'categoryNames',
      updateType: 'set',
      value: newCategoryNames,
    });
  },
  cacheStory(story) {
    return cache.set(`${story.storySlug}`, story, 60 * 15);
  },
  getCacheStory(storySlug) {
    return cache.get(storySlug);
  },

  publishStory(story) {
    return endpoint.post('/story', story);
  },
};

export default StoryService;
