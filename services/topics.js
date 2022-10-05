import { db, endpoint } from '@/utils/altogic';

const TopicsService = {
  getLatestsOfTopic(topic, page, limit) {
    return db
      .model('story')
      .filter(`IN(this.categoryNames, '${topic}')`)
      .sort('createdAt', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },
  getBestsOfTopic(topic, page, limit) {
    return db
      .model('story')
      .filter(`IN(this.categoryNames, '${topic}')`)
      .sort('likeCount', 'desc')
      .page(page)
      .limit(limit)
      .get();
  },
  getIdListTrendingsOfTopic(topic, limit, page, date) {
    return db
      .model('story_likes')
      .filter(`createdAt > ${date} && IN(this.topics, '${topic}')`)
      .group(['story'])
      .compute([{ name: 'count', type: 'count' }]);
  },
  getTrendingsOfTopic(stories) {
    let query = `_id == '`;
    query += stories.join(`' || _id == '`);
    query += `'`;
    return db.model('story').filter(query).get();
  },
  getPopularTopics() {
    return db.model('topics').sort('storyCount', 'desc').limit(10).get();
  },
  getRelatedTopics(topic) {
    return db
      .model('related_topics')
      .filter(`topicA == '${topic}' || topicB == '${topic}'`)
      .sort('storyCount', 'desc')
      .limit(10)
      .get();
  },
  getTopicTopWritersIdList(topic) {
    return db
      .model('story')
      .filter(`IN(this.categoryNames, '${topic}')`)
      .group('user')
      .limit(1)
      .compute([{ name: 'count', type: 'count' }]);
  },
  getTopicTopWriters(people) {
    let query = `_id == '`;
    query += people.join(`' || _id == '`);
    query += `'`;
    return db.model('users').filter(query).get();
  },
  isTopicExist(topic) {
    return endpoint.get('/topic/isExist', { topicName: topic });
  },
  insertTopics(topics) {
    return db.model('topics').create(topics);
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
