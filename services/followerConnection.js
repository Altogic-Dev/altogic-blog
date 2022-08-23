import { db } from '@/utils/altogic';

const FollowerConnectionService = {
  unfollow(userId, followingUserId) {
    return db
      .model('follower_connection')
      .filter(
        `followerUser == '${userId} && followingUser == '${followingUserId}'`
      )
      .delete();
  },
  getFollowingUsers(userId) {
    return db
      .model('follower_connection')
      .filter(`followingUser == '${userId}'`)
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
};

export default FollowerConnectionService;
