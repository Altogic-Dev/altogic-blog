import { endpoint } from '@/utils/altogic';

const GeneralService = {
  getConnectInformationStory(storyId, authorId) {
    return endpoint.get(`/connect-info/${storyId}/${authorId}`);
  },
  search({ query, limit }) {
    return endpoint.get('search', {
      query,
      limit,
    });
  },
};

export default GeneralService;
