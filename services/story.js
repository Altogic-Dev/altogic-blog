import { db, endpoint, cache } from '@/utils/altogic';

const StoryService = {
  getFollowingStories(userId, page = 1, limit = 10) {
    return db
      .model('story')
      .lookup({
        modelName: 'follower_connection',
        name: 'followerConnection',
        query: `this.user == lookup.followingUser && lookup.followerUser == '${userId}'`,
      })
      .filter(
        'EXISTS(followerConnection) && !isDeleted && isPublished && !isPrivate'
      )
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
      .get(true);
  },

  getRecommendedStories(page = 1, limit = 10) {
    return endpoint.get('story/recommended', { page, limit });
  },

  updateCategoryPairs(categoryPairs) {
    return endpoint.post('/topic/relation', categoryPairs);
  },

  GetRecommendedStoriesByUser({ recommendedTopics, page = 1, limit = 10 }) {
    return endpoint.put('/story/recommendedByUser', {
      recommendedTopics,
      page,
      limit,
    });
  },

  getStory(id) {
    return db
      .model('story')
      .filter(`_id == '${id}'`)
      .lookup({ field: 'publication' })
      .lookup({ field: 'user' })
      .get();
  },

  getStoryBySlug(storySlug) {
    return endpoint.get(`/story/bySlug`, { storySlug });
  },

  getMoreUserStories(authorId, storyId, publicationId, page = 1, limit = 2) {
    let filter = `_id != '${storyId}'&& !isDeleted && isPublished && !isPrivate`;
    if (publicationId) filter += ` && publication == '${publicationId}'`;
    else filter += ` && user == '${authorId}'`;

    return db
      .model('story')
      .filter(filter)
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
  editReply(reply) {
    return db
      .model('replies')
      .object(reply._id)
      .updateFields([
        {
          field: 'content',
          value: reply.content,
          updateType: 'set',
        },
      ]);
  },
  removeReply(reply) {
    return endpoint.delete(`/reply/remove`, reply);
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
    return endpoint.delete(`/story/${storyId}`);
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
  deleteCacheStory(storySlug) {
    return cache.delete(storySlug);
  },

  publishStory(story) {
    return endpoint.post('/story', story);
  },
  visitStory(visit) {
    return endpoint.post(`/story/view`, visit);
  },
  getPopularStories() {
    return endpoint.get('/story/popular');
  },
  getStoriesByPublication(publicationId, page = 1, limit = 10) {
    return db
      .model('story')
      .filter(
        `publication == '${publicationId}' && !isDeleted && isPublished && !isPrivate`
      )
      .lookup({ field: 'user' })
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },
  getPublicationStoriesByTopic(publication, topic, limit) {
    return db
      .model('story')
      .filter(
        `publication == '${publication}' && isPublished == true && IN(this.categoryNames, '${topic}')`
      )
      .lookup({ field: 'user' })
      .sort('createdAt', 'desc')
      .limit(limit)
      .get();
  },
};

export default StoryService;
