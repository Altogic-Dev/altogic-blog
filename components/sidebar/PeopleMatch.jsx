import { Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import Button from '../basic/button';
import UserCard from '../general/UserCard';
import SidebarTitle from '../SidebarTitle';

export default function PeopleMatch({ whoFollows, query }) {
  const [whoToFollowModal, setWhoToFollowModal] = useState(false);

  return (
    <div>
      <SidebarTitle title={`People matching ${query}`} />
      <div>
        <ul className="divide-y divide-gray-200">
          {whoFollows?.slice(0, 5)?.map((whoFollow) => (
            <UserCard key={whoFollow._id} user={whoFollow} />
          ))}
        </ul>
        {whoFollows?.length > 0 && (
          <Button
            type="button"
            onClick={() => setWhoToFollowModal(!whoToFollowModal)}
            className="inline-flex items-center gap-2 mt-4 text-sm tracking-sm text-purple-700"
          >
            See more suggestions
            <ChevronRightIcon className="w-5 h-5 text-purple-700" />
          </Button>
        )}
        <Transition appear show={whoToFollowModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setWhoToFollowModal(false)}
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
                      Who the follow
                    </Dialog.Title>
                    <div>
                      <ul className="mb-6">
                        {whoFollows?.map((whoFollow) => (
                          <UserCard key={whoFollow._id} user={whoFollow} />
                        ))}
                      </ul>
                      <div className="text-center">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
    </div>
  );
}
