import { db } from '@/utils/altogic';
import _ from 'lodash';

const StoryService = {
  getFollowingStories(userId, mutedUsers, page = 1, limit = 10) {
    const query = () => {
      if (_.isArray(mutedUsers) && !_.isEmpty(mutedUsers)) {
        const mutedUserQuery = _.map(mutedUsers, (user, index) =>
          index === 0 ? `this.user != '${user}'` : `|| this.user != '${user}'`
        );
        return `!isDeleted && isPublished && !isPrivate && commentCount != 0 && readingCount != 0 && likeCount != 0 && (${mutedUserQuery})`;
      }
      return '!isDeleted && isPublished && !isPrivate && commentCount != 0 && readingCount != 0 && likeCount != 0';
    };

    return db
      .model('story')
      .lookup({
        modelName: 'follower_connection',
        name: 'followerConnection',
        query: `this.user == lookup.followingUser && lookup.followerUser == '${userId}'`,
      })
      .filter(query)
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
      .get(true);
  },

  getRecommendedStories(mutedUsers, page = 1, limit = 10) {
    const query = () => {
      if (_.isArray(mutedUsers) && !_.isEmpty(mutedUsers)) {
        const mutedUserQuery = _.map(mutedUsers, (user, index) =>
          index === 0 ? `this.user != '${user}'` : `|| this.user != '${user}'`
        );
        return `!isDeleted && isPublished && !isPrivate && commentCount != 0 && readingCount != 0 && likeCount != 0 && (${mutedUserQuery})`;
      }
      return '!isDeleted && isPublished && !isPrivate && commentCount != 0 && readingCount != 0 && likeCount != 0';
    };

    return db
      .model('story')
      .filter(query)
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
      .get(true);
  },
};

export default StoryService;
