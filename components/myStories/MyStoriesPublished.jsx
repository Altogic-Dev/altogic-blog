import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import ListObserver from '@/components/ListObserver';
import { storyActions } from '@/redux/story/storySlice';
import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';

function MyStoriesPublished() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const userStories = useSelector((state) => state.story.userStories);
  const PAGE_LIMIT = 6;

  const getUserStories = useCallback(() => {
    dispatch(
      storyActions.getUserStoriesRequest({
        page,
        limit: PAGE_LIMIT,
        isPublishedFilter: false,
      })
    );
  }, [page]);

  const handleEndOfList = () => {
    if (!_.isNil(userStories) && _.size(userStories) >= PAGE_LIMIT) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1 || _.isNil(userStories)) getUserStories();
  }, [page]);

  return (
    <ListObserver onEnd={handleEndOfList}>
      {_.map(userStories, (story) => (
        <PostCard
          key={story._id}
          noActiveBookmark
          normalMenu
          authorUrl={`/${story.username}`}
          authorName={story.username}
          authorImage={story.userProfilePicture}
          storyUrl={`/story/${story.storySlug}`}
          timeAgo={DateTime.fromISO(story.createdAt).toRelative()}
          title={story.title}
          infoText={story.excerpt}
          badgeUrl="badgeUrl"
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
              dispatch(storyActions.deleteStoryRequest(story._id));
            },
          }}
          actionMenu
        />
      ))}
    </ListObserver>
  );
}

export default MyStoriesPublished;
