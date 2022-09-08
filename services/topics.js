import { db } from '@/utils/altogic';
import { addDays } from '@/utils/utils';

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
  getIdListTrendingsOfTopic(topic,limit,page,date) {
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
};

export default TopicsService;
