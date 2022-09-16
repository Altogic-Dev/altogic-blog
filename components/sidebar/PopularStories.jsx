import { DateTime } from 'luxon';
import Link from 'next/link';
import SidebarTitle from '../SidebarTitle';

export default function PopularStories({ title, stories }) {
  return (
    <div>
      <SidebarTitle title={title} spacing="mb-4" />
      <ul className="space-y-3">
        {stories?.map((story) => (
          <Link href={`/story/${story.slug}`} key={story._id}>
            <a className="flex items-center gap-3">
              <li className="flex gap-3">
                <img
                  className="rounded-full w-[30px] h-[30px]"
                  src={story.storyImages[0]}
                  alt={story.title}
                />
                <div className="flex justify-center">
                  <div className="flex flex-col text-sm font-light tracking-sm">
                    <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
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
