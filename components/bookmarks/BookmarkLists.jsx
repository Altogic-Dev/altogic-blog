import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import {
  addBookmarkRequest,
  deleteBookmarkRequest,
} from '@/redux/bookmarks/bookmarkSlice';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';

export default function BookmarkLists({
  bookmarkLists,
  setCreateNewList,
  className,
  story,
  bookmarks,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleAddBookmark = (e, list) => {
    let { coverImages } = list;
    const storyImages = _.map(story.storyImages, (image) => image);
    if (e.target.checked) {
      if (coverImages.length < 4) {
        coverImages = [...coverImages, storyImages[0]];
      } else {
        coverImages = coverImages.slice(1, 4);
        coverImages = [...coverImages, storyImages[0]];
      }
      const req = {
        list: list._id,
        userId: user._id,
        story: story._id,
      };
      if (coverImages.length > 0) {
        coverImages = coverImages.pop();
        req.coverImages = coverImages;
      }

      dispatch(addBookmarkRequest(req));
    } else {
      dispatch(
        deleteBookmarkRequest({
          listId: list._id,
          storyId: story._id,
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
          <div key={list._id} disabled>
            <div className="relative flex items-center justify-between w-full px-6 py-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Input
                    id="private-list"
                    name="list"
                    type="checkbox"
                    checked={bookmarks?.some(
                      (bk) =>
                        bk.bookmarkList === list._id && bk.story === story?._id
                    )}
                    className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                    onChange={(e) => handleAddBookmark(e, list)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="private-list"
                    className="text-sm font-medium text-slate-800 tracking-sm"
                  >
                    {list.name}
                  </label>
                </div>
              </div>
              <div>
                {list.isPrivate && (
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
                )}
              </div>
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={() => setCreateNewList(true)}
            className="flex items-center justify-center w-full px-6 py-4 text-purple-700 text-base tracking-sm text-center hover:bg-slate-50"
          >
            Create new list
          </button>
        </div>
      </Menu.Items>
    </Transition>
  );
}
