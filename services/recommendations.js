import { db, endpoint } from '@/utils/altogic';

const RecommendationsService = {
  getTopWriters(page, limit) {
    return endpoint.get('/user/top-writers', { page, limit });
  },
  getWhoToFollow(limit, page, userId) {
    return db
      .model('users')
      .sort('storyCount', 'desc')
      .lookup({
        name: 'followedByMe',
        modelName: 'follower_connection',
        query: `this._id == lookup.followingUser && lookup.followerUser == "${userId}"`,
      })
      .filter(
        `!exists(followedByMe) && this._id != "${userId} && this.emailVerified"`
      )
      .limit(limit)
      .page(page)
      .getRandom(10);
  },
  getTopicTopWriters(topic) {
    return endpoint.get('/topic/topWriters', { topic });
  },
};

export default RecommendationsService;
