import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import ListObserver from '@/components/ListObserver';
import { storyActions } from '@/redux/story/storySlice';
import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../basic/button';

function MyStoriesPublished({ setDeletedStory }) {
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
    getUserStories();
  }, [page]);

  return (
    <div>
      {_.size(userStories) > 0 ? (
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
        </ListObserver>
      ) : (
        <div>
          <p className="text-slate-500 text-md my-10 border-b-2 pb-10">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            You don't have any published stories.
            <span className="ml-3">
              <Link href="/write-a-story">
                <Button>Write a story</Button>
              </Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default MyStoriesPublished;
