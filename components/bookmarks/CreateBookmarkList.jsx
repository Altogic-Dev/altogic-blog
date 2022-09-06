import React, { useState } from 'react';
import { classNames } from '@/utils/utils';
import { Switch } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createBookmarkListRequest } from '@/redux/bookmarks/bookmarkSlice';
import Input from '../Input';
import Button from '../basic/button';

export default function CreateBookmarkList({ setCreateNewList }) {
  const [enabled, setEnabled] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const bookmarkListSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    isPrivate: yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookmarkListSchema),
  });
  const createNewList = (data) => {
    const req = {
      ...data,
      isPrivate: enabled,
      user: user._id,
      username: user.username,
    };
    dispatch(createBookmarkListRequest(req));
  };
  return (
    <div className="relative z-30">
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
            <div className="text-left">
              <div className="mb-5">
                <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                  Create List
                </h3>
                <span className="text-slate-500 text-sm tracking-sm">
                  Please enter a name for this list.
                </span>
              </div>
              <form onSubmit={handleSubmit(createNewList)}>
                <div className="mb-6">
                  <Input
                    label="List Name"
                    id="name"
                    name="name"
                    register={register('name')}
                    error={errors.name}
                    placeholder="e.g. App"
                  />
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
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <Button
                    type="button"
                    onClick={() => setCreateNewList(false)}
                    className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
