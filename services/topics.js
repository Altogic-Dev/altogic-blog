import { db } from '@/utils/altogic';

const TopicsService = {
  getLatestsOfTopic() {
    return db.model('users').sort('storyCount', 'desc').limit(10).getRandom(10);
  },
  getBestsOfTopic() {
    return db.model('users').sort('storyCount', 'desc').limit(100);
  },
  getTrendingsOfTopic() {
    return db.model('users').sort('storyCount', 'desc').limit(100);
  },
  getPopularTopics() {
    return db.model('topics').sort('storyCount', 'desc').limit(10).get();
  },
};

export default TopicsService;
