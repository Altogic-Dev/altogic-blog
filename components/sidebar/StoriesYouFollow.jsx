import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import Avatar from '../profile/Avatar';
import SidebarTitle from '../SidebarTitle';

const ListObserver = dynamic(import('../ListObserver'), {
  ssr: false,
});

export default function StoriesYouFollow({ storiesYouFollow }) {
  const dispatch = useDispatch();

  const handleListEnd = () => {
    dispatch(followerConnectionActions.increaseFollowingStoriesPage());
  };
  return (
    <div>
      <SidebarTitle title="Stories you follow" spacing="mb-4" />
      <span className="flex items-center gap-3 overflow-x-auto ">
        <ListObserver onEnd={handleListEnd}>
          {storiesYouFollow.map((storiesFollow) => (
            <a
              key={storiesFollow._id}
              href={`/${storiesFollow.followingUsername}`}
              className="group relative flex-shrink-0"
            >
              <Avatar
                className="rounded-full w-14 h-14  "
                src={storiesFollow.followingUserProfilePicture}
                alt={storiesFollow.followingUsername}
              />
              {storiesFollow.unreadStories ? (
                <span className="inline-flex items-center justify-center absolute bottom-0 right-0 w-[18px] h-[18px] bg-purple-500 text-white text-xs tracking-sm rounded-full ring-2 ring-white">
                  {storiesFollow.unreadStories}
                </span>
              ) : null}
              {/* <div className="hidden absolute top-14 right-0 xl:left-0 w-[330px] p-4 bg-white shadow-xl rounded-lg space-y-4 z-50 group-hover:block">
              <div className="flex items-center gap-3">
                <Avatar
                  className="w-[60px] h-[60px] rounded-full object-cover"
                  src={storiesFollow.followingUserProfilePicture}
                  alt=""
                />
                <div>
                  <span className="text-slate-700  text-base font-medium tracking-sm">
                    {storiesFollow.followingName}
                  </span>
                  <div className="text-slate-400 text-sm tracking-sm">
                    {storiesFollow.followingUsername}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                {storiesFollow.followingUserAbout}
              </p>
              <hr className="border-slate-200" />
              <div className="flex items-center justify-between gap-3.5">
                <span className="text-slate-600 text-sm tracking-sm">
                  Followed by <span className="text-slate-800">55464</span>{' '}
                  people
                </span>
                <FollowButton />
              </div>
            </div> */}
            </a>
          ))}
        </ListObserver>
      </span>
    </div>
  );
}
