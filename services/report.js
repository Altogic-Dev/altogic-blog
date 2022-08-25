import { db } from '@/utils/altogic';

const ReportService = {
  reportStory(userId, storyId, reportedUserId) {
    return db.model('report').create({
      reportedStory: storyId,
      reportedUser: reportedUserId,
      user: userId,
    });
  },
  getReportedStoryByUser(userId, storyId) {
    return db
      .model('report')
      .filter(`user == '${userId}' && reportedStory == '${storyId}'`)
      .get();
  },
};

export default ReportService;
