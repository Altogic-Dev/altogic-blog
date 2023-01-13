/* eslint-disable no-nested-ternary */
import React, {  useState, useRef } from 'react';
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

function ProfilePageHome({ userId, isMyProfile, setPage }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const userStories = useSelector((state) => state.story.userStories);
  const userStoriesOwner = useSelector((state) => state.story.userStoriesOwner);
  const userStoriesInfo = useSelector((state) => state.story.userStoriesInfo);
  const bookmarkLists = useSelector((state) => state.bookmark.bookmarkLists);
  const firstUpdate = useRef(true);
  const [deletedStory, setDeletedStory] = useState(null);

  console.log(userStoriesOwner)
  
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
  return (
    <>
      {userStoriesOwner && userId ? (
        userStories?.length > 0 ? (
          <ListObserver onEnd={handleEndOfList}>
            {_.map(userStories, (story) => (
              <PostCard
                publication={story.publication}
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
                    dispatch(storyActions.clearStory());
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
              isMyProfile ? 'pb-10' : ''
            }`}
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
              <FlagIcon className="w-7 h-7 text-purple-600" />
            </span>
            <p className="text-slate-500 text-md  ">No stories yet</p>

            {isMyProfile && (
              <Button
                extraClasses="mt-10"
                onClick={() => {
                  dispatch(storyActions.clearStory());
                  router.push('/write-a-story');
                }}
              >
                Write a Story
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
