import React, { useEffect, useState } from 'react';
import HeadContent from '@/components/general/HeadContent';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/layouts/Layout';
import { useRouter } from 'next/router';
import UserCard from '@/components/general/UserCard';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import { subscribeConnectionActions } from '@/redux/subscribeConnection/subscribeConnectionSlice';

export default function Subscriptions() {
  const _user = useSelector((state) => state.auth.user);
  const subscriptions = useSelector(
    (state) => state.subscribeConnection.subscriptions
  );
  const isLoading = useSelector(
    (state) => state.subscribeConnection.subscriptionsLoading
  );
  const [user, setUser] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const page = 1;

  useEffect(() => {
    if (_user) {
      setUser(_user);
    } else router.push('/login');
  }, [_user]);

  const getSubscriptions = () => {
    dispatch(
      subscribeConnectionActions.getSubscriptionsRequest({
        userId: _.get(_user, '_id'),
        page,
      })
    );
  };

  useEffect(() => {
    getSubscriptions(page);
  }, [page]);

  return (
    <div>
      {user ? (
        <div>
          <HeadContent>
            <title>Altogic Medium Blog App Settings</title>
            <meta
              name="description"
              content="Altogic Medium Blog App Settings"
            />
            
          </HeadContent>
          <Layout>
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0">
              <div className="hidden md:flex items-center justify-between py-6 mb-6 border-b border-gray-200">
                <h1 className="text-slate-800 mb-4 text-3xl font-medium tracking-md">
                  Subscriptions
                </h1>
              </div>
              {isLoading ? (
                <ClipLoader />
              ) : (
                <div>
                  {_.size(subscriptions) ? _.map(subscriptions, (subscription) => (
                    <UserCard
                      isFollowing
                      subscription
                      user={subscription?.subscribingUser}
                      key={subscription?.subscribingUser?._id}
                    />
                  )) : 
                  <p>No subscriptions found</p>
                  }
                </div>
              )}
            </div>
          </Layout>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="mt-3 text-base text-slate-600 tracking-sm">
            Redirecting to login page...
          </p>
        </div>
      )}
    </div>
  );
}
