import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import _ from 'lodash';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import BookmarkLists from './bookmarks/BookmarkLists';
import CreateBookmarkList from './bookmarks/CreateBookmarkList';
import DeleteList from './bookmarks/DeleteList';
import Topic from './basic/topic';
import Button from './basic/button';

export default function PostCard({
  authorUrl,
  authorImage,
  timeAgo,
  authorName,
  storyUrl,
  draft,
  title,
  infoText,
  badgeName,
  min,
  actionMenu,
  normalMenu,
  optionButtons,
  listDetailMenu,
  images,
  showImages = true,
  story,
}) {
  const [createNewList, setCreateNewList] = useState(false);
  const [deleteListModal, setDeleteListModal] = useState(false);
  const bookmarkList = useSelector((state) => state.bookmark.bookmarkLists);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const sessionUser = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="flex flex-col-reverse justify-between sm:flex-row md:items-center gap-4 md:gap-6 pt-8 md:pt-10 b-bottom-2">
        <div className="w-full">
          <Link href={authorUrl}>
            <a className="flex items-center gap-3 mb-4 md:mb-8">
              <div className="flex-shrink-0">
                <span className="sr-only">{authorName}</span>
                <img
                  className="h-6 w-6 rounded-full"
                  src={authorImage}
                  alt={authorName}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-700 text-base font-medium tracking-sm">
                  {authorName}
                </span>
                <span
                  className="text-slate-500 text-xl tracking-sm"
                  aria-hidden="true"
                >
                  &middot;
                </span>
                <span className="text-slate-500 text-sm tracking-sm">
                  {timeAgo}
                </span>
              </div>
            </a>
          </Link>
          <div>
            <Link href={storyUrl}>
              <a className="group inline-flex flex-col mb-4 md:mb-11 space-y-2">
                <div className="flex items-center gap-2">
                  {draft && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-50 text-purple-800">
                      Draft
                    </span>
                  )}
                  <h2 className="text-slate-900 text-3xl font-semibold leading-9 tracking-md transition ease-in-out duration-150 group-hover:text-purple-700">
                    {title}
                  </h2>
                </div>
                <p className="text-slate-500 text-sm tracking-sm line-clamp-2">
                  {infoText}
                </p>
              </a>
            </Link>
          </div>
        </div>
        {images && showImages && (
          <img
            src={images}
            className="w-full md:w-[150px] h-[150px] object-cover rounded-md"
            alt=""
          />
        )}
      </div>
      <div className="border-none pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {badgeName && (
            <>
              <Topic title={badgeName} />
              <span
                className="text-slate-500 text-xl tracking-sm"
                aria-hidden="true"
              >
                &middot;
              </span>
            </>
          )}
          <span className="text-slate-400 text-sm tracking-sm">
            {min} min read
          </span>
        </div>
        {actionMenu && sessionUser && (
          <div className="group flex items-center gap-4 relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
            <Menu as="div" className="relative inline-block text-left ml-4">
              <div>
                <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-purple-50">
                  {bookmarks?.some(
                    (bk) =>
                      bk.story._id === story?._id || bk.story === story?._id
                  ) ? (
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
                  ) : (
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
                </Menu.Button>
              </div>

              <BookmarkLists
                bookmarkLists={bookmarkList}
                setCreateNewList={setCreateNewList}
                story={story}
              />
            </Menu>
            {normalMenu && (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-purple-50">
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
                    {!_.isNil(optionButtons?.unfollow) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.unfollow}
                        >
                          Unfollow this author
                        </Button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.mute) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.mute}
                        >
                          Mute this author
                        </Button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.report) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.report}
                        >
                          Report
                        </Button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.editStory) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.editStory}
                        >
                          Edit Story
                        </Button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.storySettings) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.storySettings}
                        >
                          Story Settings
                        </Button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.storyStats) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.storyStats}
                        >
                          Story Stats
                        </Button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.deleteStory) && (
                      <Menu.Item>
                        <Button
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.deleteStory}
                        >
                          Delete Story
                        </Button>
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            {listDetailMenu && (
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
                    {!_.isNil(optionButtons?.unBookmark) && (
                      <Menu.Item>
                        <button
                          type="button"
                          onClick={optionButtons?.unBookmark}
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                        >
                          Delete item
                        </button>
                      </Menu.Item>
                    )}
                    {!_.isNil(optionButtons?.report) && (
                      <Menu.Item>
                        <button
                          type="button"
                          className="flex items-center justify-center w-full px-6 py-4 text-slate-600 text-base tracking-sm text-center hover:bg-slate-50 hover:text-purple-700"
                          onClick={optionButtons?.report}
                        >
                          Report
                        </button>
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        )}
      </div>
      {createNewList && (
        <CreateBookmarkList setCreateNewList={setCreateNewList} story={story} />
      )}
      {deleteListModal && <DeleteList setDeleteList={setDeleteListModal} />}
    </>
  );
}
