import React, { useEffect, useState } from 'react';
import HeadContent from '@/HeadContent';;
import { Tab } from '@headlessui/react';
import { notificationsActions } from '@/redux/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@/components/profile/Avatar';
import { DateTime } from 'luxon';
import { classNames } from '@/utils/utils';
import ListObserver from '@/components/ListObserver';
import Layout from '@/layouts/Layout';
import Sidebar from '@/layouts/Sidebar';

export default function Notifications() {
  const dispatch = useDispatch();
  const [notificationLimit, setNotificationLimit] = useState(20);
  const allNotifications = useSelector(
    (state) => state.notifications.notifications
  );
  const responses = useSelector(
    (state) => state.notifications.responseNotifications
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(
      notificationsActions.getNotificationsRequest({
        userId: user?._id,
        limit: notificationLimit,
      })
    );
  }, [notificationLimit]);

  const handleLoadMore = () => {
    setNotificationLimit((prev) => prev + 10);
  };
  return (
    <div>
      <HeadContent>
        <title>Altogic Medium Blog App Notifications</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Notifications"
        />
        
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr,352px] divide-x divide-gray-200 lg:-ml-8 lg:-mr-8">
            <div className="py-8 lg:py-10 lg:px-8">
              <h1 className="text-slate-700 mb-10 lg:mb-12 text-2xl lg:text-3xl font-semibold tracking-md">
                Notifications
              </h1>
              <Tab.Group>
                <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    All
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                        selected
                          ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                          : 'text-slate-500'
                      )
                    }
                  >
                    Responses
                  </Tab>
                </Tab.List>
                <Tab.Panels className="py-10 lg:py-12">
                  <Tab.Panel>
                    <ListObserver onEnd={handleLoadMore}>
                      <ul className="space-y-4">
                        {allNotifications.map((allNotification) => (
                          <li
                            key={allNotification.id}
                            className="flex items-center gap-3"
                          >
                            <Avatar
                              className="w-[30px] h-[30px]"
                              width={30}
                              height={30}
                              src={allNotification.sentUserProfilePicture}
                              alt={allNotification.sentUsername}
                              placeholderName={allNotification.sentUsername}
                            />
                            <span className="text-sm font-light tracking-sm text-slate-500">
                              <strong className="text-slate-600 font-semibold">
                                {allNotification.sentUsername}
                              </strong>{' '}
                              {allNotification.intermediateText}{' '}
                              <strong className="text-slate-600 font-semibold">
                                {allNotification.targetTitle}
                              </strong>{' '}
                              <span className="text-slate-400 text-xs">
                                {DateTime.fromISO(
                                  allNotification.createdAt
                                ).toRelative()}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </ListObserver>
                  </Tab.Panel>
                  <Tab.Panel>
                    <ListObserver onEnd={handleLoadMore}>
                      <ul className="space-y-4">
                        {responses.map((response) => (
                          <li
                            key={response.id}
                            className="flex items-center gap-3"
                          >
                            <Avatar
                              width={30}
                              height={30}
                              src={response.sentUserProfilePicture}
                              alt={response.sentUsername}
                              placeholderName={response.sentUsername}
                            />
                            <span className="text-sm font-light tracking-sm text-slate-500">
                              <strong className="text-slate-600 font-semibold">
                                {response.sentUsername}
                              </strong>{' '}
                              {response.intermediateText}{' '}
                              <strong className="text-slate-600 font-semibold">
                                {response.targetTitle}
                              </strong>{' '}
                              <span className="text-slate-400 text-xs">
                                {DateTime.fromISO(
                                  response.createdAt
                                ).toRelative()}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </ListObserver>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
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
