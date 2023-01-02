import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import {
  addBookmarkRequest,
  deleteBookmarkRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';

export default function BookmarkLists({ setCreateNewList, className, story }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const myBookmarks = useSelector((state) => state.bookmark.myBookmarks);
  const bookmarkLists = useSelector(
    (state) =>
      _.get(state.bookmark.bookmarkLists, user?.username)?.bookmarkLists
  );

  const addBookmark = (list) => {
    let { coverImages } = list;
    const storyImages = _.map(story?.storyImages, (image) => image);
    if (coverImages.length < 4) {
      coverImages = [...coverImages, storyImages[0]];
    } else {
      coverImages = coverImages.slice(1, 4);
      coverImages = [...coverImages, storyImages[0]];
    }
    const req = {
      list: list._id,
      userId: user._id,
      username: user.username,
      story: story?._id,
      coverImages: story?.storyImages[0] ? [story?.storyImages[0]] : null,
    };

    dispatch(addBookmarkRequest(req));
  };
  const handleAddBookmark = (e, list) => {
    if (e.target.checked) {
      addBookmark(list);
    } else {
      dispatch(
        deleteBookmarkRequest({
          listId: list._id,
          storyId: story._id,
          newImages: list.coverImages.filter(
            (image) => image !== story?.storyImages[0]
          ),
        })
      );
    }
  };

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={`${className} absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none`}
      >
        {bookmarkLists?.map((list) => (
          <Menu.Item key={list._id} disabled>
            <div className="relative flex items-center justify-between w-full px-6 py-4 cursor-pointer hover:bg-slate-50">
              <div className="flex items-start">
                <Menu.Button className="flex items-center h-5 cursor-pointer">
                  <Input
                    id="private-list"
                    name="list"
                    type="checkbox"
                    checked={myBookmarks?.some(
                      (bk) =>
                        bk.bookmarkList === list._id &&
                        (bk?.story?._id === story?._id ||
                          bk?.story === story?._id)
                    )}
                    className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded cursor-pointer"
                    onChange={(e) => handleAddBookmark(e, list)}
                  />
                </Menu.Button>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="private-list"
                    className="text-sm font-medium text-slate-800 tracking-sm cursor-pointer"
                  >
                    {list.name}
                  </label>
                </div>
              </div>
              <div>
                {list.isPrivate ? (
                  <LockClosedIcon className="w-6 h-6 text-slate-400" />
                ) : (
                  <LockOpenIcon className="w-6 h-6 text-slate-400" />
                )}
              </div>
            </div>
          </Menu.Item>
        ))}
        <div>
          <Menu.Button
            type="button"
            onClick={() => setCreateNewList(true)}
            className="flex items-center justify-center w-full px-6 py-4 text-purple-700 text-base tracking-sm text-center hover:bg-slate-50"
          >
            Create new list
          </Menu.Button>
        </div>
      </Menu.Items>
    </Transition>
  );
}
