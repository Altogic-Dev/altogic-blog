import React, { Fragment, useEffect } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { notificationsActions } from '@/redux/notifications/notificationsSlice';
import { BellIcon } from '@heroicons/react/outline';
import SeeAllNotification from './SeeAllNotification';
import NotificationItem from './NotificationItem';

export default function Notifications({
  setMobileNotifications,
  mobileNotifications,
}) {
  const notifications = useSelector(
    (state) => state.notifications.notificationPreview
  );
  const unreadNotificationsCount = useSelector(
    (state) => state.notifications.unreadNotificationsCount
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      {/* Desktop Notification */}
      <Menu as="div" className="relative hidden lg:inline-flex items-center">
        {({ open: internalOpen }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(
            () => () => {
              if (internalOpen && notifications.length > 0) {
                dispatch(
                  notificationsActions.markAsSeenRequest({ userId: user._id })
                );
              }
            },
            [internalOpen]
          );
          return (
            <>
              <Menu.Button className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <BellIcon className="w-5 h-5 text-gray-500 relative" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-[10px] right-[8px] inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute top-12 right-0 w-[430px] rounded-[10px] shadow-xl bg-slate-100 focus:outline-none z-50">
                  <div className="p-6 space-y-4">
                    {notifications?.map((notification) => (
                      <NotificationItem
                        key={notification._id}
                        notification={notification}
                      />
                    ))}
                    <SeeAllNotification />
                  </div>
                </Menu.Items>
              </Transition>
            </>
          );
        }}
      </Menu>
      {/* Mobile Notification */}
      <div className="flex lg:hidden items-center justify-center">
        <button
          type="button"
          onClick={() => setMobileNotifications(true)}
          className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <BellIcon className="w-5 h-5 text-gray-500" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-[8px] right-[6px] inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>

      <Transition appear show={mobileNotifications} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setMobileNotifications(false);
            dispatch(
              notificationsActions.markAsSeenRequest({ userId: user._id })
            );
          }}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform bg-slate-100 p-6 space-y-3 overflow-hidden rounded-2xl align-middle shadow-xl transition-all">
                  {notifications?.map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  ))}
                  <SeeAllNotification />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
