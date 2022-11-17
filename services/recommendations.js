import {  endpoint } from '@/utils/altogic';

const RecommendationsService = {
  getTopWriters(page, limit) {
    return endpoint.get('/user/top-writers', { page, limit });
  },
  getWhoToFollow(page, limit, userId) {
    console.log(limit)
    // return db
    //   .model('users')
    //   .sort('storyCount', 'desc')
    //   .lookup({
    //     name: 'followedByMe',
    //     modelName: 'follower_connection',
    //     query: `this._id == lookup.followingUser && lookup.followerUser == "${userId}"`,
    //   })
    //   .filter(
    //     `!exists(followedByMe) && this._id != "${userId}" && (this.emailVerified || this.provider!="altogic")`
    //   )
    //   .limit(limit)
    //   .page(page)
    //   .getRandom(10);

    return endpoint.get('/recommendations/who-to-follow', { page, limit, userId });

  },
  getTopicTopWriters(topic) {
    return endpoint.get('/topic/topWriters', { topic });
  },
};

export default RecommendationsService;
