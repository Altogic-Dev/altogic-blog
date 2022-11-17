import _ from 'lodash';
import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef } from 'react';
import { parseHtml } from '@/utils/utils';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import { FlagIcon } from '@heroicons/react/outline';
import Button from '../basic/button';

function MyStoriesDraft({
  setDeletedStory,
  userDraftStoriesInfo,
  setPage,
  userDraftStories,
}) {
  const router = useRouter();

  const { ref: inViewRef, inView } = useInView();
  const ref = useRef();
  const dispatch = useDispatch();

  const handleEndOfList = () => {
    if (
      !_.isNil(userDraftStories) &&
      _.size(userDraftStories) < userDraftStoriesInfo?.count
    ) {
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
      {_.size(userDraftStories) > 0 ? (
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
              infoText={parseHtml(story?.content).slice(0, 300)}
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
                deleteStory: () => {
                  setDeletedStory({
                    storyId: story._id,
                    categoryNames: story.categoryNames,
                    isPublished: story.isPublished,
                  });
                },
              }}
              pinnedStory={_.get(story, 'pinnedStory')}
              actionMenu
              draft
            />
          ))}
          <div ref={setRefs} />
        </>
      ) : (
        <div className="border-b-2 my-10 pb-10 items-center flex flex-col">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
            <FlagIcon className="w-7 h-7 text-purple-600" />
          </span>
          <p className="text-slate-500 text-md  ">
            You don{`'`}t have any draft stories{' '}
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

export default MyStoriesDraft;
