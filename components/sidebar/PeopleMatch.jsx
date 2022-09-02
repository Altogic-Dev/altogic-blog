import { Dialog, Transition } from '@headlessui/react';
import { Fragment,useState } from 'react';
import SidebarTitle from '../SidebarTitle';

export default function PeopleMatch({ whoFollows }) {
  const [whoToFollowModal, setWhoToFollowModal] = useState(false);

  return (
    <div>
      <SidebarTitle title="People matching Development" />
      <div>
        <ul className="divide-y divide-gray-200">
          {whoFollows.map((whoFollow) => (
            <li
              key={whoFollow.id}
              className="flex items-start justify-between gap-3 py-4"
            >
              <div className="flex gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={whoFollow.image}
                  alt={whoFollow.name}
                />
                <div className="flex flex-col">
                  <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                    {whoFollow.name}
                  </span>
                  <span className="text-slate-500 text-xs tracking-sm">
                    {whoFollow.desc}
                  </span>
                </div>
              </div>
              <a
                href={whoFollow.href}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-slate-700 bg-slate-100 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Follow
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setWhoToFollowModal(!whoToFollowModal)}
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
        </button>
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
                        {whoFollows.map((whoFollow) => (
                          <li
                            key={whoFollow.id}
                            className="flex items-start justify-between gap-6 py-4"
                          >
                            <div className="flex gap-3">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={whoFollow.image}
                                alt={whoFollow.name}
                              />
                              <div className="flex flex-col">
                                <span className="text-slate-700 mb-1 text-sm font-medium tracking-sm">
                                  {whoFollow.name}
                                </span>
                                <span className="text-slate-500 text-xs tracking-sm">
                                  {whoFollow.desc}
                                </span>
                              </div>
                            </div>
                            <a
                              href={whoFollow.href}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full tracking-sm text-white bg-purple-600 transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              Follow
                            </a>
                          </li>
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
