import { db, endpoint } from '@/utils/altogic';

const StatsService = {
  getStatistics(userId) {
    return endpoint.get(`/general/statistics`, userId);
  },

  getTotalReadsLastXDays(userId, date, dateType) {
    return db
      .model('story_view')
      .filter(
        `createdAt > ${date} && this.author == '${userId}' && isRead==true`
      )
      .group(
        dateType === '24 Hours'
          ? "TOTEXT(hour(this.createdAt)) + ':' + TOTEXT(minute(this.createdAt))"
          : "TOTEXT(day(this.createdAt)) + '-' + TOTEXT(month(this.createdAt)) + '-' + TOTEXT(year(this.createdAt))"
      )
      .compute([{ name: 'count', type: 'count' }]);
  },

  getStoryReadingTimePeriodically(storySlug, date) {
    return endpoint.get(`/story/story-reading-time-periodically`, {
      storySlug,
      date,
    });
  },
  getTotalLikesLastXDays(userId, date, dateType) {
    return db
      .model('story_likes')
      .filter(`createdAt > ${date} && this.author == '${userId}'`)
      .group(
        dateType === '24 Hours'
          ? "TOTEXT(hour(this.createdAt)) + ':' + TOTEXT(minute(this.createdAt))"
          : "TOTEXT(day(this.createdAt)) + '-' + TOTEXT(month(this.createdAt)) + '-' + TOTEXT(year(this.createdAt))"
      )
      .compute([{ name: 'count', type: 'count' }]);
  },
  getTotalViewsLastXDays(userId, date, dateType) {
    return db
      .model('story_view')
      .filter(`createdAt > ${date} && this.author == '${userId}'`)
      .group(
        dateType === '24 Hours'
          ? "TOTEXT(hour(this.createdAt)) + ':' + TOTEXT(minute(this.createdAt))"
          : "TOTEXT(day(this.createdAt)) + '-' + TOTEXT(month(this.createdAt)) + '-' + TOTEXT(year(this.createdAt))"
      )
      .compute([{ name: 'count', type: 'count' }]);
  },

  getAllStoriesStatistics(userId) {
    return db.model('story').filter(`this.user == '${userId}'`).get();
  },

  getStoryStatistics(storySlug) {
    return endpoint.get(`/story/statistics`, { storySlug });
  },
  getStoryStatisticsPeriodically(storySlug, date) {
    return endpoint.get(`/story/story-statistics-periodically`, {
      storySlug,
      date,
    });
  },
};

export default StatsService;
