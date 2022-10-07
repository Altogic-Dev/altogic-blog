import React, { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import ListObserver from '@/components/ListObserver';
import PostCard from '../PostCard';

function ProfilePageHome({ userId, bookmarkLists }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const userStories = useSelector((state) => state.story.userStories);
  const firstUpdate = useRef(true);

  const [page, setPage] = useState(1);
  const PAGE_LIMIT = 6;

  const handleEndOfList = () => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setPage((prev) => prev + 1);
  };

  const getUserStoriesRequest = () => {
    dispatch(
      storyActions.getUserStoriesRequest({
        userId,
        page,
        limit: PAGE_LIMIT,
      })
    );
  };

  useEffect(() => {
    if (userId) {
      getUserStoriesRequest();
    }
  }, [userId, page]);

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
