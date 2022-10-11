import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { storyActions } from '@/redux/story/storySlice';
import { useDispatch, useSelector } from 'react-redux';
import SidebarTitle from '../SidebarTitle';

export default function PopularStories({ title, stories }) {
  const popularStories = useSelector((state) => state.story.popularStories);
  const dispatch = useDispatch();
  const [storyList, setStoryList] = useState([]);

  useEffect(() => {
    if (!stories) {
      dispatch(storyActions.popularStoriesRequest());
    }
  }, [stories]);

  useEffect(() => {
    setStoryList(stories || popularStories);
  }, [popularStories, stories]);

  return (
    <div>
      <SidebarTitle title={title} spacing="mb-4" />
      <ul className="space-y-3">
        {storyList?.map((story) => (
          <Link href={`/story/${story.storySlug}`} key={story._id}>
            <a className="flex items-center gap-3">
              <li className="flex gap-3">
                {story.storyImages && story.storyImages.length > 0 ? (
                  <img
                    className="rounded-full w-[30px] h-[30px]"
                    src={story.storyImages[0]}
                    alt={story.title}
                  />
                ) : (
                  <div className="rounded-full w-[30px] h-[30px] bg-slate-200" />
                )}
                <div className="flex justify-center">
                  <div className="flex flex-col text-sm font-light tracking-sm">
                    <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm truncate w-40 mr-2">
                      {story.title}
                    </span>
                    <span className="text-slate-500 text-xs w-40 tracking-sm line-clamp-3">
                      {story.excerpt}
                    </span>
                  </div>
                  <span className="text-slate-400 text-xs">
                    {DateTime.fromISO(story.createdAt).toRelative()}
                  </span>
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
}
