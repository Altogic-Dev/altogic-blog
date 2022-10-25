/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import ListObserver from '@/components/ListObserver';
import PostCard from '../PostCard';
import DeleteStoryModal from '../DeleteStoryModal';
import Button from '../basic/button';

function ProfilePageHome({ userId, selectedIndex }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userStories = useSelector((state) => state.story.userStories);
  const user = useSelector((state) => state.auth.user);
  const userStoriesOwner = useSelector((state) => state.story.userStoriesOwner);
  const userStoriesInfo = useSelector((state) => state.story.userStoriesInfo);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const firstUpdate = useRef(true);
  const [page, setPage] = useState(1);
  const [deletedStory, setDeletedStory] = useState(null);
  const PAGE_LIMIT = 6;
  const isMyProfile = userId === _.get(user, '_id');

  const handleEndOfList = () => {
    if (
      userStories.length === userStoriesInfo.count ||
      userStories.length > userStoriesInfo.count
    ) {
      firstUpdate.current = false;
      return;
    }
    setPage((prev) => prev + 1);
  };

  const getUserStoriesRequest = () => {
    if (page === 0 || page === 1) {
      dispatch(
        storyActions.getUserStoriesRequest({
          userId,
          page,
          limit: PAGE_LIMIT,
        })
      );
    } else {
      dispatch(
        storyActions.getUserStoriesRequestNextPage({
          userId,
          page,
          limit: PAGE_LIMIT,
        })
      );
    }
  };

  useEffect(() => {
    if (userId && selectedIndex === 0 && userStoriesOwner !== userId) {
      getUserStoriesRequest();
    }
  }, [userId, page, selectedIndex]);

  return (
    <>
      {userStoriesOwner && userId ? (
        userStories?.length > 0 ? (
          <ListObserver onEnd={handleEndOfList}>
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
                    setDeletedStory({
                      storyId: story._id,
                      categoryNames: story.categoryNames,
                      isPublished: story.isPublished,
                    });
                  },
                }}
                actionMenu
              />
            ))}
          </ListObserver>
        ) : (
          <div className="border-b-2 pb-10">
            <p className="text-slate-500 text-md my-10 pb-10">No Stories Yet</p>
            {isMyProfile && (
              <Button onClick={() => router.push('/write-a-story')}>
                Create Story
              </Button>
            )}
          </div>
        )
      ) : (
        <ClipLoader />
      )}
      {deletedStory && (
        <DeleteStoryModal
          setDeleteStoryModal={() => setDeletedStory(null)}
          clickDelete={() => {
            dispatch(storyActions.deleteStoryRequest(deletedStory));
          }}
        />
      )}
    </>
  );
}

export default ProfilePageHome;
