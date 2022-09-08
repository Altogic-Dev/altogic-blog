import { endpoint } from '@/utils/altogic';

const GeneralService = {
  getConnectInformationStory(storyId, authorId) {
    return endpoint.get(`/connect-info/${storyId}/${authorId}`);
  },
};

export default GeneralService;
