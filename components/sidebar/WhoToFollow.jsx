import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { topicsActions } from '@/redux/topics/topicsSlice';
import { parseHtml } from '@/utils/utils';
import { recommendationsActions } from '@/redux/recommendations/recommendationsSlice';
import SidebarTitle from '../SidebarTitle';
import Button from '../basic/button';
import UserCard from '../general/UserCard';
import Avatar from '../profile/Avatar';

export default function WhoToFollow({ isTopWriters, Tag }) {
  const [whoToFollowModal, setWhoToFollowModal] = useState(false);
  const [people, setPeople] = useState([]);
  const [peopleMinimized, setPeopleMinimized] = useState([]);
  const isLoading = useSelector((state) => state.recommendations.isLoading);
  let page = 0;
  const whoToFollow = useSelector((state) => state.recommendations.whoToFollow);
  const whoToFollowMinimized = useSelector(
    (state) => state.recommendations.whoToFollowMinimized
  );
  const topWritersIdList = useSelector(
    (state) => state.topics.topWritersIdList
  );
  const topWriters = useSelector((state) => state.topics.topWriters);

  const dispatch = useDispatch();

  const getTopWritersIdList = (Tag, size) => {
    dispatch(topicsActions.getTopicTopWritersIdListRequest(Tag, size));
  };
  const getTopWriters = (idList) => {
    dispatch(topicsActions.getTopicTopWritersRequest(idList));
  };

  const getWhoToFollow = (page, size) => {
    dispatch(recommendationsActions.getWhoToFollowRequest({ page, size }));
  };
  const getWhoToFollowMinimized = () => {
    dispatch(recommendationsActions.getWhoToFollowMinimizedRequest());
  };

  const handleSeeMoreSuggestions = () => {
    if (isTopWriters) {
      const idList = topWritersIdList?.map((person) => person.groupby.group);
      getTopWriters(idList.slice(0, 20));
    } else {
      getWhoToFollow(1, 20);
    }
    setWhoToFollowModal(true);
  };

  const handleShowMore = () => {
    page += 1;
    if (isTopWriters) {
      const idList = topWritersIdList?.map((person) => person.groupby.group);
      getTopWriters(idList.slice(20 * (page - 1), 20 * page));
    } else {
      getWhoToFollow(page, 20);
    }
  };
  useEffect(() => {
    if (isTopWriters && Tag) {
      getTopWritersIdList(Tag, 10);
    }
  }, [Tag]);

  useEffect(() => {
    if (!isTopWriters) {
      getWhoToFollowMinimized();
    }
  }, []);

  useEffect(() => {
    if (isTopWriters) {
      if (whoToFollowModal) {
        setPeople(topWriters);
      } else {
        setPeopleMinimized(topWriters);
      }
    } else {
      setPeople((state) => [...state, ...whoToFollow]);
    }
  }, [whoToFollow, topWriters]);

  useEffect(() => {
    if (!isTopWriters) setPeopleMinimized(whoToFollowMinimized);
  }, [whoToFollowMinimized]);

  useEffect(() => {
    const idList = topWritersIdList?.map((person) => person.groupby.group);
    getTopWriters(idList.slice(0, 5));
  }, [topWritersIdList]);

  if (!isLoading)
    return (
      <div>
        <SidebarTitle title={isTopWriters ? 'Top Writers' : 'Who To Follow'} />
        <div>
          <ul className="divide-y divide-gray-200">
            {peopleMinimized?.map((person) => (

              <UserCard key={person._id} user={person} />
            ))}
          </ul>
          <Button
            onClick={handleSeeMoreSuggestions}
            className="inline-flex items-center gap-2 mt-4 text-sm tracking-sm text-purple-700"
            type="button"
          >
            See more suggestions
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
          <Transition appear show={whoToFollowModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={handleSeeMoreSuggestions}
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
                        Who to follow
                      </Dialog.Title>
                      <div>
                        <ul className="mb-6">
                          {people?.map((person) => (
                            <li
                              key={person._id}
                              className="flex items-start justify-between gap-6 py-4"
                            >
                              <div className="flex gap-3">
                                <Avatar
                                  className="w-10 h-10 rounded-full"
                                  src={person.profilePicture}
                                  alt={person.name}
                                />
                                <div className="flex flex-col">
                                  <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                                    {person.name}
                                  </span>
                                  <span className="text-slate-500 text-xs tracking-sm">
                                    {parseHtml(person.about)}
                                  </span>
                                </div>
                              </div>
                              <Link href={`/${person.username}`}>
                                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                  Follow
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="text-center">
                          <Button
                            onClick={handleShowMore}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                          >
                            Show more
                          </Button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    );

  return <div> Loading</div>;
}
