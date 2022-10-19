import ListObserver from '@/components/ListObserver';
import UnmuteAuthorModal from '@/components/UnmuteAuthorModal';
import UserMutedCard from '@/components/UserMutedCard';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';
import { blockConnectionActions } from '@/redux/blockConnection/blockConnectionSlice';
import _ from 'lodash';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MutedUsers() {
  const dispatch = useDispatch();

  const [unmutedAuthor, setUnmutedAuthor] = useState(null);

  const blockedUsers = useSelector(
    (state) => state.blockConnection.blockedUsers
  );

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

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Notifications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Notifications"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="py-8 lg:py-10 lg:px-8">
              <h1 className="text-slate-700 mb-10 lg:mb-12 text-2xl lg:text-3xl font-semibold tracking-md">
                Muted Users
              </h1>
              <ListObserver onEnd={loadMore}>
                <ul className="space-y-4">
                  {_.map(blockedUsers, (person, index) => (
                    <UserMutedCard
                      index={index}
                      key={person._id}
                      user={person}
                      unmuteAuthor={() => {
                        setUnmutedAuthor(person._id);
                      }}
                    />
                  ))}
                </ul>
              </ListObserver>
            </div>
            <div className="hidden lg:block p-8 space-y-10">
              <Sidebar whoToFollow popularTopics popularStories />
            </div>
          </div>
        </div>
      </Layout>
      {unmutedAuthor && (
        <UnmuteAuthorModal
          setUnmuteAuthorModal={() => setUnmutedAuthor(null)}
          clickUnmute={() => {
            dispatch(
              blockConnectionActions.unblockAuthorRequest(unmutedAuthor)
            );
          }}
        />
      )}
    </div>
  );
}
