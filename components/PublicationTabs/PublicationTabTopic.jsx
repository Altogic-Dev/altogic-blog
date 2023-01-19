import { topicsActions } from '@/redux/topics/topicsSlice';
import { parseHtml } from '@/utils/utils';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import PublicationPostCard from '../PublicationsPostCard';

function PublicationTabTopic({ tab, publication }) {
  const dispatch = useDispatch();

  const topicStories = useSelector(
    (state) => state.topics.publicationStoriesByTopic
  );

  const stories = _.map(topicStories, 'story');

  useEffect(() => {
    if (publication && tab) {
      dispatch(
        topicsActions.getPublicationsStoriesByTopicRequest({
          publicationId: publication._id,
          topicName: tab.contents,
        })
      );
    }
  }, [publication, tab]);

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:min-w-[100vw] lg:min-w-[75vw] px-8 max-w-screen-xl w-full mx-auto ">
      {stories ? (
        _.map(stories, (post) => (
          <PublicationPostCard
            key={post._id}
            profilePicture={post.userProfilePicture}
            image={_.first(post.storyImages)}
            title={post.title}
            description={parseHtml(post.content) ?? ''}
            readMoreUrl={`/story/${post.storySlug}`}
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
        ))
      ) : (
        <div className="w-full flex justify-center">
          <ClipLoader color="#9333ea" size={80} />
        </div>
      )}
    </div>
  );
}

export default PublicationTabTopic;
