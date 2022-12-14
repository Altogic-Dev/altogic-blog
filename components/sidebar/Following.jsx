import Link from 'next/link';
import Button from '../basic/button';
import Avatar from '../profile/Avatar';
import SidebarTitle from '../SidebarTitle';

export default function Following({ followings, count, seeAllButton }) {
  if (count)
    return (
      <div>
        <SidebarTitle title="Following" spacing="mb-4" />
        <div className="flex flex-col gap-3">
          {followings?.map((person) => (
            <Link key={person._id} href={`/${person.followingUsername}`}>
              <a className="inline-flex items-center gap-2 text-slate-700 text-sm font-medium tracking-sm hover:text-purple-700">
                <Avatar
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                  placeholderName={person.followingName}
                  src={person.followingUserProfilePicture}
                  alt={person.followingName}
                />
                <span>{person.followingName}</span>
              </a>
            </Link>
          ))}

          <Button
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
          </Button>
        </div>
      </div>
    );
}
