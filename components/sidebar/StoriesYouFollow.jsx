import ListObserver from '../ListObserver';
import Avatar from '../profile/Avatar';
import SidebarTitle from '../SidebarTitle';

export default function StoriesYouFollow({ storiesYouFollow }) {
  // getFollowingRequest() on End

  return (
    <div>
      <SidebarTitle title="Stories you follow" spacing="mb-4" />
      <div className="flex items-center gap-3 overflow-x-auto">
        <ListObserver onEnd={() => console.log('sas')}>
          {storiesYouFollow?.map((storiesFollow) => (
            <a
              key={storiesFollow._id}
              href={storiesFollow.href}
              className="relative flex-shrink-0"
            >
              <Avatar
                className="w-14 h-14 rounded-full"
                src={storiesFollow.followingUserProfilePicture}
                alt={storiesFollow.followingUserName}
              />
              {storiesFollow.unreadStories > -1 && (
                <span className="inline-flex items-center justify-center absolute bottom-0 right-0 w-[18px] h-[18px] bg-purple-500 text-white text-xs tracking-sm rounded-full ring-2 ring-white">
                  {storiesFollow.unreadStories}
                </span>
              )}
            </a>
          ))}
        </ListObserver>
      </div>
    </div>
  );
}
