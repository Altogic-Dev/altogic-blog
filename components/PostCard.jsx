import { Fragment, useState } from 'react';
import { Menu, Transition, Switch } from '@headlessui/react';
import _ from 'lodash';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PostCard(props) {
  const [createNewList, setCreateNewList] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [deleteListModal, setDeleteListModal] = useState(false);

  return (
    <>
      <div className="flex flex-col-reverse justify-between sm:flex-row items-center gap-4 md:gap-6 py-8 md:py-10">
        <div>
          <a
            href={props.authorUrl}
            className="flex items-center gap-3 mb-4 md:mb-8"
          >
            <div className="flex-shrink-0">
              <span className="sr-only">{props.authorName}</span>
              <img
                className="h-6 w-6 rounded-full"
                src={props.authorImage}
                alt={props.authorName}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-700 text-base font-medium tracking-sm">
                {props.authorName}
              </span>
              <span
                className="text-slate-500 text-xl tracking-sm"
                aria-hidden="true"
              >
                &middot;
              </span>
              <span className="text-slate-500 text-sm tracking-sm">
                {props.timeAgo}
              </span>
            </div>
          </a>
          <div>
            <a
              href={props.storyUrl}
              className="group inline-flex flex-col mb-4 md:mb-11 space-y-2"
            >
              <div className="flex items-center gap-2">
                {props.draft && (
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-50 text-purple-800">
                    Draft
                  </span>
                )}
                <h2 className="text-slate-900 text-3xl font-semibold leading-9 tracking-md transition ease-in-out duration-150 group-hover:text-purple-700">
                  {props.title}
                </h2>
              </div>
              <p className="text-slate-500 text-sm tracking-sm">
                {props.infoText}
              </p>
            </a>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <a href={props.badgeUrl}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium tracking-sm bg-slate-400 text-white">
                    {props.badgeName}
                  </span>
                </a>
                <span
                  className="text-slate-500 text-xl tracking-sm"
                  aria-hidden="true"
                >
                  &middot;
                </span>
                <span className="text-slate-400 text-sm tracking-sm">
                  {props.min} min read
                </span>
              </div>
              {props.actionMenu && (
                <div className="flex items-center gap-4 relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
                  <Menu
                    as="div"
                    className="relative inline-block text-left ml-4"
                  >
                    <div>
                      <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        {props.noActiveBookmark && (
                          <svg
                            className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 21L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21H19ZM5 21H4C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L5 21ZM12 17L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L12 17ZM17.362 3.32698L17.816 2.43597L17.362 3.32698ZM18.673 4.63803L19.564 4.18404L18.673 4.63803ZM6.63803 3.32698L6.18404 2.43597L6.63803 3.32698ZM5.32698 4.63803L4.43597 4.18404L5.32698 4.63803ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7H13ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM9.8 4H14.2V2H9.8V4ZM18 7.8V21H20V7.8H18ZM6 21V7.8H4V21H6ZM19.4961 20.1318L12.4961 16.1318L11.5039 17.8682L18.5039 21.8682L19.4961 20.1318ZM11.5039 16.1318L4.50386 20.1318L5.49614 21.8682L12.4961 17.8682L11.5039 16.1318ZM14.2 4C15.0566 4 15.6389 4.00078 16.089 4.03755C16.5274 4.07337 16.7516 4.1383 16.908 4.21799L17.816 2.43597C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7014 1.99922 15.0236 2 14.2 2V4ZM20 7.8C20 6.97642 20.0008 6.2986 19.9558 5.74817C19.9099 5.18608 19.8113 4.66937 19.564 4.18404L17.782 5.09202C17.8617 5.24842 17.9266 5.47262 17.9624 5.91104C17.9992 6.36113 18 6.94342 18 7.8H20ZM16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202L19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43597L16.908 4.21799ZM9.8 2C8.97642 2 8.2986 1.99922 7.74817 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43597L7.09202 4.21799C7.24842 4.1383 7.47262 4.07337 7.91104 4.03755C8.36113 4.00078 8.94342 4 9.8 4V2ZM6 7.8C6 6.94342 6.00078 6.36113 6.03755 5.91104C6.07337 5.47262 6.1383 5.24842 6.21799 5.09202L4.43597 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74817C3.99922 6.2986 4 6.97642 4 7.8H6ZM6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404L6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799L6.18404 2.43597ZM13 13V7H11V13H13ZM9 11H15V9H9V11Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                        {props.activeBookmark && (
                          <svg
                            className="w-6 h-6 text-purple-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 10.5L11 12.5L15.5 8M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none">
                        <div disabled>
                          <div className="relative flex items-center justify-between w-full px-6 py-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="private-list"
                                  name="list"
                                  type="checkbox"
                                  className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="private-list"
                                  className="text-sm font-medium text-slate-800 tracking-sm"
                                >
                                  Private List
                                </label>
                              </div>
                            </div>
                            <div>
                              <svg
                                className="w-6 h-6 text-slate-400"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 10.5C16 11.0523 16.4477 11.5 17 11.5C17.5523 11.5 18 11.0523 18 10.5H16ZM6 10.5C6 11.0523 6.44772 11.5 7 11.5C7.55228 11.5 8 11.0523 8 10.5H6ZM13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15H13ZM11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17H11ZM5.63803 21.173L5.18404 22.064L5.63803 21.173ZM4.32698 19.862L3.43597 20.316L4.32698 19.862ZM19.673 19.862L20.564 20.316L19.673 19.862ZM18.362 21.173L18.816 22.064L18.362 21.173ZM18.362 10.827L18.816 9.93597L18.362 10.827ZM19.673 12.138L20.564 11.684L19.673 12.138ZM5.63803 10.827L5.18404 9.93597L5.63803 10.827ZM4.32698 12.138L3.43597 11.684L4.32698 12.138ZM16 8.5V10.5H18V8.5H16ZM8 10.5V8.5H6V10.5H8ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H18C18 5.18629 15.3137 2.5 12 2.5V4.5ZM12 2.5C8.68629 2.5 6 5.18629 6 8.5H8C8 6.29086 9.79086 4.5 12 4.5V2.5ZM11 15V17H13V15H11ZM8.8 11.5H15.2V9.5H8.8V11.5ZM19 15.3V16.7H21V15.3H19ZM15.2 20.5H8.8V22.5H15.2V20.5ZM5 16.7V15.3H3V16.7H5ZM8.8 20.5C7.94342 20.5 7.36113 20.4992 6.91104 20.4624C6.47262 20.4266 6.24842 20.3617 6.09202 20.282L5.18404 22.064C5.66937 22.3113 6.18608 22.4099 6.74817 22.4558C7.2986 22.5008 7.97642 22.5 8.8 22.5V20.5ZM3 16.7C3 17.5236 2.99922 18.2014 3.04419 18.7518C3.09012 19.3139 3.18868 19.8306 3.43597 20.316L5.21799 19.408C5.1383 19.2516 5.07337 19.0274 5.03755 18.589C5.00078 18.1389 5 17.5566 5 16.7H3ZM6.09202 20.282C5.7157 20.0903 5.40973 19.7843 5.21799 19.408L3.43597 20.316C3.81947 21.0686 4.43139 21.6805 5.18404 22.064L6.09202 20.282ZM19 16.7C19 17.5566 18.9992 18.1389 18.9624 18.589C18.9266 19.0274 18.8617 19.2516 18.782 19.408L20.564 20.316C20.8113 19.8306 20.9099 19.3139 20.9558 18.7518C21.0008 18.2014 21 17.5236 21 16.7H19ZM15.2 22.5C16.0236 22.5 16.7014 22.5008 17.2518 22.4558C17.8139 22.4099 18.3306 22.3113 18.816 22.064L17.908 20.282C17.7516 20.3617 17.5274 20.4266 17.089 20.4624C16.6389 20.4992 16.0566 20.5 15.2 20.5V22.5ZM18.782 19.408C18.5903 19.7843 18.2843 20.0903 17.908 20.282L18.816 22.064C19.5686 21.6805 20.1805 21.0686 20.564 20.316L18.782 19.408ZM15.2 11.5C16.0566 11.5 16.6389 11.5008 17.089 11.5376C17.5274 11.5734 17.7516 11.6383 17.908 11.718L18.816 9.93597C18.3306 9.68868 17.8139 9.59012 17.2518 9.54419C16.7014 9.49922 16.0236 9.5 15.2 9.5V11.5ZM21 15.3C21 14.4764 21.0008 13.7986 20.9558 13.2482C20.9099 12.6861 20.8113 12.1694 20.564 11.684L18.782 12.592C18.8617 12.7484 18.9266 12.9726 18.9624 13.411C18.9992 13.8611 19 14.4434 19 15.3H21ZM17.908 11.718C18.2843 11.9097 18.5903 12.2157 18.782 12.592L20.564 11.684C20.1805 10.9314 19.5686 10.3195 18.816 9.93597L17.908 11.718ZM8.8 9.5C7.97642 9.5 7.2986 9.49922 6.74817 9.54419C6.18608 9.59012 5.66937 9.68868 5.18404 9.93597L6.09202 11.718C6.24842 11.6383 6.47262 11.5734 6.91104 11.5376C7.36113 11.5008 7.94342 11.5 8.8 11.5V9.5ZM5 15.3C5 14.4434 5.00078 13.8611 5.03755 13.411C5.07337 12.9726 5.1383 12.7484 5.21799 12.592L3.43597 11.684C3.18868 12.1694 3.09012 12.6861 3.04419 13.2482C2.99922 13.7986 3 14.4764 3 15.3H5ZM5.18404 9.93597C4.43139 10.3195 3.81947 10.9314 3.43597 11.684L5.21799 12.592C5.40973 12.2157 5.71569 11.9097 6.09202 11.718L5.18404 9.93597Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div disabled>
                          <div className="relative flex items-center w-full px-6 py-4">
                            <div className="flex items-center h-5">
                              <input
                                id="public-list"
                                name="list"
                                type="checkbox"
                                className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="public-list"
                                className="text-sm font-medium text-slate-800 tracking-sm"
                              >
                                Public List
                              </label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => setCreateNewList(!createNewList)}
                            className="flex items-center justify-center w-full px-6 py-4 text-purple-700 text-base tracking-sm text-center hover:bg-slate-50"
                          >
                            Create new list
                          </button>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {props.normalMenu && (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <svg
                            className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8955 10 12H12ZM12 12H14C14 10.8955 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8955 17 12H19ZM19 12H21C21 10.8955 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8955 3 12H5ZM5 12H7C7 10.8955 6.10457 10 5 10V12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none">
                          {!_.isNil(props.optionButtons?.unfollow) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.unfollow}
                              >
                                Unfollow this author
                              </button>
                            </Menu.Item>
                          )}
                          {!_.isNil(props.optionButtons?.mute) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.mute}
                              >
                                Mute this author
                              </button>
                            </Menu.Item>
                          )}
                          {!_.isNil(props.optionButtons?.report) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.report}
                              >
                                Report
                              </button>
                            </Menu.Item>
                          )}
                          {!_.isNil(props.optionButtons?.editStory) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.editStory}
                              >
                                Edit Story
                              </button>
                            </Menu.Item>
                          )}
                          {!_.isNil(props.optionButtons?.storySettings) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.storySettings}
                              >
                                Story Settings
                              </button>
                            </Menu.Item>
                          )}
                          {!_.isNil(props.optionButtons?.storyStats) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.storyStats}
                              >
                                Story Stats
                              </button>
                            </Menu.Item>
                          )}
                          {!_.isNil(props.optionButtons?.deleteStory) && (
                            <Menu.Item>
                              <button
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                                onClick={props.optionButtons?.deleteStory}
                              >
                                Delete Story
                              </button>
                            </Menu.Item>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {props.listDetailMenu && (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <svg
                            className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8955 10 12H12ZM12 12H14C14 10.8955 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8955 17 12H19ZM19 12H21C21 10.8955 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8955 3 12H5ZM5 12H7C7 10.8955 6.10457 10 5 10V12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none">
                          <Menu.Item>
                            <button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                            >
                              Add note
                            </button>
                          </Menu.Item>
                          <div>
                            <button
                              type="button"
                              onClick={() => setDeleteListModal(true)}
                              className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                            >
                              Delete item
                            </button>
                          </div>
                          <Menu.Item>
                            <button
                              type="button"
                              className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                            >
                              Report
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <img
          src={props.images}
          className="w-full md:w-[150px] h-[150px] object-cover rounded-md"
          alt=""
        />
      </div>
      {createNewList && (
        <div className="relative z-20">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative max-w-[400px] w-full bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 ring-8 ring-purple-50">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 21V16M3.5 6V1M1 3.5H6M1 18.5H6M12 2L10.2658 6.50886C9.98381 7.24209 9.84281 7.60871 9.62353 7.91709C9.42919 8.1904 9.1904 8.42919 8.91709 8.62353C8.60871 8.8428 8.24209 8.98381 7.50886 9.26582L3 11L7.50886 12.7342C8.24209 13.0162 8.60871 13.1572 8.91709 13.3765C9.1904 13.5708 9.42919 13.8096 9.62353 14.0829C9.84281 14.3913 9.98381 14.7579 10.2658 15.4911L12 20L13.7342 15.4911C14.0162 14.7579 14.1572 14.3913 14.3765 14.0829C14.5708 13.8096 14.8096 13.5708 15.0829 13.3765C15.3913 13.1572 15.7579 13.0162 16.4911 12.7342L21 11L16.4911 9.26582C15.7579 8.98381 15.3913 8.8428 15.0829 8.62353C14.8096 8.42919 14.5708 8.1904 14.3765 7.91709C14.1572 7.60871 14.0162 7.24209 13.7342 6.50886L12 2Z"
                        stroke="#7C3AED"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <button
                    type="button"
                    onClick={() => setCreateNewList(false)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition ease-in-out duration-150 hover:bg-gray-100"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 1L1 13M1 1L13 13"
                        stroke="#667085"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-left mb-8">
                  <div className="mb-5">
                    <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                      Create List
                    </h3>
                    <span className="text-slate-500 text-sm tracking-sm">
                      Please enter a name for this list.
                    </span>
                  </div>
                  <form action="">
                    <div className="mb-6">
                      <label
                        htmlFor="list-name"
                        className="block text-slate-700 text-sm font-medium tracking-sm mb-1.5"
                      >
                        {' '}
                        List name{' '}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="list-name"
                          id="list-name"
                          placeholder="e.g. App"
                          className="block w-full min-h-[44px] text-slate-500 border-slate-300 rounded-md shadow-sm tracking-sm placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={classNames(
                          enabled ? 'bg-purple-600' : 'bg-gray-200',
                          'relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            enabled ? 'translate-x-4' : 'translate-x-0',
                            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                      <Switch.Label as="span" className="ml-3">
                        <span className="text-base font-medium tracking-sm text-slate-700">
                          Private
                        </span>
                      </Switch.Label>
                    </Switch.Group>
                  </form>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateNewList(false)}
                    className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteListModal && (
        <div className="relative z-20">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative max-w-[400px] w-full bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 ring-8 ring-red-50">
                    <svg
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4V2ZM15 4C15.5523 4 16 3.55228 16 3C16 2.44772 15.5523 2 15 2V4ZM3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7V5ZM21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5V7ZM19.9978 6.06652C20.0345 5.51546 19.6176 5.03895 19.0665 5.00221C18.5155 4.96548 18.039 5.38242 18.0022 5.93348L19.9978 6.06652ZM18.2987 16.5193L17.3009 16.4528L18.2987 16.5193ZM5.70129 16.5193L4.7035 16.5858L5.70129 16.5193ZM5.99779 5.93348C5.96105 5.38242 5.48454 4.96548 4.93348 5.00221C4.38242 5.03895 3.96548 5.51546 4.00221 6.06652L5.99779 5.93348ZM7.49834 20.6997L7.06223 21.5996H7.06223L7.49834 20.6997ZM6.19998 19.485L7.06888 18.99L6.19998 19.485ZM17.8 19.485L18.6689 19.98H18.6689L17.8 19.485ZM16.5017 20.6997L16.9378 21.5996H16.9378L16.5017 20.6997ZM11 10.5C11 9.94772 10.5523 9.5 10 9.5C9.44772 9.5 9 9.94772 9 10.5H11ZM9 15.5C9 16.0523 9.44772 16.5 10 16.5C10.5523 16.5 11 16.0523 11 15.5H9ZM15 10.5C15 9.94772 14.5523 9.5 14 9.5C13.4477 9.5 13 9.94772 13 10.5H15ZM13 15.5C13 16.0523 13.4477 16.5 14 16.5C14.5523 16.5 15 16.0523 15 15.5H13ZM9 4H15V2H9V4ZM3 7H21V5H3V7ZM18.0022 5.93348L17.3009 16.4528L19.2965 16.5858L19.9978 6.06652L18.0022 5.93348ZM13.5093 20H10.4907V22H13.5093V20ZM6.69907 16.4528L5.99779 5.93348L4.00221 6.06652L4.7035 16.5858L6.69907 16.4528ZM10.4907 20C9.68385 20 9.13703 19.9993 8.71286 19.9656C8.30086 19.9329 8.08684 19.8736 7.93444 19.7998L7.06223 21.5996C7.52952 21.826 8.0208 21.917 8.55459 21.9593C9.07622 22.0007 9.71571 22 10.4907 22V20ZM4.7035 16.5858C4.75505 17.359 4.79686 17.9972 4.87287 18.5149C4.95066 19.0447 5.07405 19.5288 5.33109 19.98L7.06888 18.99C6.98505 18.8429 6.9117 18.6333 6.85166 18.2243C6.78984 17.8034 6.75274 17.2578 6.69907 16.4528L4.7035 16.5858ZM7.93444 19.7998C7.57072 19.6235 7.26895 19.3412 7.06888 18.99L5.33109 19.98C5.73123 20.6824 6.33479 21.247 7.06223 21.5996L7.93444 19.7998ZM17.3009 16.4528C17.2473 17.2578 17.2102 17.8034 17.1483 18.2243C17.0883 18.6333 17.015 18.8429 16.9311 18.99L18.6689 19.98C18.926 19.5288 19.0493 19.0447 19.1271 18.5149C19.2031 17.9972 19.245 17.359 19.2965 16.5858L17.3009 16.4528ZM13.5093 22C14.2843 22 14.9238 22.0007 15.4454 21.9593C15.9792 21.917 16.4705 21.826 16.9378 21.5996L16.0656 19.7998C15.9132 19.8736 15.6991 19.9329 15.2871 19.9656C14.863 19.9993 14.3161 20 13.5093 20V22ZM16.9311 18.99C16.7311 19.3412 16.4293 19.6235 16.0656 19.7998L16.9378 21.5996C17.6652 21.247 18.2688 20.6824 18.6689 19.98L16.9311 18.99ZM9 10.5V15.5H11V10.5H9ZM13 10.5V15.5H15V10.5H13Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <button
                    type="button"
                    onClick={() => setDeleteListModal(false)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition ease-in-out duration-150 hover:bg-gray-100"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 1L1 13M1 1L13 13"
                        stroke="#667085"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-left mb-8">
                  <div className="mb-5">
                    <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                      Delete list
                    </h3>
                    <span className="text-slate-500 text-sm tracking-sm">
                      Deleting this list will not delete the stories in it.
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeleteListModal(false)}
                    className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
