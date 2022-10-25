import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { storyActions } from '@/redux/story/storySlice';
import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

function MyStoriesPublished({ setDeletedStory,userStoriesInfo }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const userStories = useSelector((state) => state.story.userStories);
  const PAGE_LIMIT = 6;
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView();

  const getUserStories = useCallback(() => {
    dispatch(
      storyActions.getUserStoriesRequestNextPage({
        page,
        limit: PAGE_LIMIT,
        isPublishedFilter: false,
      })
    );
  }, [page]);

  const handleEndOfList = () => {
    if (!_.isNil(userStories) && _.size(userStories) < userStoriesInfo?.count) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (_.size(userStories) < page * PAGE_LIMIT) getUserStories();
  }, [page]);

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (inView) handleEndOfList();
  }, [inView]);
  return (
    <>
      {_.map(userStories, (story) => (
        <PostCard
          key={story._id}
          normalMenu
          authorUrl={`/${story.username}`}
          authorName={story.username}
          authorImage={story.userProfilePicture}
          storyUrl={`/story/${story.storySlug}`}
          timeAgo={DateTime.fromISO(story.createdAt).toRelative()}
          title={story.title}
          infoText={story.excerpt}
          badgeName={_.first(story.categoryNames)}
          min={story.estimatedReadingTime}
          images={_.first(story.storyImages)}
          optionButtons={{
            editStory: () => {
              router.push(`/write-a-story?id=${story._id}`);
            },
            storySettings: () => {
              router.push(`/write-a-story-settings?id=${story._id}`);
            },
            storyStats: () => {
              router.push(`stats-blog-post?id=${story._id}`);
            },
            deleteStory: () => {
              setDeletedStory({
                storyId: story._id,
                categoryNames: story.categoryNames,
                isPublished: story.isPublished,
              });
            },
          }}
          actionMenu
          story={story}
        />
      ))}
      <div ref={setRefs} />
    </>
  );
}

export default MyStoriesPublished;
