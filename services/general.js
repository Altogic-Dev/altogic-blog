import { endpoint } from '@/utils/altogic';

const GeneralService = {
  getConnectInformationStory(storyId, authorId) {
    return endpoint.get(`/connect-info/${storyId}/${authorId}`);
  },
  search({ query, topicLimit, userLimit, publicationLimit, postLimit }) {
    return endpoint.get('search', {
      query,
      topicLimit,
      userLimit,
      publicationLimit,
      postLimit,
    });
  },
};

export default GeneralService;
