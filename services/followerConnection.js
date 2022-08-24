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
      followerUserProfilePicture: followerUser.profilePicture,
      followerUsername: followerUser.username,
      followerType: 'user',
    });
  },

  getFollowing(userId, followingUserId) {
    return db
      .model('follower_connection')
      .filter(
        `followerUser == '${userId}' && followingUser == '${followingUserId}'`
      )
      .get();
  },
};

export default FollowerConnectionService;
