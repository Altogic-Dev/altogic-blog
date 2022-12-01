import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { subscribeConnectionActions } from '@/redux/subscribeConnection/subscribeConnectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../profile/Avatar';
import Button from '../basic/button';

export default function UserCard({ subscription, user, isFollowing }) {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.auth.user);

  const followingUserLoading = useSelector(
    (state) => state.followerConnection.followingUserLoading
  );
  const buttonTexts = subscription
    ? ['Unsubscribe', 'Subscribe']
    : ['Unfollow', 'Follow'];
  const router = useRouter();
  const [followingLoad, setFollowingLoad] = useState(false);

  const toggleSubscribe = () => {
    if (subscription) {
      return dispatch(
        subscribeConnectionActions.unSubscribeRequest(_.get(user, '_id'))
      );
    }
    return dispatch(
      subscribeConnectionActions.subscribeRequest(_.get(user, '_id'))
    );
  };
  const toggleFollow = () => {
    if (subscription) {
      toggleSubscribe();
    } else {
      setFollowingLoad(true);
      if (isFollowing) {
        dispatch(
          followerConnectionActions.unfollowRequest({
            userId: _.get(me, '_id'),
            followingUserId: _.get(user, '_id'),
            followingUsername: _.get(user, 'username'),
          })
        );
      } else {
        dispatch(
          followerConnectionActions.followRequest({
            followerUser: me,
            followingUser: {
              followingUser: _.get(user, '_id'),
              followingName: _.get(user, 'name'),
              followingUserProfilePicture: _.get(user, 'profilePicture'),
              followingUsername: _.get(user, 'username'),
            },
          })
        );
      }
    }

  };
 

  useEffect(() => {
    setFollowingLoad(false);
  }, [isFollowing]);

  return (
    <li key={user._id} className="flex items-start justify-between gap-3 py-4">
      <Link href={`/${user.username}`}>
        <a className="flex items-center gap-3">
          <div className="flex gap-3">
            <Avatar
              className="w-10 h-10 rounded-full"
              placeholderName={user?.name}
              src={user.profilePicture}
              alt={user.name}
            />
            <div className="flex flex-col">
              <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                {user.name}
              </span>
              {user?.about && (
                <p
                  className="text-slate-500 text-xs tracking-sm"
                  dangerouslySetInnerHTML={{ __html: user.about }}
                />
              )}
            </div>
          </div>
        </a>
      </Link>
      {me?._id !== user?._id && (
        <Button
          loading={followingUserLoading && followingLoad}
          onClick={() => (me ? toggleFollow() : router.push('/login'))}
          className={`inline-flex items-center px-4 py-2 border gap-2 border-transparent text-sm font-medium rounded-full tracking-sm  transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      `.concat(
            isFollowing
              ? 'text-slate-700 bg-slate-100'
              : 'bg-purple-500 text-white'
          )}
          disabled={followingLoad}
        >
          {isFollowing ? buttonTexts[0] : buttonTexts[1]}
        </Button>
      )}
    </li>
  );
}
