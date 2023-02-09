import { db, endpoint } from '@/utils/altogic';

const TopicsService = {
  getLatestsOfTopic(topic) {
    return endpoint.get('/topic/latest', {
      topic,
    });
  },
  getBestsOfTopic(topic) {
    return endpoint.get('/topic/best', {
      topic,
    });
  },

  getTrendingTopicsSaga(topic) {
    return endpoint.get('/topic/trending', {
      topic,
    });
  },
  getPopularTopics() {
    return endpoint.get('/topics/popular');
  },
  getRelatedTopics(topic) {
    return db
      .model('related_topics')
      .filter(`topicA == '${topic}' || topicB == '${topic}'`)
      .sort('storyCount', 'desc')
      .limit(10)
      .get();
  },

  insertTopics(topics) {
    return endpoint.post('/topic', topics);
  },
  deleteTopicWriters(storyId) {
    return endpoint.delete(`/topic_writer/${storyId}`);
  },
  insertTopicWriters(topics) {
    return endpoint.post('/topic_writer', topics);
  },
  getTopicAnalytics(topicName) {
    return endpoint.get('/topic_writes/analytics', { topicName });
  },
  getPublicationsTopics(publicationId) {
    return db
      .model('topic_writer')
      .filter(`publication == '${publicationId}'`)
      .group(
        'topic'
      )
      .compute([{ name: 'count', type: 'count' }]);

  },

  searchTopics(topic) {
    return endpoint.get('/topic/search', { topic });
  },

};

export default TopicsService;
