import { db } from '@/utils/altogic';

const RecommendationsService = {
  getWhoToFollow() {
    return db.model('users').sort('storyCount', 'desc').limit(10).getRandom(10);
  },
  getWhoToFollowMinimized() {
    return db.model('users').sort('storyCount', 'desc').limit(100).get();
  },
  getPopularTopics() {
    return db.model('topics').sort('storyCount', 'desc').limit(10).get();
  },
};

export default RecommendationsService;
