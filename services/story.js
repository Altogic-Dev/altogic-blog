import { db, endpoint } from '@/utils/altogic';

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
      .lookup({ field: 'publication' })
      .get(true);
  },

  getRecommendedStories(userId, page = 1, limit = 10) {
    return endpoint.get('story/recommended', { userId, page, limit });
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
    return endpoint.get(`/story/${id}`);

  },

  getStoryBySlug(storySlug, userId) {
    return endpoint.get(`/story/bySlug`, { storySlug, userId });
  },

  getMoreUserStories(authorId, storyId, publicationId, page = 1, limit = 2) {
    let filter = `_id != '${storyId}'&& !isDeleted && isPublished && !isPrivate`;
    if (publicationId) filter += ` && publication == '${publicationId}'`;
    else filter += ` && user == '${authorId}'`;

    return db
      .model('story')
      .filter(filter)
      .sort('pinnedStory', 'desc')
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .lookup({ field: 'publication' })
      .get();
  },

  getUserStories(userId, page = 1, limit = 3) {
    return endpoint.get(`/user/${userId}/stories`, { page, limit });

  },

  getUserDraftStories(userId, page = 1, limit = 3) {
    return db
      .model('story')
      .filter(`user == '${userId}' && !isDeleted && !isPublished`)
      .sort('pinnedStory', 'desc')
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .lookup({ field: 'publication' })

      .get(true);
  },
  getStoryReplies(storyId, page, limit, userId) {
    return endpoint.get(`/story/${storyId}/replies`, { page, limit, userId });
  },
  getReplyComments(reply) {
    return endpoint.get(`/reply/${reply}/comments`);
  },
  createReply(reply) {
    return endpoint.post(`/story/${reply.story}/reply`, reply);
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
  async updateStory(story) {
    return endpoint.post(`/story/update`, story);

  },
  deleteStory(storyId) {
    return endpoint.delete(`/story/${storyId}`);
  },

  updateCategory(storyId, newCategoryNames) {
    return endpoint.post(`/story/${storyId}/update-categories`, { newCategoryNames });

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
    return endpoint.get(`/publication/${publication}/topic`, { topic, limit });
    // return db
    //   .model('story')
    //   .filter(
    //     `publication == '${publication}' && isPublished == true && IN(this.categoryNames, '${topic}')`
    //   )
    //   .lookup({ field: 'user' })
    //   .sort('createdAt', 'desc')
    //   .limit(limit)
    //   .get();
  },


  like(userId, storyId, authorId, publicationId, categoryNames) {
    return endpoint.post(`/story_like/${userId}/${storyId}/${authorId}`, {
      topics: categoryNames,
      publicationId,
    });
  },

  unlike(userId, storyId) {
    return endpoint.delete(`/story_like/${userId}/${storyId}`);
  },

  likeReply(userId, replyId) {
    return endpoint.post(`/reply/${replyId}/like/${userId}`);
  },
  unlikeReply(userId, replyId) {
    return endpoint.post(`/reply/${replyId}/unlike/${userId}`);

  },
  likeNormalize(likeNormalizedBody) {
    return endpoint.post('/story_likes_normalized/like', likeNormalizedBody);
  },


  unlikeNormalize(storyId) {
    return endpoint.delete(`/story_likes_normalized/${storyId}`);
  },

  isLiked(userId, storyId) {
    return db
      .model('story_likes')
      .filter(`user == '${userId}' && story == '${storyId}'`)
      .get();
  },

  getMutedUsers(userId) {
    return db.model('block_connection').filter(`user == '${userId}'`).get();
  },
};

export default StoryService;
