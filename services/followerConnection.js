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

  getFollowing(userId, followingUserId) {
    return db
      .model('follower_connection')
      .filter(
        `followerUser == '${userId}' && followingUser == '${followingUserId}'`
      )
      .get();
  },

  followUser(followerUser, followingUser) {
    return db.model('follower_connection').create({
      followerName: `${followerUser.name} ${followerUser.surname}`,
      followerUsername: followerUser.username,
      followerUserProfilePicture: followerUser.profilePicture,
      followerUser: followerUser?._id,
      followerUserAbout: followerUser.about,
      followingName: `${followingUser.name} ${followingUser.surname}`,
      followingUsername: followingUser.username,
      followingUserProfilePicture: followingUser.profilePicture,
      followingUser: followingUser?._id,
      followingUserAbout: followingUser.about,
      unreadStories: 0,
    });
  },

  getFollowerUsers(userId, page = 1, limit = 5) {
    return db
      .model('follower_connection')
      .filter(`followingUser == '${userId}'`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },

  getFollowingUsers(userId, page = 1, limit = 5) {
    return db
      .model('follower_connection')
      .filter(`followerUser == '${userId}'`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },
};
export default FollowerConnectionService;
