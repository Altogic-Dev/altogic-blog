import _ from 'lodash';
import { db } from '@/utils/altogic';

const StoryService = {
  getFollowingStories(userId, mutedUsers, page = 1, limit = 10) {
    const query = () => {
      if (_.isArray(mutedUsers) && !_.isEmpty(mutedUsers)) {
        const mutedUserQuery = _.map(mutedUsers, (user, index) =>
          index === 0 ? `this.user != '${user}'` : `|| this.user != '${user}'`
        );
        return `EXISTS(followerConnection) && !isDeleted && isPublished && !isPrivate && commentCount != 0 && readingCount != 0 && likeCount != 0 && (${mutedUserQuery})`;
      }
      return 'EXISTS(followerConnection) && !isDeleted && isPublished && !isPrivate && commentCount != 0 && readingCount != 0 && likeCount != 0';
    };

    return db
      .model('story')
      .lookup({
        modelName: 'follower_connection',
        name: 'followerConnection',
        query: `this.user == lookup.followingUser && lookup.followerUser == '${userId}'`,
      })
      .filter(query())
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
      .filter(query())
      .sort('createdAt', 'desc')
      .limit(limit)
      .page(page)
      .get(true);
  },

  getStory(id) {
    return db
      .model('story')
      .filter(`_id == '${id}' && isPublished && !isPrivate`)
      .lookup({ field: 'user' })
      .get();
  },

  getStoryBySlug(slug) {
    return db
      .model('story')
      .filter(`storySlug == '${slug}' && isPublished && !isPrivate`)
      .lookup({ field: 'user' })
      .get();
  },

  getMoreUserStories(authorId, storyId, page = 1, limit = 5) {
    return db
      .model('story')
      .filter(
        `_id != '${storyId}' && user == '${authorId}' && isPublished && !isPrivate`
      )
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },

  getUserStories(userId, page = 1, limit = 6) {
    return db
      .model('story')
      .filter(`user == '${userId}'`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },
  getStoryReplies(storyId, page, limit) {
    console.log( storyId,page,limit);
    return db
      .model('replies')
      .filter(`story == '${storyId}'`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },
  getReplyComments(replies) {
    let query = `reply == '`;
    query+= replies.join(`' || reply == '`);
    query += `'`;
    return db
      .model('reply_comments')
      .filter(query)
      .sort('createdAt', 'desc')
      .get();
  },
  createReply(reply) {
    return db.model('replies').create(reply);
  },

  createReplyComment(comment) {
    return db.model('reply_comments').create(comment);
  },

  updateStory(story) {
    return db.model('story').object(story._id).update(story);
  },
  deleteStory(storyId) {
    return db.model('story').object(storyId).delete();
  },
};

export default StoryService;
