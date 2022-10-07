import React, { Fragment, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, Dialog } from '@headlessui/react';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';
import Topic from '../basic/topic';

function About(props) {
  const {
    userId,
    about,
    signUpAt,
    topWriterTopics,
    followerCount,
    followingCount,
    toggleFollowingsModal,
  } = props;
  const dispatch = useDispatch();

  const userFollowers = useSelector(
    (state) => state.followerConnection.userFollowers
  );
  const [followersModal, setFollowersModal] = useState(false);
  const [followerPage, setFollowerPage] = useState(1);

  const toggleFollowersModal = () => {
    if (!followersModal && _.isEmpty(userFollowers)) {
      dispatch(
        followerConnectionActions.getFollowerUsersRequest({
          userId,
          page: followerPage,
        })
      );
    }
    setFollowersModal((prev) => !prev);
  };

  useEffect(() => {
    if (followerPage > 1) {
      dispatch(
        followerConnectionActions.getFollowerUsersRequest({
          userId,
          page: followerPage,
        })
      );
    }
  }, [followerPage]);

  return (
    <>
      <div className="prose text-lg font-normal tracking-sm text-slate-500 max-w-full">
        <p dangerouslySetInnerHTML={{ __html: about }} />
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
          <span>Top writer in</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {_.map(topWriterTopics, (topic) => (
            <Topic title={topic.name} key={topic} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-slate-500 text-base tracking-sm py-10 border-b border-slate-200">
        <button type="button" onClick={toggleFollowersModal}>
          {followerCount} Followers
        </button>
        <svg
          className="h-1 w-1 text-slate-500"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        <button type="button" onClick={toggleFollowingsModal}>
          {followingCount} Following
        </button>
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
                        {_.map(userFollowers, (follower) => (
                          <li
                            key={follower._id}
                            className="flex items-start justify-between gap-6 py-4"
                          >
                            <div className="flex gap-3">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={follower.followerUserProfilePicture}
                                alt={follower.followerName}
                              />
                              <div className="flex flex-col">
                                <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                                  {follower.followerName}
                                </span>
                                <span className="text-slate-500 text-xs tracking-sm">
                                  {follower.followerAbout}
                                </span>
                              </div>
                            </div>
                            <a
                              // href={following.href}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Follow
                            </a>
                          </li>
                        ))}
                      </ul>
                      <div className="text-center">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                          onClick={() => setFollowerPage((prev) => prev + 1)}
                        >
                          Show more
                        </button>
                      </div>
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
