import { db, endpoint } from '@/utils/altogic';

const StoryLikesService = {
  like(userId, storyId, categoryNames) {
    return endpoint.post(`/story_like/${userId}/${storyId}`, {
      topics: categoryNames,
    });
  },

  likeNormalize(likeNormalizedBody) {
    return endpoint.post('/story_likes_normalized/like', likeNormalizedBody);
  },

  unlike(userId, storyId) {
    return endpoint.delete(`/story_like/${userId}/${storyId}`);
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
};

export default StoryLikesService;
