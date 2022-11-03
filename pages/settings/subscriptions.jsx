import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/layouts/Layout';
import constants from '@/constants';
import { useRouter } from 'next/router';
import UserCard from '@/components/general/UserCard';
import _ from 'lodash';
import { followerConnectionActions } from '@/redux/followerConnection/followerConnectionSlice';

export default function Settings() {
  const _user = useSelector((state) => state.auth.user);
  const subscriptions = useSelector(
    (state) => state.followerConnection.subscriptions
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
      followerConnectionActions.getSubscriptionsRequest({
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
          <Head>
            <title>Altogic Medium Blog App Settings</title>
            <meta
              name="description"
              content="Altogic Medium Blog App Settings"
            />
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <Layout>
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0">
              <div className="hidden md:flex items-center justify-between py-6 mb-6 border-b border-gray-200">
                <h1 className="text-slate-800 mb-4 text-3xl font-medium tracking-md">
                  Settings
                </h1>
              </div>
              <div className="xl:grid xl:grid-cols-[145px,1fr] gap-24">
                <ul className="hidden xl:block sticky bottom-0">
                  {constants.SETTINGS_MENU.map((setting) => (
                    <li key={setting.id}>
                      {setting.provider(user?.provider) && (
                        <a
                          href={setting.href}
                          className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                        >
                          {setting.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                <div>
                  {_.map(subscriptions, (subscription) => (
                    <UserCard
                      isFollowing
                      subscription
                      user={subscription?.subscribingUser}
                      key={subscription?.subscribingUser?._id}
                    />
                  ))}
                </div>
              </div>
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
