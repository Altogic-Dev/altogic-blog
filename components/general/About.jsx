import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { DateTime } from 'luxon';
import _, { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, Dialog } from '@headlessui/react';
import { htmlToText } from 'html-to-text';
import Link from 'next/link';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import Topic from '../basic/topic';
import Button from '../basic/button';
import UserCard from './UserCard';

function About(props) {
  const {
    userId,
    about,
    signUpAt,
    topWriterTopics,
    followerCount,
    followingCount,
    toggleFollowingsModal,
    isMyProfile,
    username,
  } = props;
  const PAGE_LIMIT = 5;
  const dispatch = useDispatch();

  const userFollowers = useSelector((state) =>
    _.get(state.followerConnection.followersData[username], 'userFollowers')
  );

  const userFollowersCount = useSelector((state) =>
    _.get(state.followerConnection.followersData[username], 'count')
  );

  const myFollowings = useSelector(
    (state) => state.followerConnection.myFollowings
  );

  const [followersModal, setFollowersModal] = useState(false);
  const [followerPage, setFollowerPage] = useState(0);

  const toggleFollowersModal = () => {
    setFollowerPage(1);
    setFollowersModal((prev) => !prev);
  };
  const getFollowingUsers = useCallback(() => {
    dispatch(
      followerConnectionActions.getFollowerUsersRequest({
        username,
        userId,
        page: followerPage,
        limit: PAGE_LIMIT,
      })
    );
  }, [followerPage, userId]);

  useEffect(() => {
    if (
      followerPage &&
      (!userFollowersCount ||
        (_.size(userFollowers) < PAGE_LIMIT * followerPage &&
          _.size(userFollowers) < userFollowersCount))
    ) {
      getFollowingUsers();
    }
  }, [followerPage]);

  return (
    <>
      <div className="prose text-lg font-normal tracking-sm text-slate-500 max-w-full ">
        {/* eslint-disable-next-line no-nested-ternary */}
        {isMyProfile && isEmpty(htmlToText(about).trim()) ? (
          <p className="text-sm">
            Let others know who you are.
            <Link href="/settings">
              <a className="text-purple-500 no-underline">
                {' '}
                Click here to edit your profile.
              </a>
            </Link>
          </p>
        ) : isEmpty(htmlToText(about).trim()) ? (
          <p className="text-sm">No Information</p>
        ) : (
          <p
            className="w-full break-words "
            dangerouslySetInnerHTML={{ __html: about }}
          />
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-slate-500 text-base tracking-sm py-10 mt-10 border-t border-b border-slate-200">
        <div className="flex items-center gap-2 md:gap-4">
          <span>
            Member since{' '}
            {DateTime.fromISO(signUpAt).toLocaleString({
              year: 'numeric',
              month: 'long',
            })}
          </span>
          <svg
            className="h-1 w-1 text-slate-500"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          {topWriterTopics?.length > 0 && <span>Top writer in</span>}
        </div>
        {topWriterTopics && (
          <div className="flex flex-wrap items-center justify-start gap-4 w-7/12">
            {_.map(topWriterTopics, (topic) => (
              <Topic title={topic} key={topic} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 text-slate-500 text-base tracking-sm py-10 border-b border-slate-200">
        <Button onClick={followerCount ? toggleFollowersModal : null}>
          {followerCount ?? 0 } Followers
        </Button>
        <svg
          className="h-1 w-1 text-slate-500"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        <Button onClick={followingCount ? toggleFollowingsModal : null}>
          {followingCount ?? 0} Following
        </Button>
        <Transition appear show={followersModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={toggleFollowersModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold text-slate-700 mb-6 tracking-md text-center"
                    >
                      {followerCount} Followers
                    </Dialog.Title>
                    <div>
                      <ul className="mb-6">
                        {_.map(userFollowers, (person) => (
                          <UserCard
                            key={person._id}
                            user={{
                              _id: person.followerUser,
                              name: person.followerName,
                              username: person.followerUsername,
                              profilePicture: person.followerUserProfilePicture,
                              about: person.followerAbout,
                            }}
                            isFollowing={_.some(
                              myFollowings,
                              (user) =>
                                user.followingUser === person.followerUser
                            )}
                          />
                        ))}
                      </ul>

                      {followerCount > _.size(userFollowers) && (
                        <div className="text-center">
                          <Button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                            onClick={() => setFollowerPage((prev) => prev + 1)}
                          >
                            Show more
                          </Button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default About;
