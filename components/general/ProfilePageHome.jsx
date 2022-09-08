import React, { useEffect, useState, useCallback } from 'react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import PostCard from '../PostCard';
import ListObserver from '../ListObserver';

function ProfilePageHome({ userId, bookmarkLists }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const userStories = useSelector((state) => state.story.userStories);

  const [page, setPage] = useState(1);
  const PAGE_LIMIT = 6;

  const getUserStories = useCallback(() => {
    dispatch(
      storyActions.getUserStoriesRequest({
        userId,
        page,
        limit: PAGE_LIMIT,
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
          bookmarkLists={bookmarkLists}
          story={story}
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
              dispatch(storyActions.deleteStoryRequest({ storyId: story._id }));
            },
          }}
          actionMenu
        />
      ))}
    </ListObserver>
  );
}

export default ProfilePageHome;
