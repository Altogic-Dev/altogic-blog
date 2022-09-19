import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import { subscribeConnectionActions } from '@/redux/subscribeConnection/subscribeConnectionSlice';

export default function Profile({ profile, isFollowing, isSubscribed }) {
  const sessionUser = useSelector((state) => state.auth.user);
  const isMyProfile = _.get(sessionUser, '_id') === _.get(profile, 'id');
  const dispatch = useDispatch();
  const [isMyProfileState, setIsMyProfileState] = useState();

  const toggleFollow = () => {
    if (isFollowing) {
      return dispatch(
        followerConnectionActions.unfollowRequest({
          userId: _.get(sessionUser, '_id'),
          followingUserId: _.get(profile, 'id'),
        })
      );
    }
    return dispatch(
      followerConnectionActions.followRequest({
        followerUser: sessionUser,
        followingUser: {
          followingUser: _.get(profile, 'id'),
          followingName: _.get(profile, 'name'),
          followingUserProfilePicture: _.get(profile, 'profilePicture'),
          followingUsername: _.get(profile, 'username'),
        },
      })
    );
  };

  const toggleSubscribe = () => {
    if (isSubscribed) {
      return dispatch(
        subscribeConnectionActions.unSubscribeRequest({
          userId: _.get(sessionUser, '_id'),
          subscribingUserId: _.get(profile, 'id'),
        })
      );
    }
    return dispatch(
      subscribeConnectionActions.subscribeRequest({
        userId: _.get(sessionUser, '_id'),
        userEmail: _.get(sessionUser, 'email'),
        subscribingUserId: _.get(profile, 'id'),
      })
    );
  };

  useEffect(() => {
    setIsMyProfileState(isMyProfile);
  }, [isMyProfile]);
  return (
    <div>
      <img
        className="w-20 h-20 mb-3 rounded-full"
        src={_.get(profile, 'profilePicture')}
        alt=""
      />
      <div className="tracking-sm">
        <h2 className="text-slate-700 text-base font-medium">
          {_.get(profile, 'name')}
        </h2>
        <span className="inline-block mb-3 text-slate-500 text-sm">
          {_.get(profile, 'followerCount')} Followers
        </span>
        <p
          className="text-slate-500 text-xs mb-8"
          dangerouslySetInnerHTML={{ __html: _.get(profile, 'about') }}
        />
        <div className="grid grid-cols-2 lg:flex lg:items-center gap-4">
          {!isMyProfileState && (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={toggleFollow}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10.0001 13.75C10.4603 13.75 10.8334 13.3769 10.8334 12.9167C10.8334 12.4564 10.4603 12.0833 10.0001 12.0833V13.75ZM4.03246 13.0602L4.27437 13.8576L4.03246 13.0602ZM0.833415 17.5C0.833415 17.9602 1.20651 18.3333 1.66675 18.3333C2.12699 18.3333 2.50008 17.9602 2.50008 17.5H0.833415ZM1.81028 15.2824L2.60773 15.5243L1.81028 15.2824ZM15.0001 17.5C15.0001 17.9602 15.3732 18.3333 15.8334 18.3333C16.2937 18.3333 16.6667 17.9602 16.6667 17.5H15.0001ZM16.6667 12.5C16.6667 12.0398 16.2937 11.6667 15.8334 11.6667C15.3732 11.6667 15.0001 12.0398 15.0001 12.5H16.6667ZM13.3334 14.1667C12.8732 14.1667 12.5001 14.5398 12.5001 15C12.5001 15.4602 12.8732 15.8333 13.3334 15.8333V14.1667ZM18.3334 15.8333C18.7937 15.8333 19.1667 15.4602 19.1667 15C19.1667 14.5398 18.7937 14.1667 18.3334 14.1667V15.8333ZM6.25009 13.75H10.0001V12.0833H6.25009V13.75ZM6.25009 12.0833C5.14774 12.0833 4.41183 12.0743 3.79056 12.2627L4.27437 13.8576C4.59942 13.759 5.02648 13.75 6.25009 13.75V12.0833ZM2.50008 17.5C2.50008 16.2764 2.50913 15.8493 2.60773 15.5243L1.01283 15.0405C0.824369 15.6617 0.833415 16.3977 0.833415 17.5H2.50008ZM3.79056 12.2627C2.45889 12.6667 1.41679 13.7088 1.01283 15.0405L2.60773 15.5243C2.85011 14.7253 3.47537 14.1 4.27437 13.8576L3.79056 12.2627ZM11.2501 6.25C11.2501 7.86083 9.94425 9.16667 8.33342 9.16667V10.8333C10.8647 10.8333 12.9167 8.78131 12.9167 6.25H11.2501ZM8.33342 9.16667C6.72258 9.16667 5.41675 7.86083 5.41675 6.25H3.75008C3.75008 8.78131 5.80211 10.8333 8.33342 10.8333V9.16667ZM5.41675 6.25C5.41675 4.63917 6.72258 3.33333 8.33342 3.33333V1.66667C5.80211 1.66667 3.75008 3.71869 3.75008 6.25H5.41675ZM8.33342 3.33333C9.94425 3.33333 11.2501 4.63917 11.2501 6.25H12.9167C12.9167 3.71869 10.8647 1.66667 8.33342 1.66667V3.33333ZM16.6667 17.5V12.5H15.0001V17.5H16.6667ZM13.3334 15.8333H18.3334V14.1667H13.3334V15.8333Z"
                  fill="currentColor"
                />
              </svg>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
          {!isMyProfileState && (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
            </button>
          )}

          {isMyProfileState && (
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
