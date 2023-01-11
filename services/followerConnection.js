import { db, endpoint } from '@/utils/altogic';

const FollowerConnectionService = {
  unfollow(userId, followingUserId) {
    return endpoint.delete(`/follower_connection/${userId}/${followingUserId}`);
  },

  follow(followerUser, followingUser) {
    return endpoint.post(`/follower_connection`, {
      ...followingUser,
      followerUser: followerUser._id,
      followerName: followerUser.name,
      followerUserProfilePicture: followerUser.profilePicture ?? null,
      followerUsername: followerUser.username,
      followerType: 'user',
    });
  },

  getFollowerUsers(sessionUserId, userId, page = 1, limit = 5) {
    return db
      .model('follower_connection')
      .filter(`followingUser == '${userId}'`)
      .lookup({
        modelName: 'follower_connection',
        name: 'isFollowing',
        query: `this.followerUser == lookup.followingUser && lookup.followerUser == '${sessionUserId}'`,
      })
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get(true);
  },

  getFollowingUsers(sessionUserId, userId, page = 1, limit = 5) {
    return endpoint.get(`/user/${userId}/followings`, {
      sessionUserId, page, limit
    })
    // return db
    //   .model('follower_connection')
    //   .filter(`followerUser == '${userId}'`)
    //   .lookup({
    //     modelName: 'follower_connection',
    //     name: 'isFollowing',
    //     query: `this.followingUser == lookup.followingUser && lookup.followerUser == '${sessionUserId}'`,
    //   })
    //   .sort('createdAt', 'desc')
    //   .page(page)
    //   .limit(limit)
    //   .get(true);
  },
  getSubscriptions(userId, page = 1, limit = 5) {
    return db
      .model('subscribe_connection')
      .filter(`subscribeUser == '${userId}'`)
      .lookup({ field: 'subscribingUser' })
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get(true);
  },
};
export default FollowerConnectionService;
