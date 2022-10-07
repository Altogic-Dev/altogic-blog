import { db } from '@/utils/altogic';

const RecommendationsService = {
  getWhoToFollow2(limit, page) {
    return db
      .model('users')
      .sort('storyCount', 'desc')
      .limit(limit)
      .page(page)
      .getRandom(10);
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
      .filter(`!exists(followedByMe) && this._id != "${userId}"`)
      .limit(limit)
      .page(page)
      .getRandom(10);
  },
  getWhoToFollowMinimized(userId) {
    return db
      .model('users')
      .lookup({
        name: 'followedByMe',
        modelName: 'follower_connection',
        query: `this._id == lookup.followingUser && lookup.followerUser == "${userId}"`,
      })

      .filter(`!exists(followedByMe) && this._id != "${userId}"`)
      .sort('storyCount', 'desc')
      .limit(100)
      .getRandom(5);
  },
};

export default RecommendationsService;
