import _ from 'lodash';
import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import { useInView } from 'react-intersection-observer';

function MyStoriesDraft({
  setDeletedStory,
  userDraftStoriesInfo,
}) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userDraftStories = useSelector((state) => state.story.userDraftStories);
  const { ref: inViewRef, inView } = useInView();
  const ref = useRef();

  const DRAFT_PAGE_LIMIT = 3;

  const handleEndOfList = () => {
    if (
      !_.isNil(userDraftStories) &&
      _.size(userDraftStories) < userDraftStoriesInfo?.count
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const getUserDraftStories = useCallback(() => {
    dispatch(
      storyActions.getUserDraftStoriesRequest({
        page,
        limit: DRAFT_PAGE_LIMIT,
        isPublishedFilter: false,
      })
    );
  }, [page]);

  useEffect(() => {
    if (_.size(userDraftStories) < page * DRAFT_PAGE_LIMIT)
      getUserDraftStories();
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
      {_.map(userDraftStories, (story) => (
        <PostCard
          key={story._id}
          noActiveBookmark
          normalMenu
          authorUrl={`/${story.username}`}
          authorName={story.username}
          authorImage={story.userProfilePicture}
          storyUrl={`/write-a-story?id=${story._id}`}
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
          draft
        />
      ))}
      <div ref={setRefs} />
    </>
  );
}

export default MyStoriesDraft;
