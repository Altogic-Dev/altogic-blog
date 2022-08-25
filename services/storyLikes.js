import { db, endpoint } from '@/utils/altogic';

const StoryLikesService = {
  like(userId, storyId) {
    return endpoint.post(`/story_like/${userId}/${storyId}`);
  },

  unlike(userId, storyId) {
    return endpoint.delete(`/story_like/${userId}/${storyId}`);
  },

  isLiked(userId, storyId) {
    return db
      .model('story_likes')
      .filter(`user == '${userId}' && story == '${storyId}'`)
      .get();
  },
};

export default StoryLikesService;
