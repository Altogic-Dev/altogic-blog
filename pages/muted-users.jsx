import ListObserver from '@/components/ListObserver';
import UserMutedCard from '@/components/UserMutedCard';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import { blockConnectionActions } from '@/redux/blockConnection/blockConnectionSlice';
import { FlagIcon } from '@heroicons/react/outline';
import _ from 'lodash';
import HeadContent from '@/components/general/HeadContent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MutedUsers() {
  const dispatch = useDispatch();
  const muteIsLoading = useSelector((state) => state.blockConnection.isLoading);
  const blockedUsers = useSelector(
    (state) => state.blockConnection.blockedUsers
  );

  const [isLoading, setIsLoading] = useState(true);
  const PAGE_LIMIT = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1 || _.isNil(blockedUsers)) {
      dispatch(
        blockConnectionActions.getBlockedUsersRequest({
          page,
          limit: PAGE_LIMIT,
        })
      );
    }
  }, [page]);

  const loadMore = () => {
    if (_.size(blockedUsers) >= PAGE_LIMIT) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!muteIsLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [muteIsLoading]);
  return (
    <div>
      <HeadContent>
        <title>Opinate Notifications</title>
        <meta name="description" content="Opinate Notifications" />
      </HeadContent>
      <Layout loading={isLoading}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="py-8 lg:py-10 lg:px-8">
              <h1 className="text-slate-700 mb-10 lg:mb-12 text-2xl lg:text-3xl font-semibold tracking-md">
                Muted Users
              </h1>
              {_.size(blockedUsers) > 0 ? (
                <ListObserver onEnd={loadMore}>
                  <ul className="space-y-4">
                    {_.map(blockedUsers, (person, index) => (
                      <UserMutedCard
                        index={index}
                        key={person?._id}
                        user={person}
                        unmuteAuthor={() => {
                          dispatch(
                            blockConnectionActions.unblockAuthorRequest(
                              person?._id
                            )
                          );
                        }}
                      />
                    ))}
                  </ul>
                </ListObserver>
              ) : (
                <div className="border-b-2 my-10 pb-10 items-center flex flex-col">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                    <FlagIcon className="w-7 h-7 text-purple-600" />
                  </span>
                  <p className="text-slate-500 text-md">
                    You do not have any muted users
                  </p>
                </div>
              )}
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar whoToFollow popularTopics popularStories />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
