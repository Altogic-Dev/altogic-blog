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
  getRelatedTopics(topic) {
    return db.model('related_topics').filter(`topicA == '${topic}' || topicB == '${topic}'`).sort('storyCount', 'desc').limit(10).get();
  },
  getTopicTopWriters(topic) {
    return db.model('story').filter(`IN(this.categoryNames, ${topic}`).group('user').get();
  },
};

export default TopicsService;
