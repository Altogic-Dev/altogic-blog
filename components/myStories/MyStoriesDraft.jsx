import _ from 'lodash';
import ListObserver from '@/components/ListObserver';
import PostCard from '@/components/PostCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../basic/button';

function MyStoriesDraft({ setDeletedStory, handleEndOfList, userStories }) {
  const router = useRouter();

  return (
    <div>
      {_.size(userStories) > 0 ? (
        <ListObserver onEnd={handleEndOfList}>
          {_.map(userStories, (story) => (
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
        </ListObserver>
      ) : (
        <p className="text-slate-500 text-md my-10 border-b-2 pb-10">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          You don't have any draft stories.
          <span className="ml-3">
            <Link href="/write-a-story">
              <Button>Write a story</Button>
            </Link>
          </span>
        </p>
      )}
    </div>
  );
}

export default MyStoriesDraft;
