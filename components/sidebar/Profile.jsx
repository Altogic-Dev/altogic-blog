import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Link from 'next/link';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { subscribeConnectionActions } from '@/redux/subscribeConnection/subscribeConnectionSlice';
import FollowButton from '../basic/followbutton';
import Button from '../basic/button';
import Avatar from '../profile/Avatar';

export default function Profile({
  profile,
  isFollowing,
  isSubscribed,
  isLoading,
}) {
  const sessionUser = useSelector((state) => state.auth.user);
  const isLoadingSubscribe = useSelector(
    (state) => state.subscribeConnection.isLoading
  );
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [clickedIsLoading, setClickedIsLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleFollow = () => {
    setClickedIsLoading(true);
    if (isFollowing) {
      return dispatch(
        followerConnectionActions.unfollowRequest({
          userId: _.get(sessionUser, '_id'),
          followingUserId: _.get(profile, '_id'),
          notUpdate: true,
        })
      );
    }
    return dispatch(
      followerConnectionActions.followRequest({
        followerUser: sessionUser,
        followingUser: {
          followingUser: _.get(profile, '_id'),
          followingName: _.get(profile, 'name'),
          followingUserProfilePicture: _.get(profile, 'profilePicture'),
          followingUsername: _.get(profile, 'username'),
        },
        notUpdate: true,
      })
    );
  };

  const toggleSubscribe = () => {
    if (isSubscribed) {
      return dispatch(
        subscribeConnectionActions.unSubscribeRequest(_.get(profile, '_id'))
      );
    }
    return dispatch(
      subscribeConnectionActions.subscribeRequest(_.get(profile, '_id'))
    );
  };

  useEffect(() => {
    if (sessionUser) {
      setIsMyProfile(sessionUser._id === profile._id);
    }
  }, [sessionUser]);

  useEffect(() => {
    if (!isLoading) {
      setClickedIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div>
      <Link href={`/${profile.username}`}>
        <a>
          <Avatar
            className="w-20 h-20 mb-3 rounded-full"
            src={_.get(profile, 'profilePicture')}
            alt={_.get(profile, 'name')}
            placeholderName={_.get(profile, 'name')}
          />
        </a>
      </Link>
      <div className="tracking-sm">
        <Link href={`/${profile.username}`}>
          <a>
            <h2 className="text-slate-700 text-base font-medium">
              {_.get(profile, 'name')}
            </h2>
          </a>
        </Link>
        <span className="inline-block mb-3 text-slate-500 text-sm">
          {_.get(profile, 'followerCount')} Followers
        </span>
        <p
          className="text-slate-500 text-xs mb-8"
          dangerouslySetInnerHTML={{ __html: _.get(profile, 'about') }}
        />
        <div className="grid grid-cols-2 lg:flex lg:items-center gap-4">
          {!isMyProfile && sessionUser && (
            <FollowButton
              isLoading={isLoading && clickedIsLoading}
              isFollowing={isFollowing}
              onClick={toggleFollow}
            />
          )}
          {!isMyProfile && sessionUser && (
            <Button
              primaryColor
              extraClasses="inline-flex gap-2"
              disabled={isLoadingSubscribe}
              loading={isLoadingSubscribe}
              onClick={toggleSubscribe}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g clipPath="url(#clip0_736_24616)">
                  <path
                    d="M11.5293 3.33333H5.66675C4.26662 3.33333 3.56655 3.33333 3.03177 3.60581C2.56137 3.8455 2.17892 4.22795 1.93923 4.69835C1.66675 5.23313 1.66675 5.9332 1.66675 7.33333V12.6667C1.66675 14.0668 1.66675 14.7669 1.93923 15.3016C2.17892 15.772 2.56137 16.1545 3.03177 16.3942C3.56655 16.6667 4.26662 16.6667 5.66675 16.6667H14.3334C15.7335 16.6667 16.4336 16.6667 16.9684 16.3942C17.4388 16.1545 17.8212 15.772 18.0609 15.3016C18.3334 14.7669 18.3334 14.0668 18.3334 12.6667V8.33333M1.66675 5.83333L8.47085 10.5962C9.02182 10.9819 9.29731 11.1747 9.59697 11.2494C9.86166 11.3154 10.1385 11.3154 10.4032 11.2494C10.7029 11.1747 10.9783 10.9819 11.5293 10.5962L14.3334 8.33333"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.6667 5.83333C15.6667 6.38561 16.1145 6.83333 16.6667 6.83333C17.219 6.83333 17.6667 6.38561 17.6667 5.83333H15.6667ZM17.6667 0.833328C17.6667 0.281043 17.219 -0.166672 16.6667 -0.166672C16.1145 -0.166672 15.6667 0.281043 15.6667 0.833328H17.6667ZM14.1667 2.33333C13.6145 2.33333 13.1667 2.78104 13.1667 3.33333C13.1667 3.88561 13.6145 4.33333 14.1667 4.33333V2.33333ZM19.1667 4.33333C19.719 4.33333 20.1667 3.88561 20.1667 3.33333C20.1667 2.78104 19.719 2.33333 19.1667 2.33333V4.33333ZM17.6667 5.83333V0.833328H15.6667V5.83333H17.6667ZM14.1667 4.33333H19.1667V2.33333H14.1667V4.33333Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_736_24616">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          )}
          {isMyProfile && (
            <Link href="/settings">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 col-span-2 w-full lg:w-auto px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Edit Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
