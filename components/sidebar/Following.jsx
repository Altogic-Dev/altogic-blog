import _ from 'lodash';
import Link from 'next/link';
import SidebarTitle from '../SidebarTitle';

export default function Following({ followings, count, seeAllButton }) {
  return (
    <div>
      <SidebarTitle title="Following" spacing="mb-4" />
      <div className="flex flex-col gap-3">
        {followings?.map((person) => (
          <a
            key={person._id}
            href={`/${person.followingUsername}`}
            className="inline-flex items-center gap-2 text-slate-700 text-sm font-medium tracking-sm hover:text-purple-700"
          >
            <img
              className="w-6 h-6 rounded-full"
              src={person.followingUserProfilePicture}
              alt={person.followingName}
            />
            <span>{person.followingName}</span>
          </a>
        ))}
        <Link href="#">
          <button
            className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700"
            onClick={seeAllButton}
          >
            See all ({count})
            <svg
              className="w-5 h-5 text-purple-700"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
