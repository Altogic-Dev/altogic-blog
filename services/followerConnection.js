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
    return endpoint.get(`/user/${userId}/followers`, {
      sessionUserId,
      page,
      limit
    });

  },

  getFollowingUsers(sessionUserId, userId, page = 1, limit = 5) {
    return endpoint.get(`/user/${userId}/followings`, {
      sessionUserId, page, limit
    })

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
