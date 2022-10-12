import React from 'react';
import { parseHtml } from '@/utils/utils';
import Link from 'next/link';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../profile/Avatar';
import Button from '../basic/button';

export default function UserCard({ user, isFollowing }) {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.auth.user);
  const followingUserLoading = useSelector((state) => state.followerConnection.followingUserLoading);
  const toggleFollow = () => {
    if (isFollowing) {
      return dispatch(
        followerConnectionActions.unfollowRequest({
          userId: _.get(me, '_id'),
          followingUserId: _.get(user, '_id'),
          notUpdate: true,
        })
      );
    }
    return dispatch(
      followerConnectionActions.followRequest({
        followerUser: me,
        followingUser: {
          followingUser: _.get(user, '_id'),
          followingName: _.get(user, 'name'),
          followingUserProfilePicture: _.get(user, 'profilePicture'),
          followingUsername: _.get(user, 'username'),
        },
        notUpdate: true,
      })
    );
  };

  return (
    <li key={user._id} className="flex items-start justify-between gap-3 py-4">
      <Link href={`/${user.username}`}>
        <a className="flex items-center gap-3">
          <div className="flex gap-3">
            <Avatar
              className="w-10 h-10 rounded-full"
              src={user.profilePicture}
              alt={user.name}
            />
            <div className="flex flex-col">
              <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                {user.name}
              </span>
              {user?.about && (
                <span className="text-slate-500 text-xs tracking-sm">
                  {parseHtml(user.about)}
                </span>
              )}
            </div>
          </div>
        </a>
      </Link>
      <Button
        loading={followingUserLoading}
        onClick={toggleFollow}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm  transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      `.concat(
          isFollowing
            ? 'text-slate-700 bg-slate-100'
            : 'bg-purple-500 text-white'
        )}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </li>
  );
}
