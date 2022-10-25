/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import { FlagIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import ListObserver from '@/components/ListObserver';
import PostCard from '../PostCard';
import DeleteStoryModal from '../DeleteStoryModal';
import Button from '../basic/button';

function ProfilePageHome({ userId, selectedIndex, isMyProfile }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userStories = useSelector((state) => state.story.userStories);
  const userStoriesOwner = useSelector((state) => state.story.userStoriesOwner);
  const userStoriesInfo = useSelector((state) => state.story.userStoriesInfo);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const firstUpdate = useRef(true);
  const [page, setPage] = useState(1);
  const [deletedStory, setDeletedStory] = useState(null);
  const PAGE_LIMIT = 6;

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
          <div
            className={`border-b-2 my-10 pb-10 items-center flex flex-col ${
              isMyProfile ? 'pb-10' :  ''
            }`}
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
              <FlagIcon className="w-7 h-7 text-purple-600" />
            </span>
            <p className="text-slate-500 text-md  ">No Stories Yet</p>

            {isMyProfile && (
              <Button
                extraClasses="mt-10"
                onClick={() => router.push('/write-a-story')}
              >
                Create Story
              </Button>
            )}
          </div>
        )
      ) : (
        <ClipLoader className="my-10" />
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
