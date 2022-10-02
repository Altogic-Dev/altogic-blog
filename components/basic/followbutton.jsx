import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';
import Button from './button';

export default function FollowButton({ onClick, isFollowing, isLoading }) {
  return (
    <Button
      loading={isLoading}
      extraClasses="gap-2 px-[14px] "
      onClick={onClick}
    >
      {isFollowing ? (
        <UserRemoveIcon className="w-5 h-5" />
      ) : (
        <UserAddIcon className="w-5 h-5" />
      )}
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
