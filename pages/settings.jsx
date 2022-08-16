import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { RadioGroup } from '@headlessui/react';
import Layout from '../layouts/Layout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const plans = [
  {
    name: 'Monthly',
    price: '$5',
    cycle: 'month',
    icons: <Monthly className="h-6 w-6" />,
  },
  {
    name: 'Annual',
    price: '$50',
    cycle: 'year (save $10)',
    icons: <Annual className="h-6 w-6" />,
  },
];

const people = [
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
];

export default function Settings() {
  const [selected, setSelected] = useState(plans[0]);
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Settings</title>
        <meta name="description" content="Altogic Medium Blog App Settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-8 pb-[72px] lg:pb-0">
          <div className="hidden md:flex items-center justify-between py-6 mb-6 border-b border-gray-200">
            <h1 className="text-slate-800 mb-4 text-3xl font-medium tracking-md">
              Settings
            </h1>
            <form action="">
              <div className="relative max-w-xs w-full rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full pl-10 sm:text-sm text-gray-500 border-gray-300 rounded-md placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="xl:grid xl:grid-cols-[125px,1fr] gap-24">
            <ul className="hidden xl:block sticky bottom-0">
              <li>
                <a
                  href="#my-details"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  My Details
                </a>
              </li>
              <li>
                <a
                  href="#password"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  Password
                </a>
              </li>
              <li>
                <a
                  href="#my-sessions"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  My Session
                </a>
              </li>
              <li>
                <a
                  href="#my-plans"
                  className="flex text-slate-500 px-6 py-2.5 text-base whitespace-nowrap tracking-sm hover:bg-gray-50 hover:text-slate-800"
                >
                  My Plans
                </a>
              </li>
            </ul>
            <div>
              {/* My Details */}
              <div id="my-details" className="mb-16">
                <div className="flex items-center gap-6 pb-6 mb-6 md:mb-12 border-b border-gray-200">
                  <img
                    className="hidden md:block w-40 h-40 rounded-full object-cover shadow-lg ring-4 ring-white"
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div>
                    <h3 className="text-slate-700 text-3xl font-medium tracking-md">
                      Profile
                    </h3>
                    <p className="text-slate-500 text-base tracking-sm">
                      Update your photo and personal details.
                    </p>
                  </div>
                </div>
                <form>
                  <div className="divide-y divide-gray-200">
                    <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 tracking-sm"
                      >
                        Username
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-slate-500 tracking-sm">
                          altogic.com/
                        </span>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="oliviarhye"
                          className="flex-1 block w-full min-w-0 rounded-none rounded-r-md text-slate-500 tracking-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700 tracking-sm"
                      >
                        Website
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-slate-500 tracking-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          name="website"
                          id="website"
                          placeholder="www.oliviarhye.com"
                          className="flex-1 block w-full min-w-0 rounded-none rounded-r-md text-slate-500 tracking-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                      <div className="mb-5 md:mb-0">
                        <label
                          htmlFor="photo"
                          className="block text-sm font-medium text-gray-700 tracking-sm"
                        >
                          Your photo
                        </label>
                        <span className="text-slate-500 text-sm tracking-sm">
                          This will be displayed on your profile.
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <img
                          className="w-16 h-16 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="text-slate-600 text-sm tracking-sm"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-purple-700 text-sm tracking-sm"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                      <div>
                        <label
                          htmlFor="photo"
                          className="block text-sm font-medium text-gray-700 tracking-sm"
                        >
                          About me
                        </label>
                        <span className="text-slate-500 text-sm tracking-sm">
                          Write a short introduction.
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <div className="min-w-[240px]">
                            <select
                              id="fontType"
                              name="fontType"
                              className="max-w-lg block focus:ring-purple-500 focus:border-purple-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            >
                              <option>Regular</option>
                              <option>Bold</option>
                              <option>Italic</option>
                            </select>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center w-8 h-8"
                            >
                              <svg
                                className="w-4 h-4 text-slate-400"
                                viewBox="0 0 11 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.6 6.79C9.57 6.12 10.25 5.02 10.25 4C10.25 1.74 8.5 0 6.25 0H0V14H7.04C9.13 14 10.75 12.3 10.75 10.21C10.75 8.69 9.89 7.39 8.6 6.79V6.79ZM3 2.5H6C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5H3V2.5ZM6.5 11.5H3V8.5H6.5C7.33 8.5 8 9.17 8 10C8 10.83 7.33 11.5 6.5 11.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center w-8 h-8"
                            >
                              <svg
                                className="w-4 h-4 text-slate-400"
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center w-8 h-8"
                            >
                              <svg
                                className="w-4 h-4 text-slate-400"
                                viewBox="0 0 20 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center w-8 h-8"
                            >
                              <svg
                                className="w-4 h-4 text-slate-400"
                                viewBox="0 0 20 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.25 6.5C1.42 6.5 0.75 7.17 0.75 8C0.75 8.83 1.42 9.5 2.25 9.5C3.08 9.5 3.75 8.83 3.75 8C3.75 7.17 3.08 6.5 2.25 6.5ZM2.25 0.5C1.42 0.5 0.75 1.17 0.75 2C0.75 2.83 1.42 3.5 2.25 3.5C3.08 3.5 3.75 2.83 3.75 2C3.75 1.17 3.08 0.5 2.25 0.5ZM2.25 12.5C1.42 12.5 0.75 13.18 0.75 14C0.75 14.82 1.43 15.5 2.25 15.5C3.07 15.5 3.75 14.82 3.75 14C3.75 13.18 3.08 12.5 2.25 12.5ZM5.25 15H19.25V13H5.25V15ZM5.25 9H19.25V7H5.25V9ZM5.25 1V3H19.25V1H5.25Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center w-8 h-8"
                            >
                              <svg
                                className="w-4 h-4 text-slate-400"
                                viewBox="0 0 19 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 13H2V13.5H1V14.5H2V15H0V16H3V12H0V13ZM1 4H2V0H0V1H1V4ZM0 7H1.8L0 9.1V10H3V9H1.2L3 6.9V6H0V7ZM5 1V3H19V1H5ZM5 15H19V13H5V15ZM5 9H19V7H5V9Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div>
                          <textarea
                            id="about"
                            name="about"
                            rows={6}
                            placeholder="Add a short bio..."
                            className="shadow-sm block w-full text-base border text-slate-500 placeholder:text-slate-500 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <p className="mt-1.5 text-sm text-slate-500">
                          400 characters left
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 tracking-sm"
                        >
                          Contact email
                        </label>
                        <span className="text-slate-500 text-sm tracking-sm">
                          Enter an email if you’d like to be contacted via a
                          different email.
                        </span>
                      </div>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute top-[11px] left-0 pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.66699 3.83334L8.47109 8.59621C9.02207 8.9819 9.29756 9.17474 9.59721 9.24943C9.8619 9.31541 10.1387 9.31541 10.4034 9.24943C10.7031 9.17474 10.9786 8.9819 11.5296 8.59621L18.3337 3.83334M5.66699 14.6667H14.3337C15.7338 14.6667 16.4339 14.6667 16.9686 14.3942C17.439 14.1545 17.8215 13.7721 18.0612 13.3017C18.3337 12.7669 18.3337 12.0668 18.3337 10.6667V5.33334C18.3337 3.93321 18.3337 3.23315 18.0612 2.69837C17.8215 2.22796 17.439 1.84551 16.9686 1.60583C16.4339 1.33334 15.7338 1.33334 14.3337 1.33334H5.66699C4.26686 1.33334 3.5668 1.33334 3.03202 1.60583C2.56161 1.84551 2.17916 2.22796 1.93948 2.69837C1.66699 3.23315 1.66699 3.93321 1.66699 5.33334V10.6667C1.66699 12.0668 1.66699 12.7669 1.93948 13.3017C2.17916 13.7721 2.56161 14.1545 3.03202 14.3942C3.5668 14.6667 4.26686 14.6667 5.66699 14.6667Z"
                              stroke="currentColor"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full pl-10 text-base text-slate-500 placeholder:text-slate-500 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 py-6 border-t border-gray-200">
                    <button
                      type="button"
                      className="bg-white py-2.5 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
              {/* Password */}
              <div id="password" className="mb-16">
                <form action="#">
                  <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
                          Password
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                          Please enter your current password to change your
                          password.
                        </p>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div>
                          <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                            <label
                              htmlFor="currentPassword"
                              className="block text-sm font-medium text-gray-700 tracking-sm"
                            >
                              Current Password
                            </label>
                            <div className="flex rounded-md shadow-sm">
                              <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                className="flex-1 block w-full min-w-0 rounded-md text-slate-500 tracking-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                            <label
                              htmlFor="newPassword"
                              className="block text-sm font-medium text-gray-700 tracking-sm"
                            >
                              New Password
                            </label>
                            <div>
                              <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="flex-1 block w-full min-w-0 rounded-md text-slate-500 tracking-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                              />
                              <p className="mt-1.5 text-sm text-slate-500">
                                Your new password must be more than 8
                                characters.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                            <label
                              htmlFor="confirmNewPassword"
                              className="block text-sm font-medium text-gray-700 tracking-sm"
                            >
                              Confirm New Password
                            </label>
                            <div className="flex rounded-md shadow-sm">
                              <input
                                type="password"
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                className="flex-1 block w-full min-w-0 rounded-md text-slate-500 tracking-sm border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 py-6 border-t border-gray-200">
                        <button
                          type="button"
                          className="bg-white py-2.5 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* My Sessions */}
              <div id="my-sessions" className="mb-16">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
                    Where you’re logged in
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                    We’ll alert you via olivia@rhye.com if there is any unusual
                    activity on your account.
                  </p>
                </div>
                <div>
                  <ul className="divide-y divide-gray-200 border-b border-gray-200">
                    <li className="flex sm:items-center justify-between gap-4 py-6">
                      <div className="flex gap-4">
                        <span>
                          <svg
                            className="w-6 h-6 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 17V21H9V17M5.2 17H18.8C19.9201 17 20.4802 17 20.908 16.782C21.2843 16.5903 21.5903 16.2843 21.782 15.908C22 15.4802 22 14.9201 22 13.8V6.2C22 5.0799 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H5.2C4.07989 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.07989 2 6.2V13.8C2 14.9201 2 15.4802 2.21799 15.908C2.40973 16.2843 2.71569 16.5903 3.09202 16.782C3.51984 17 4.0799 17 5.2 17Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div className="flex flex-col">
                          <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-1">
                            <h3 className="text-slate-800 text-sm font-medium tracking-sm">
                              2018 Macbook Pro 15-inch
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <svg
                                className="-ml-0.5 mr-1.5 h-2 w-2 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              Active Now
                            </span>
                          </div>
                          <span className="text-slate-500 text-sm tracking-sm">
                            Melbourne, Australia • 22 Jan at 10:40am
                          </span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="hidden sm:inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Delete Session
                      </button>
                      <button
                        type="submit"
                        className="inline-flex sm:hidden items-center justify-center w-10 h-10 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.7556 6.42263C15.081 6.09719 15.081 5.56956 14.7556 5.24412C14.4302 4.91868 13.9025 4.91868 13.5771 5.24412L14.7556 6.42263ZM5.24375 13.5775C4.91832 13.9029 4.91832 14.4305 5.24375 14.756C5.56919 15.0814 6.09683 15.0814 6.42226 14.756L5.24375 13.5775ZM6.42226 5.24412C6.09683 4.91868 5.56919 4.91868 5.24375 5.24412C4.91832 5.56956 4.91832 6.09719 5.24375 6.42263L6.42226 5.24412ZM13.5771 14.756C13.9025 15.0814 14.4302 15.0814 14.7556 14.756C15.081 14.4305 15.081 13.9029 14.7556 13.5775L13.5771 14.756ZM13.5771 5.24412L5.24375 13.5775L6.42226 14.756L14.7556 6.42263L13.5771 5.24412ZM5.24375 6.42263L13.5771 14.756L14.7556 13.5775L6.42226 5.24412L5.24375 6.42263Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </li>
                    <li className="flex sm:items-center justify-between gap-4 py-6">
                      <div className="flex gap-4">
                        <span>
                          <svg
                            className="w-6 h-6 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 17V21H9V17M5.2 17H18.8C19.9201 17 20.4802 17 20.908 16.782C21.2843 16.5903 21.5903 16.2843 21.782 15.908C22 15.4802 22 14.9201 22 13.8V6.2C22 5.0799 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H5.2C4.07989 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.07989 2 6.2V13.8C2 14.9201 2 15.4802 2.21799 15.908C2.40973 16.2843 2.71569 16.5903 3.09202 16.782C3.51984 17 4.0799 17 5.2 17Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div className="flex flex-col">
                          <div className="inline-flex items-center gap-2 mb-1">
                            <h3 className="text-slate-800 text-sm font-medium tracking-sm">
                              2018 Macbook Pro 15-inch
                            </h3>
                          </div>
                          <span className="text-slate-500 text-sm tracking-sm">
                            Melbourne, Australia • 22 Jan at 10:40am
                          </span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="hidden sm:inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Delete Session
                      </button>
                      <button
                        type="submit"
                        className="inline-flex sm:hidden items-center justify-center w-10 h-10 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.7556 6.42263C15.081 6.09719 15.081 5.56956 14.7556 5.24412C14.4302 4.91868 13.9025 4.91868 13.5771 5.24412L14.7556 6.42263ZM5.24375 13.5775C4.91832 13.9029 4.91832 14.4305 5.24375 14.756C5.56919 15.0814 6.09683 15.0814 6.42226 14.756L5.24375 13.5775ZM6.42226 5.24412C6.09683 4.91868 5.56919 4.91868 5.24375 5.24412C4.91832 5.56956 4.91832 6.09719 5.24375 6.42263L6.42226 5.24412ZM13.5771 14.756C13.9025 15.0814 14.4302 15.0814 14.7556 14.756C15.081 14.4305 15.081 13.9029 14.7556 13.5775L13.5771 14.756ZM13.5771 5.24412L5.24375 13.5775L6.42226 14.756L14.7556 6.42263L13.5771 5.24412ZM5.24375 6.42263L13.5771 14.756L14.7556 13.5775L6.42226 5.24412L5.24375 6.42263Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* My Plans */}
              <div id="my-plans" className="mb-16">
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
                    My Plans
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                    Plans starting at less than 1/week. Cancel anytime.
                  </p>
                </div>
                <div className="py-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
                    Account plans
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                    Pick an account plan that fits your workflow.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 py-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
                      Current plan
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                      We’ll credit your account if you need to downgrade during
                      the billing cycle.
                    </p>
                  </div>
                  <div className="w-full">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="sr-only">
                        Server size
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {plans.map((plan) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ checked }) =>
                              `
                  ${checked ? 'bg-purple-50 border-purple-700' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 border border-slate-200 focus:outline-none`
                            }
                          >
                            {({ checked }) => (
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex items-center gap-1">
                                    <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-700 mr-4 rounded-full ring-4 ring-purple-50">
                                      {plan.icons}
                                    </span>
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium  ${
                                        checked
                                          ? 'text-purple-700'
                                          : 'text-slate-700'
                                      }`}
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={`inline-flex ${
                                        checked
                                          ? 'text-purple-700'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      <span>
                                        {plan.price}/{plan.cycle}
                                      </span>{' '}
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-purple-700">
                                    <CheckIcon className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 py-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
                      Billing and invoicing
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                      Pick an account plan that fits your workflow.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  >
                    <svg
                      className="w-5 h-5 text-slate-700"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66699 14.1667L10.0003 17.5M10.0003 17.5L13.3337 14.1667M10.0003 17.5V10M16.667 13.9524C17.6849 13.1117 18.3337 11.8399 18.3337 10.4167C18.3337 7.88536 16.2816 5.83333 13.7503 5.83333C13.5682 5.83333 13.3979 5.73833 13.3054 5.58145C12.2187 3.73736 10.2124 2.5 7.91699 2.5C4.46521 2.5 1.66699 5.29822 1.66699 8.75C1.66699 10.4718 2.3632 12.0309 3.48945 13.1613"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Download all
                  </button>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
                      Billing history
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                      Please reach out to our friendly team via{' '}
                      <span className="font-medium">billing@altogic.com</span>{' '}
                      with questions.
                    </p>
                  </div>
                  <div className="w-full">
                    <div>
                      <div className="overflow-x-auto">
                        <div className="inline-block align-middle border border-gray-200 rounded-lg">
                          <div className="relative overflow-hidden md:rounded-lg">
                            {selectedPeople.length > 0 && (
                              <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                  Bulk edit
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                  Delete all
                                </button>
                              </div>
                            )}
                            <table className="min-w-full table-fixed divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                                  >
                                    <input
                                      type="checkbox"
                                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 sm:left-6"
                                      ref={checkbox}
                                      checked={checked}
                                      onChange={toggleAll}
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="min-w-[12rem] py-3.5 pr-6 text-left text-sm font-medium text-slate-500"
                                  >
                                    Invoice
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3.5 text-left text-sm font-medium text-slate-500"
                                  >
                                    Status
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3.5 text-left text-sm font-medium text-slate-500"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3.5 text-left text-sm font-medium text-slate-500"
                                  >
                                    Plan
                                  </th>
                                  <th
                                    scope="col"
                                    className="relative py-3.5 px-6"
                                  >
                                    <span className="sr-only">Edit</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {people.map((person) => (
                                  <tr
                                    key={person.email}
                                    className={
                                      selectedPeople.includes(person)
                                        ? 'bg-gray-50'
                                        : undefined
                                    }
                                  >
                                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                      {selectedPeople.includes(person) && (
                                        <div className="absolute inset-y-0 left-0 w-0.5 bg-purple-600" />
                                      )}
                                      <input
                                        type="checkbox"
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 sm:left-6"
                                        value={person.email}
                                        checked={selectedPeople.includes(
                                          person
                                        )}
                                        onChange={(e) =>
                                          setSelectedPeople(
                                            e.target.checked
                                              ? [...selectedPeople, person]
                                              : selectedPeople.filter(
                                                  (p) => p !== person
                                                )
                                          )
                                        }
                                      />
                                    </td>
                                    <td
                                      className={classNames(
                                        'whitespace-nowrap py-4 pr-6 text-sm font-medium',
                                        selectedPeople.includes(person)
                                          ? 'text-purple-600'
                                          : 'text-slate-900'
                                      )}
                                    >
                                      {person.date}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                        <svg
                                          className="w-3 h-3 text-green-500"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M10 3L4.5 8.5L2 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        Paid
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                      {person.amount}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                      {person.plan}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                      <a
                                        href="#"
                                        className="text-purple-600 hover:text-purple-900"
                                      >
                                        Download
                                        <span className="sr-only">
                                          , {person.name}
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Monthly(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33301 9.66663L7.76116 12.8807C7.84862 12.9244 7.89234 12.9463 7.93821 12.9549C7.97883 12.9625 8.02052 12.9625 8.06114 12.9549C8.10701 12.9463 8.15073 12.9244 8.23819 12.8807L14.6663 9.66663M1.33301 6.3333L7.76116 3.11922C7.84862 3.07549 7.89234 3.05363 7.93821 3.04502C7.97883 3.0374 8.02052 3.0374 8.06114 3.04502C8.10701 3.05363 8.15073 3.07549 8.23819 3.11922L14.6663 6.3333L8.23819 9.54737C8.15073 9.5911 8.10701 9.61296 8.06114 9.62157C8.02052 9.62919 7.97883 9.62919 7.93821 9.62157C7.89234 9.61296 7.84862 9.5911 7.76116 9.54737L1.33301 6.3333Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Annual(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66625 1.33337L2.72855 8.45861C2.49601 8.73766 2.37974 8.87718 2.37797 8.99502C2.37642 9.09745 2.42207 9.19491 2.50175 9.2593C2.59341 9.33337 2.77503 9.33337 3.13827 9.33337H7.99958L7.33292 14.6667L13.2706 7.54147C13.5032 7.26243 13.6194 7.1229 13.6212 7.00507C13.6227 6.90263 13.5771 6.80517 13.4974 6.74078C13.4058 6.66671 13.2241 6.66671 12.8609 6.66671H7.99958L8.66625 1.33337Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
