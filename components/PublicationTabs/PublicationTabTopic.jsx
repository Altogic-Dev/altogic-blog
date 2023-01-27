import { storyActions } from '@/redux/story/storySlice';
import { parseHtml } from '@/utils/utils';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import PublicationPostCard from '../PublicationsPostCard';

function PublicationTabTopic({ tab, publication }) {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.story.publicationTopicStories);
  const isLoading = useSelector((state) => state.story.isLoading);

  useEffect(() => {
    if (publication && tab) {
      dispatch(
        storyActions.getPublicationsStoriesByTopicRequest({
          publication: publication?._id,
          topic: tab.contents,
        })
      );
    }
  }, [publication, tab]);

  console.log(isLoading)
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:min-w-[100vw] lg:min-w-[75vw] max-w-screen-xl w-full mx-auto ">
      {!isLoading ? (
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
        <div className="max-w-screen-xl w-screen h-[700px] flex justify-center items-center">
          <ClipLoader color="#9333ea" size={80} />
        </div>
      )}
    </div>
  );
}

export default PublicationTabTopic;
