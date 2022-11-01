
import { auth, db } from './altogic';


async function updateStory(story, session) {
  auth.setSession(session);
  const data = db.model('story').object(story._id).update(story);
  return data
}

onmessage = async (e) => {
  const { data, errors } = await updateStory(e.data.story, e.data.session);
  postMessage({ data, errors });
};

