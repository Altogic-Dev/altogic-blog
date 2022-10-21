import StoryService from '@/services/story';

onmessage = async (e) => {
  const { data, errors } = await StoryService.updateStory(e.data);
  postMessage({ data, errors });
};
