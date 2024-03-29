import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recommendationsActions } from '@/redux/recommendations/recommendationsSlice';
import SidebarTitle from '../SidebarTitle';
import Button from '../basic/button';
import UserCard from '../general/UserCard';

const size = 5;
export default function WhoToFollow({
  topWriters,
  whoToFollow,
  topicWriters,
  Tag,
}) {
  const whoToFollowInfo = useSelector(
    (state) => state.recommendations.whoToFollowInfo
  );

  const [whoToFollowDataModal, setwhoToFollowDataModal] = useState(false);
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(whoToFollowInfo?.currentPage || 1);
  const whoToFollowData = useSelector(
    (state) => state.recommendations.whoToFollow
  );

  const topicWritersData = useSelector(
    (state) => state.recommendations.topicWriters
  );
  const topWritersData = useSelector(
    (state) => state.recommendations.topWriters
  );

  const count = useSelector((state) =>
    _.get(state.recommendations.whoToFollowInfo, 'count')
  );

  const myFollowings = useSelector(
    (state) => state.followerConnection.myFollowings
  );

  const dispatch = useDispatch();

  const getTopicWriters = () => {
    dispatch(recommendationsActions.getTopicTopWritersRequest({ tag: Tag }));
  };

  const getWhoToFollow = (page, size) => {
    dispatch(
      recommendationsActions.getWhoToFollowRequest({ page, limit: size })
    );
  };

  const getTopWriters = () => {
    dispatch(recommendationsActions.getTopWritersRequest());
  };

  const handleSeeMoreSuggestions = () => {
    if (Tag && _.isNil(topicWritersData)) {
      getTopicWriters(Tag);
    } else if (whoToFollow) {
      getWhoToFollow(1, size);
    } else if (topWriters && topWritersData.length <= size) {
      getTopWriters();
    }
  };

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    handleSeeMoreSuggestions();
    setPage(1);
    document.body.addEventListener('click', (e) => {
      if (e.target.id !== 'who-to-follow-modal' && whoToFollowDataModal) {
        setwhoToFollowDataModal(false);
      }
    });
    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  useEffect(() => {
    if (topicWriters) {
      setPeople(topicWritersData);
    } else if (whoToFollow) {
      setPeople(whoToFollowData);
    } else if (topWriters) {
      setPeople(topWritersData);
    }
  }, [whoToFollowData, topicWritersData, topWritersData]);

  useEffect(() => {
    if (
      page > 1 &&
      whoToFollow &&
      _.size(whoToFollowData) < size * page &&
      _.size(whoToFollowData) < count
    ) {
      getWhoToFollow(page, size);
    }
  }, [page]);
  if (people?.length > 0)
    return (
      <div>
        <SidebarTitle title={whoToFollow ? 'Who To Follow' : 'Top Writers'} />

        <div>
          <ul className="divide-y divide-gray-200">
            {people?.slice(0, 5).map((person, index) => (
              <UserCard
                index={index}
                key={person._id}
                user={person}
                isFollowing={_.some(
                  myFollowings,
                  (user) => user.followingUser === person._id
                )}
              />
            ))}
          </ul>
          {whoToFollow && count > 5 && (
            <Button
              onClick={() => setwhoToFollowDataModal(true)}
              className="inline-flex items-center gap-2 mt-4 text-sm tracking-sm text-purple-700"
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
          )}
          <Transition appear show={whoToFollowDataModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={setwhoToFollowDataModal}
              id="who-to-follow-modal"
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
                        {topicWriters ? 'Top Writers' : 'Who To Follow'}
                      </Dialog.Title>
                      <div>
                        <ul className="mb-6">
                          {people?.map((person) => (
                            <UserCard
                              key={person._id}
                              user={person}
                              isFollowing={_.some(
                                myFollowings,
                                (user) => user.followingUser === person._id
                              )}
                            />
                          ))}
                        </ul>
                        {people?.length < count && (
                          <div className="text-center">
                            <Button
                              onClick={handleShowMore}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
      </div>
    );
}
