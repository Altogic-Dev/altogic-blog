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

  isTopicExist(topic) {
    return endpoint.get('/topic/isExist', { topicName: topic });
  },
  insertTopics(topics) {
    return endpoint.post('/topic', topics);
  },
  deleteTopicWriters(storyId) {
    return endpoint.delete(`/topic_writers/${storyId}`);
  },
  insertTopicWriters(topics) {
    return endpoint.put('/topic_writers', topics);
  },
  getTopicAnalytics(topicName) {
    return endpoint.get('/topic_writes/analytics', { topicName });
  },
  isTopicWriterExist(topicName) {
    return endpoint.get('/topic_writes/isTopicWriterExist', { topicName });
  },
  increaseWriterCounts(topics) {
    return endpoint.post('/topic/increaseWriterCounts', { topics });
  },
  getPublicationsTopics(publicationId) {
    return db
      .model('topic_writers')
      .filter(`publication == '${publicationId}'`)
      .get();
  },
  getPublicationsStoriesByTopic(publicationId, topicName) {
    return db
      .model('topic_writers')
      .filter(`publication == '${publicationId}' && topic == '${topicName}'`)
      .lookup({ field: 'story' })
      .get();
  },
};

export default TopicsService;
