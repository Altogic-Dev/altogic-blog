import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import ChangePassword from '@/components/settings/ChangePassword';
import MySessions from '@/components/settings/MySessions';
import MyPlans from '@/components/settings/MyPlans';
import ChangeEmail from '@/components/settings/ChangeEmail';
import Layout from '@/layouts/Layout';
import constants from '@/constants';
import ChangeProfilePicture from '@/components/settings/ChangeProfilePicture';
import MyDetails from '@/components/settings/MyDetails';
import { useRouter } from 'next/router';

export default function Settings() {
  const _user = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    if (_user) {
      setUser(_user);
    } else router.push('/login');
  }, [_user]);
  const currentSubscription = useSelector(
    (state) => state.payment.currentSubscription
  );

  const invoices = useSelector((state) => state.payment.invoices);
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
            <div className="max-w-screen-xl mx-auto px-4 lg:px-4 pt-8 pb-[72px] lg:pb-0">
              <div className="hidden md:flex items-center justify-between py-6 mb-6 border-b border-gray-200">
                <h1 className="text-slate-800 mb-4 text-3xl font-medium tracking-md">
                  Settings
                </h1>
              </div>
              <div className="xl:grid xl:grid-cols-[160px,1fr] gap-24">
                <ul className="hidden xl:block sticky bottom-0">
                  {constants.SETTINGS_MENU.map((setting) => (
                    <li key={setting.id}>
                      {setting.provider(user?.provider) && (
                        <a
                          href={setting.href}
                          className="flex text-slate-500 px-5 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                        >
                          {setting.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                <div>
                  {/* My Details */}
                  <MyDetails user={user} id="my-details" className="mb-16" />
                  {/* My Details */}
                  <ChangeProfilePicture
                    user={user}
                    id="change-profile-picture"
                    className="mb-16"
                  />
                  {/* Password */}
                  {user?.provider === 'altogic' && (
                    <ChangePassword id="password" className="mb-16" />
                  )}
                  {user?.provider === 'altogic' && (
                    <ChangeEmail id="change-email" className="mb-16" />
                  )}
                  {/* My Sessions */}
                  <MySessions id="my-sessions" className="mb-16" />
                  {/* My Plans */}
                  {(currentSubscription || invoices.length > 0) && (
                    <MyPlans
                      id="my-plans"
                      className="mb-16"
                      currentSubscription={currentSubscription}
                      invoices={invoices}
                    />
                  )}
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
