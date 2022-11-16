import { useCallback, useEffect, useRef } from 'react';

import _ from 'lodash';

import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { FlagIcon } from '@heroicons/react/outline';
import { storyActions } from '@/redux/story/storySlice';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import Button from '../basic/button';


function MyStoriesPublished({
  setDeletedStory,
  userStoriesInfo,
  setPage,
  userStories,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView();

  const handleEndOfList = () => {
    if (!_.isNil(userStories) && _.size(userStories) < userStoriesInfo?.count) {
      setPage((prev) => prev + 1);
    }
  };

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
    <div>
      {_.size(userStories) > 0 ? (
        <div className="divide-y divide-gray-200">
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
              story={story}
            />
          ))}
          <div ref={setRefs} />
        </div>
      ) : (
        <div className="border-b-2 my-10 pb-10 items-center flex flex-col">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
            <FlagIcon className="w-7 h-7 text-purple-600" />
          </span>
          <p className="text-slate-500 text-md">
            You don{`'`}t have any published stories
          </p>

          <Button
            extraClasses="mt-10"
            onClick={() => router.push('/write-a-story')}
          >
            Write a Story
          </Button>
        </div>
      )}
    </div>
  );
}

export default MyStoriesPublished;
