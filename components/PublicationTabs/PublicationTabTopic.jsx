import { topicsActions } from '@/redux/topics/topicsSlice';
import { parseHtml } from '@/utils/utils';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublicationPostCard from '../PublicationsPostCard';

function PublicationTabTopic({ tab, publication }) {
  const dispatch = useDispatch();

  const topicStories = useSelector(
    (state) => state.topics.publicationStoriesByTopic
  );

  const [didMount, setDidMount] = useState(false);

  const stories = _.map(topicStories, 'story');

  useEffect(() => {
    if (publication && tab && !didMount) {
      dispatch(
        topicsActions.getPublicationsStoriesByTopicRequest({
          publicationId: publication._id,
          topicName: tab.contents,
        })
      );
      setDidMount(true);
    }
  }, [publication]);

  return (
    <div className="grid grid-cols-3 gap-10 w-[70vw] ">
      {_.map(stories, (post) => (
        <PublicationPostCard
          key={post._id}
          profilePicture={post.userProfilePicture}
          image={_.first(post.storyImages)}
          title={post.title}
          description={parseHtml(post.content) ?? ''}
          readMoreUrl={`/publications/${publication?.name}/${post.storySlug}`}
          personName={post.username}
          date={DateTime.fromISO(_.get(post, 'createdAt')).toLocaleString({
            year: 'numeric',
            month: 'long',
          })}
          storiesCount={5}
          bookmark={post.bookmark}
          firstPadding
          bigImage={_.first(post.storyImages)}
          story={post}
        />
      ))}
    </div>
  );
}

export default PublicationTabTopic;
