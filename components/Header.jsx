import { Fragment, useEffect, useState } from 'react';
import { Menu, Dialog, Popover, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from './profile/Avatar';
import Button from './basic/button';
import { authActions } from '../redux/auth/authSlice';

export default function Header() {
  const [mobileNotifications, setMobileNotifications] = useState(false);
  const sessionUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logoutRequest());
  };

  return (
    <Popover className="relative bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4 lg:px-8 lg:py-6">
        <div className="flex justify-between items-center lg:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Altogic</span>
                <img
                  className="w-[114px] h-[39px] sm:w-[135px] sm:h-[46px]"
                  src="/logo.svg"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <Popover.Group as="nav" className="hidden lg:flex gap-1">
            <Link href="/">
              <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                <svg
                  className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.86719 16H14.8672M9.88488 1.764L3.10258 7.03912C2.64921 7.39175 2.42252 7.56806 2.25921 7.78886C2.11455 7.98444 2.00679 8.20478 1.94121 8.43905C1.86719 8.70352 1.86719 8.9907 1.86719 9.56505V16.8C1.86719 17.9201 1.86719 18.4801 2.08517 18.908C2.27692 19.2843 2.58288 19.5903 2.95921 19.782C3.38703 20 3.94708 20 5.06719 20H16.6672C17.7873 20 18.3473 20 18.7752 19.782C19.1515 19.5903 19.4575 19.2843 19.6492 18.908C19.8672 18.4801 19.8672 17.9201 19.8672 16.8V9.56505C19.8672 8.9907 19.8672 8.70352 19.7932 8.43905C19.7276 8.20478 19.6198 7.98444 19.4752 7.78886C19.3119 7.56806 19.0852 7.39175 18.6318 7.03913L11.8495 1.764C11.4982 1.49075 11.3225 1.35412 11.1285 1.3016C10.9574 1.25526 10.777 1.25526 10.6058 1.3016C10.4119 1.35412 10.2362 1.49075 9.88488 1.764Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Home
              </a>
            </Link>

            <Link href="/list-detail">
              <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                <svg
                  className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.86719 7.8C5.86719 6.11984 5.86719 5.27976 6.19417 4.63803C6.48179 4.07354 6.94073 3.6146 7.50522 3.32698C8.14695 3 8.98703 3 10.6672 3H15.0672C16.7473 3 17.5874 3 18.2292 3.32698C18.7936 3.6146 19.2526 4.07354 19.5402 4.63803C19.8672 5.27976 19.8672 6.11984 19.8672 7.8V21L12.8672 17L5.86719 21V7.8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Lists
              </a>
            </Link>
            <Link href="/my-stories">
              <a className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50">
                <svg
                  className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8672 21L12.7671 20.8499C12.0725 19.808 11.7252 19.287 11.2663 18.9098C10.86 18.5759 10.392 18.3254 9.88879 18.1726C9.32044 18 8.6943 18 7.44201 18H6.06719C4.94708 18 4.38703 18 3.95921 17.782C3.58288 17.5903 3.27692 17.2843 3.08517 16.908C2.86719 16.4802 2.86719 15.9201 2.86719 14.8V6.2C2.86719 5.07989 2.86719 4.51984 3.08517 4.09202C3.27692 3.71569 3.58288 3.40973 3.95921 3.21799C4.38703 3 4.94708 3 6.06719 3H6.46719C8.7074 3 9.8275 3 10.6831 3.43597C11.4358 3.81947 12.0477 4.43139 12.4312 5.18404C12.8672 6.03968 12.8672 7.15979 12.8672 9.4M12.8672 21V9.4M12.8672 21L12.9672 20.8499C13.6619 19.808 14.0092 19.287 14.4681 18.9098C14.8743 18.5759 15.3424 18.3254 15.8456 18.1726C16.4139 18 17.0401 18 18.2924 18H19.6672C20.7873 18 21.3473 18 21.7752 17.782C22.1515 17.5903 22.4575 17.2843 22.6492 16.908C22.8672 16.4802 22.8672 15.9201 22.8672 14.8V6.2C22.8672 5.07989 22.8672 4.51984 22.6492 4.09202C22.4575 3.71569 22.1515 3.40973 21.7752 3.21799C21.3473 3 20.7873 3 19.6672 3H19.2672C17.027 3 15.9069 3 15.0512 3.43597C14.2986 3.81947 13.6867 4.43139 13.3032 5.18404C12.8672 6.03968 12.8672 7.15979 12.8672 9.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Stories
              </a>
            </Link>
          </Popover.Group>
          <div className="flex items-center flex-row-reverse lg:flex-row justify-end lg:flex-1 lg:w-0 gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 15L16.6666 15.9117C16.2245 16.3951 15.6251 16.6666 15.0001 16.6666C14.3751 16.6666 13.7757 16.3951 13.3337 15.9117C12.891 15.4292 12.2916 15.1584 11.6668 15.1584C11.042 15.1584 10.4426 15.4292 9.99998 15.9117M2.5 16.6666H3.89545C4.3031 16.6666 4.50693 16.6666 4.69874 16.6206C4.8688 16.5798 5.03138 16.5124 5.1805 16.421C5.34869 16.318 5.49282 16.1738 5.78107 15.8856L16.25 5.41663C16.9404 4.72628 16.9404 3.60699 16.25 2.91663C15.5597 2.22628 14.4404 2.22628 13.75 2.91663L3.28105 13.3856C2.9928 13.6738 2.84867 13.818 2.7456 13.9862C2.65422 14.1353 2.58688 14.2979 2.54605 14.4679C2.5 14.6597 2.5 14.8636 2.5 15.2712V16.6666Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* Desktop Notification */}
            <Menu
              as="div"
              className="relative hidden lg:inline-flex items-center"
            >
              <Menu.Button className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.7952 17.5C8.38281 18.0187 9.15468 18.3334 10.0001 18.3334C10.8454 18.3334 11.6173 18.0187 12.2049 17.5M15.0001 6.66669C15.0001 5.3406 14.4733 4.06884 13.5356 3.13115C12.5979 2.19347 11.3261 1.66669 10.0001 1.66669C8.67397 1.66669 7.4022 2.19347 6.46452 3.13115C5.52684 4.06884 5.00006 5.3406 5.00006 6.66669C5.00006 9.24184 4.35045 11.005 3.62478 12.1712C3.01266 13.1549 2.7066 13.6468 2.71783 13.784C2.73025 13.9359 2.76244 13.9939 2.88487 14.0847C2.99544 14.1667 3.49388 14.1667 4.49077 14.1667H15.5093C16.5062 14.1667 17.0047 14.1667 17.1152 14.0847C17.2377 13.9939 17.2699 13.9359 17.2823 13.784C17.2935 13.6468 16.9875 13.1549 16.3753 12.1712C15.6497 11.005 15.0001 9.24184 15.0001 6.66669Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                    <div className="p-4 bg-white rounded-lg">
                      <div className="flex items-start w-full">
                        <div className="flex items-center flex-1">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-purple-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                            <strong className="font-semibold">
                              {user?.name}
                            </strong>{' '}
                            liked your{' '}
                            <strong className="font-semibold">
                              Lorem Ipsum Dolor Sit Amet
                            </strong>
                            forum!
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                          <button
                            type="button"
                            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="flex items-start w-full">
                        <div className="flex items-center flex-1">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-purple-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                            <strong className="font-semibold">
                              Emillia Gates
                            </strong>
                            liked your
                            <strong className="font-semibold">
                              Lorem Ipsum Dolor Sit Amet
                            </strong>
                            forum!
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                          <button
                            type="button"
                            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* Mobile Notification */}
            <div className="flex lg:hidden items-center justify-center">
              <button
                type="button"
                onClick={() => setMobileNotifications(true)}
                className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.7952 17.5C8.38281 18.0187 9.15468 18.3334 10.0001 18.3334C10.8454 18.3334 11.6173 18.0187 12.2049 17.5M15.0001 6.66669C15.0001 5.3406 14.4733 4.06884 13.5356 3.13115C12.5979 2.19347 11.3261 1.66669 10.0001 1.66669C8.67397 1.66669 7.4022 2.19347 6.46452 3.13115C5.52684 4.06884 5.00006 5.3406 5.00006 6.66669C5.00006 9.24184 4.35045 11.005 3.62478 12.1712C3.01266 13.1549 2.7066 13.6468 2.71783 13.784C2.73025 13.9359 2.76244 13.9939 2.88487 14.0847C2.99544 14.1667 3.49388 14.1667 4.49077 14.1667H15.5093C16.5062 14.1667 17.0047 14.1667 17.1152 14.0847C17.2377 13.9939 17.2699 13.9359 17.2823 13.784C17.2935 13.6468 16.9875 13.1549 16.3753 12.1712C15.6497 11.005 15.0001 9.24184 15.0001 6.66669Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <Transition appear show={mobileNotifications} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setMobileNotifications(false)}
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
                        <div className="p-4 bg-white rounded-lg">
                          <div className="flex items-start w-full">
                            <div className="flex items-center flex-1">
                              <div className="flex-shrink-0">
                                <svg
                                  className="w-6 h-6 text-purple-500"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                                <strong className="font-semibold">
                                  İsmail Erüstün
                                </strong>
                                liked your
                                <strong className="font-semibold">
                                  Lorem Ipsum Dolor Sit Amet
                                </strong>
                                forum!
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                              <button
                                type="button"
                                className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                              >
                                <span className="sr-only">Close</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                          <div className="flex items-start w-full">
                            <div className="flex items-center flex-1">
                              <div className="flex-shrink-0">
                                <svg
                                  className="w-6 h-6 text-purple-500"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                                <strong className="font-semibold">
                                  Emillia Gates
                                </strong>
                                liked your
                                <strong className="font-semibold">
                                  Lorem Ipsum Dolor Sit Amet
                                </strong>
                                forum!
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                              <button
                                type="button"
                                className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                              >
                                <span className="sr-only">Close</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-white rounded-lg">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-sm tracking-sm text-purple-700"
                          >
                            See all notifications
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
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9107 18.0893C17.2362 18.4147 17.7638 18.4147 18.0893 18.0893C18.4147 17.7638 18.4147 17.2362 18.0893 16.9107L16.9107 18.0893ZM14.4643 13.2857C14.1388 12.9603 13.6112 12.9603 13.2857 13.2857C12.9603 13.6112 12.9603 14.1388 13.2857 14.4643L14.4643 13.2857ZM18.0893 16.9107L14.4643 13.2857L13.2857 14.4643L16.9107 18.0893L18.0893 16.9107ZM15 9.16667C15 12.3883 12.3883 15 9.16667 15V16.6667C13.3088 16.6667 16.6667 13.3088 16.6667 9.16667H15ZM9.16667 15C5.94501 15 3.33333 12.3883 3.33333 9.16667H1.66667C1.66667 13.3088 5.02453 16.6667 9.16667 16.6667V15ZM3.33333 9.16667C3.33333 5.94501 5.94501 3.33333 9.16667 3.33333V1.66667C5.02453 1.66667 1.66667 5.02453 1.66667 9.16667H3.33333ZM9.16667 3.33333C12.3883 3.33333 15 5.94501 15 9.16667H16.6667C16.6667 5.02453 13.3088 1.66667 9.16667 1.66667V3.33333Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <Link href="/settings">
              <a className="hidden lg:inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99996 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61931 11.3807 7.50002 9.99996 7.50002C8.61925 7.50002 7.49996 8.61931 7.49996 10C7.49996 11.3807 8.61925 12.5 9.99996 12.5Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.606 12.2727C15.5052 12.5012 15.4751 12.7547 15.5197 13.0005C15.5642 13.2462 15.6814 13.473 15.856 13.6515L15.9015 13.697C16.0423 13.8377 16.1541 14.0048 16.2304 14.1887C16.3066 14.3727 16.3458 14.5698 16.3458 14.769C16.3458 14.9681 16.3066 15.1652 16.2304 15.3492C16.1541 15.5331 16.0423 15.7002 15.9015 15.8409C15.7608 15.9818 15.5937 16.0936 15.4097 16.1698C15.2258 16.2461 15.0286 16.2853 14.8295 16.2853C14.6304 16.2853 14.4332 16.2461 14.2493 16.1698C14.0654 16.0936 13.8983 15.9818 13.7575 15.8409L13.7121 15.7955C13.5335 15.6208 13.3068 15.5037 13.061 15.4591C12.8153 15.4145 12.5618 15.4446 12.3333 15.5455C12.1092 15.6415 11.9181 15.801 11.7835 16.0042C11.6489 16.2075 11.5767 16.4456 11.5757 16.6894V16.8182C11.5757 17.22 11.4161 17.6054 11.1319 17.8896C10.8478 18.1737 10.4624 18.3334 10.0606 18.3334C9.65872 18.3334 9.27334 18.1737 8.98919 17.8896C8.70505 17.6054 8.54541 17.22 8.54541 16.8182V16.75C8.53955 16.4993 8.45838 16.2561 8.31247 16.0521C8.16655 15.8481 7.96264 15.6927 7.72723 15.6061C7.49874 15.5052 7.24527 15.4752 6.99951 15.5197C6.75376 15.5643 6.52699 15.6814 6.34844 15.8561L6.30299 15.9015C6.16227 16.0424 5.99517 16.1542 5.81123 16.2304C5.6273 16.3067 5.43013 16.3459 5.23102 16.3459C5.03191 16.3459 4.83474 16.3067 4.65081 16.2304C4.46687 16.1542 4.29977 16.0424 4.15905 15.9015C4.01818 15.7608 3.90642 15.5937 3.83017 15.4098C3.75392 15.2258 3.71468 15.0287 3.71468 14.8296C3.71468 14.6305 3.75392 14.4333 3.83017 14.2494C3.90642 14.0654 4.01818 13.8983 4.15905 13.7576L4.2045 13.7121C4.37915 13.5336 4.49631 13.3068 4.54087 13.0611C4.58543 12.8153 4.55535 12.5619 4.4545 12.3334C4.35847 12.1093 4.19902 11.9182 3.99577 11.7836C3.79252 11.649 3.55434 11.5768 3.31057 11.5758H3.18178C2.77993 11.5758 2.39455 11.4161 2.1104 11.132C1.82626 10.8479 1.66663 10.4625 1.66663 10.0606C1.66663 9.65878 1.82626 9.2734 2.1104 8.98925C2.39455 8.70511 2.77993 8.54548 3.18178 8.54548H3.24996C3.50071 8.53961 3.7439 8.45844 3.94791 8.31253C4.15192 8.16661 4.30732 7.9627 4.3939 7.72729C4.49474 7.4988 4.52483 7.24533 4.48027 6.99957C4.43571 6.75382 4.31855 6.52705 4.1439 6.34851L4.09844 6.30305C3.95757 6.16233 3.84581 5.99523 3.76957 5.81129C3.69332 5.62736 3.65407 5.4302 3.65407 5.23108C3.65407 5.03197 3.69332 4.83481 3.76957 4.65087C3.84581 4.46693 3.95757 4.29983 4.09844 4.15911C4.23916 4.01824 4.40627 3.90648 4.5902 3.83023C4.77414 3.75398 4.9713 3.71474 5.17041 3.71474C5.36953 3.71474 5.56669 3.75398 5.75063 3.83023C5.93456 3.90648 6.10167 4.01824 6.24238 4.15911L6.28784 4.20457C6.46638 4.37922 6.69315 4.49637 6.93891 4.54093C7.18466 4.58549 7.43813 4.55541 7.66663 4.45457H7.72723C7.9513 4.35853 8.1424 4.19908 8.277 3.99583C8.4116 3.79258 8.48384 3.5544 8.48481 3.31063V3.18184C8.48481 2.78 8.64444 2.39461 8.92859 2.11046C9.21273 1.82632 9.59812 1.66669 9.99996 1.66669C10.4018 1.66669 10.7872 1.82632 11.0713 2.11046C11.3555 2.39461 11.5151 2.78 11.5151 3.18184V3.25002C11.5161 3.4938 11.5883 3.73197 11.7229 3.93522C11.8575 4.13847 12.0486 4.29793 12.2727 4.39396C12.5012 4.4948 12.7547 4.52489 13.0004 4.48033C13.2462 4.43577 13.4729 4.31861 13.6515 4.14396L13.6969 4.09851C13.8376 3.95763 14.0048 3.84588 14.1887 3.76963C14.3726 3.69338 14.5698 3.65413 14.7689 3.65413C14.968 3.65413 15.1652 3.69338 15.3491 3.76963C15.533 3.84588 15.7002 3.95763 15.8409 4.09851C15.9817 4.23922 16.0935 4.40633 16.1697 4.59026C16.246 4.7742 16.2852 4.97136 16.2852 5.17048C16.2852 5.36959 16.246 5.56675 16.1697 5.75069C16.0935 5.93462 15.9817 6.10173 15.8409 6.24244L15.7954 6.2879C15.6208 6.46644 15.5036 6.69321 15.459 6.93897C15.4145 7.18472 15.4446 7.43819 15.5454 7.66669V7.72729C15.6414 7.95136 15.8009 8.14246 16.0042 8.27706C16.2074 8.41166 16.4456 8.4839 16.6894 8.48487H16.8181C17.22 8.48487 17.6054 8.6445 17.8895 8.92865C18.1737 9.21279 18.3333 9.59818 18.3333 10C18.3333 10.4019 18.1737 10.7872 17.8895 11.0714C17.6054 11.3555 17.22 11.5152 16.8181 11.5152H16.75C16.5062 11.5161 16.268 11.5884 16.0648 11.723C15.8615 11.8576 15.7021 12.0487 15.606 12.2727Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Link>
            {/* Desktop Profile Button */}
            <Menu
              as="div"
              className="relative hidden lg:inline-flex items-center"
            >
              <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                <Avatar
                  className="inline-block w-10 h-10 rounded-full"
                  src={user?.profilePicture}
                  alt={user?.name}
                />
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
                <Menu.Items className="origin-top-right absolute top-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white overflow-hidden ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                  <div className="py-3 px-4 flex items-center gap-3 border-b border-gray-200">
                    <Avatar
                      className="h-10 w-10 rounded-full"
                      src={user?.profilePicture}
                      alt={user?.name}
                    />
                    <div>
                      <p className="text-slate-700 text-sm font-medium tracking-sm">
                        {user?.name}
                      </p>
                      <p className="text-slate-500 text-sm tracking-sm">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div>
                      <Menu.Item
                        onClick={() => router.push(`/${user?.username}/about`)}
                      >
                        <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                          <svg
                            className="w-4 h-4 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3333 14C13.3333 13.0696 13.3333 12.6044 13.2185 12.2259C12.9599 11.3736 12.293 10.7067 11.4407 10.4482C11.0622 10.3333 10.597 10.3333 9.66662 10.3333H6.3333C5.40292 10.3333 4.93773 10.3333 4.5592 10.4482C3.70693 10.7067 3.03999 11.3736 2.78145 12.2259C2.66663 12.6044 2.66663 13.0696 2.66663 14M11 5C11 6.65685 9.65681 8 7.99996 8C6.3431 8 4.99996 6.65685 4.99996 5C4.99996 3.34315 6.3431 2 7.99996 2C9.65681 2 11 3.34315 11 5Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          View profile
                        </a>
                      </Menu.Item>
                      <Menu.Item onClick={() => router.push('/settings')}>
                        <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer ">
                          <svg
                            className="w-4 h-4 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.00004 10C9.10461 10 10 9.10461 10 8.00004C10 6.89547 9.10461 6.00004 8.00004 6.00004C6.89547 6.00004 6.00004 6.89547 6.00004 8.00004C6.00004 9.10461 6.89547 10 8.00004 10Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.4849 9.81822C12.4042 10.001 12.3801 10.2038 12.4158 10.4004C12.4514 10.597 12.5452 10.7784 12.6849 10.9213L12.7213 10.9576C12.834 11.0702 12.9234 11.2039 12.9844 11.351C13.0454 11.4982 13.0768 11.6559 13.0768 11.8152C13.0768 11.9745 13.0454 12.1322 12.9844 12.2794C12.9234 12.4265 12.834 12.5602 12.7213 12.6728C12.6087 12.7855 12.475 12.8749 12.3278 12.9359C12.1807 12.9969 12.023 13.0283 11.8637 13.0283C11.7044 13.0283 11.5467 12.9969 11.3995 12.9359C11.2524 12.8749 11.1187 12.7855 11.0061 12.6728L10.9697 12.6364C10.8269 12.4967 10.6455 12.403 10.4489 12.3673C10.2523 12.3317 10.0495 12.3557 9.86671 12.4364C9.68745 12.5132 9.53458 12.6408 9.42689 12.8034C9.31921 12.966 9.26142 13.1565 9.26065 13.3516V13.4546C9.26065 13.7761 9.13294 14.0844 8.90562 14.3117C8.67831 14.539 8.37 14.6667 8.04853 14.6667C7.72705 14.6667 7.41874 14.539 7.19143 14.3117C6.96411 14.0844 6.8364 13.7761 6.8364 13.4546V13.4C6.83171 13.1994 6.76678 13.0049 6.65005 12.8417C6.53332 12.6785 6.37018 12.5542 6.18186 12.4849C5.99906 12.4042 5.79629 12.3801 5.59968 12.4158C5.40308 12.4514 5.22166 12.5452 5.07883 12.6849L5.04247 12.7213C4.92989 12.834 4.79621 12.9234 4.64906 12.9844C4.50191 13.0454 4.34418 13.0768 4.18489 13.0768C4.0256 13.0768 3.86787 13.0454 3.72072 12.9844C3.57357 12.9234 3.43989 12.834 3.32731 12.7213C3.21461 12.6087 3.12521 12.475 3.06421 12.3278C3.00321 12.1807 2.97181 12.023 2.97181 11.8637C2.97181 11.7044 3.00321 11.5467 3.06421 11.3995C3.12521 11.2524 3.21461 11.1187 3.32731 11.0061L3.36368 10.9697C3.5034 10.8269 3.59712 10.6455 3.63277 10.4489C3.66842 10.2523 3.64435 10.0495 3.56368 9.86671C3.48685 9.68745 3.35929 9.53458 3.19669 9.42689C3.03409 9.31921 2.84355 9.26142 2.64853 9.26065H2.5455C2.22402 9.26065 1.91571 9.13294 1.6884 8.90562C1.46108 8.67831 1.33337 8.37 1.33337 8.04853C1.33337 7.72705 1.46108 7.41874 1.6884 7.19143C1.91571 6.96411 2.22402 6.8364 2.5455 6.8364H2.60004C2.80064 6.83171 2.9952 6.76678 3.1584 6.65005C3.32161 6.53332 3.44593 6.37018 3.51519 6.18186C3.59587 5.99906 3.61993 5.79629 3.58429 5.59968C3.54864 5.40308 3.45491 5.22166 3.31519 5.07883L3.27883 5.04247C3.16613 4.92989 3.07673 4.79621 3.01573 4.64906C2.95473 4.50191 2.92333 4.34418 2.92333 4.18489C2.92333 4.0256 2.95473 3.86787 3.01573 3.72072C3.07673 3.57357 3.16613 3.43989 3.27883 3.32731C3.3914 3.21461 3.52509 3.12521 3.67223 3.06421C3.81938 3.00321 3.97711 2.97181 4.1364 2.97181C4.2957 2.97181 4.45343 3.00321 4.60057 3.06421C4.74772 3.12521 4.88141 3.21461 4.99398 3.32731L5.03034 3.36368C5.17318 3.5034 5.3546 3.59712 5.5512 3.63277C5.7478 3.66842 5.95058 3.64435 6.13337 3.56368H6.18186C6.36111 3.48685 6.51399 3.35929 6.62167 3.19669C6.72936 3.03409 6.78714 2.84355 6.78792 2.64853V2.5455C6.78792 2.22402 6.91563 1.91571 7.14294 1.6884C7.37026 1.46108 7.67857 1.33337 8.00004 1.33337C8.32152 1.33337 8.62982 1.46108 8.85714 1.6884C9.08446 1.91571 9.21216 2.22402 9.21216 2.5455V2.60004C9.21294 2.79506 9.27073 2.9856 9.37841 3.1482C9.48609 3.3108 9.63897 3.43837 9.81822 3.51519C10.001 3.59587 10.2038 3.61993 10.4004 3.58429C10.597 3.54864 10.7784 3.45491 10.9213 3.31519L10.9576 3.27883C11.0702 3.16613 11.2039 3.07673 11.351 3.01573C11.4982 2.95473 11.6559 2.92333 11.8152 2.92333C11.9745 2.92333 12.1322 2.95473 12.2794 3.01573C12.4265 3.07673 12.5602 3.16613 12.6728 3.27883C12.7855 3.3914 12.8749 3.52509 12.9359 3.67223C12.9969 3.81938 13.0283 3.97711 13.0283 4.1364C13.0283 4.2957 12.9969 4.45343 12.9359 4.60057C12.8749 4.74772 12.7855 4.88141 12.6728 4.99398L12.6364 5.03034C12.4967 5.17318 12.403 5.3546 12.3673 5.5512C12.3317 5.7478 12.3557 5.95058 12.4364 6.13337V6.18186C12.5132 6.36111 12.6408 6.51399 12.8034 6.62167C12.966 6.72936 13.1565 6.78714 13.3516 6.78792H13.4546C13.7761 6.78792 14.0844 6.91563 14.3117 7.14294C14.539 7.37026 14.6667 7.67857 14.6667 8.00004C14.6667 8.32152 14.539 8.62982 14.3117 8.85714C14.0844 9.08446 13.7761 9.21216 13.4546 9.21216H13.4C13.205 9.21294 13.0145 9.27073 12.8519 9.37841C12.6893 9.48609 12.5617 9.63897 12.4849 9.81822Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Settings
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="#"
                          className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.66662 1.33337L2.72892 8.45861C2.49638 8.73766 2.38011 8.87718 2.37833 8.99502C2.37679 9.09745 2.42244 9.19491 2.50212 9.2593C2.59378 9.33337 2.7754 9.33337 3.13864 9.33337H7.99995L7.33328 14.6667L13.271 7.54147C13.5035 7.26243 13.6198 7.1229 13.6216 7.00507C13.6231 6.90263 13.5775 6.80517 13.4978 6.74078C13.4061 6.66671 13.2245 6.66671 12.8613 6.66671H7.99995L8.66662 1.33337Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Stats
                        </a>
                      </Menu.Item>
                    </div>
                    <div>
                      <span className="inline-flex px-6 pt-2.5 text-slate-400 text-xs tracking-sm">
                        Publications
                      </span>
                      <Menu.Item
                        onClick={() => router.push('/publication/Altogic')}
                      >
                        <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.635 10.2404L9.29624 7.92152L9.22528 7.79865L9.03811 7.47424L8.85078 7.79865L8.77982 7.92152L6.38773 12.0647L6.36398 12.1057L6.30164 12.2138L6.36413 12.322L6.38773 12.3628L7.72654 14.6817L7.79735 14.8047L7.98467 15.1289L8.172 14.8047L8.24296 14.6817L10.635 10.5385L10.6587 10.4974L10.7211 10.3894L10.6587 10.2812L10.635 10.2404Z"
                              fill="#84D5F7"
                            />
                            <path
                              d="M8.54305 7.65092L8.73038 7.32666H8.35588H8.21395H3.4145H3.27257H2.89807L3.08539 7.65092L3.15636 7.77394L5.55601 11.9303L5.62698 12.0532L5.81415 12.3776L6.00147 12.0532L6.07244 11.9303L8.47209 7.77394L8.54305 7.65092Z"
                              fill="#438CCB"
                            />
                            <path
                              d="M3.44834 6.98637H5.84799H5.98992H6.36442L6.17709 6.66196L6.10613 6.53909L4.90638 4.46083L4.83541 4.33796L4.64809 4.01355L4.46092 4.33796L4.38995 4.46083L3.19005 6.53909L3.11909 6.66196L2.93176 6.98637H3.30641H3.44834Z"
                              fill="#84D5F7"
                            />
                            <path
                              d="M5.60966 4.99852L6.67126 6.83726L6.69501 6.87826L6.75735 6.98645H6.88219H6.92955H8.03715H8.08436H8.20919L8.27168 6.87826L8.29529 6.83741L9.62032 4.54232L9.64408 4.50131L9.70642 4.39327L9.64408 4.28509L9.62032 4.24408L8.00492 1.44618L7.93395 1.32316L7.74663 0.998901L7.55946 1.32316L7.48849 1.44618L5.60966 4.70029L5.5859 4.74129L5.52356 4.84948L5.5859 4.95752L5.60966 4.99852Z"
                              fill="#55A6D7"
                            />
                            <path
                              d="M12.8433 7.32666H12.7013H9.86228H9.72035H9.3457L9.53303 7.65092L9.60399 7.77394L11.0236 10.2326L11.0946 10.3555L11.2817 10.6799L11.4691 10.3555L11.54 10.2326L12.9595 7.77394L13.0304 7.65092L13.2178 7.32666H12.8433Z"
                              fill="#55A6D7"
                            />
                            <path
                              d="M8.78947 6.66199L8.60229 6.9864H8.97679H9.11872H12.6674H12.8094H13.184L12.9967 6.66199L12.9257 6.53912L11.1513 3.46568L11.0803 3.34282L10.8932 3.01855L10.7058 3.34282L10.6349 3.46568L8.86043 6.53912L8.78947 6.66199Z"
                              fill="#62BFEC"
                            />
                            <path
                              d="M10.893 2.01971L9.90302 3.73467L7.74667 0L5.44749 3.98237L5.32644 4.19088L4.64736 3.01488L2.23999 7.18639L5.81412 13.3766L6.10509 12.8725L7.98469 16.128L10.9177 11.0482L11.2819 11.679L13.8759 7.18639L10.893 2.01971ZM12.8217 7.69389L11.2818 10.3617L9.62143 7.48675H12.9421L12.8211 7.69525L12.8217 7.69389ZM3.20748 6.82733L3.32853 6.61882L4.64872 4.33205L6.08936 6.82733H3.20748ZM8.11739 6.82733H6.84924L5.70745 4.84954L7.74667 1.31732L9.52277 4.39333L8.11739 6.82733ZM8.45466 7.48599L5.81412 12.0594L3.17373 7.48599H8.45466ZM9.03812 7.7927L10.5373 10.3895L7.98469 14.8107L6.48549 12.214L9.03812 7.7927ZM10.7728 3.54538L10.8938 3.33687L12.9084 6.82733H8.87788L10.7728 3.54538Z"
                              fill="#002C3B"
                            />
                          </svg>
                          Altogic
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="#"
                          className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.6667 1.33337L13.3375 0.997964C13.2297 0.782333 13.0248 0.631676 12.7868 0.593058C12.5488 0.554441 12.3068 0.632573 12.1363 0.803044L12.6667 1.33337ZM10.6667 3.33337L10.1363 2.80304C9.9957 2.9437 9.91668 3.13446 9.91668 3.33337H10.6667ZM12.6667 5.33337V6.08337C12.8656 6.08337 13.0564 6.00436 13.197 5.8637L12.6667 5.33337ZM14.6667 3.33337L15.197 3.8637C15.3675 3.69323 15.4456 3.45121 15.407 3.21324C15.3684 2.97527 15.2177 2.77037 15.0021 2.66255L14.6667 3.33337ZM13.3333 2.66671L12.6625 3.00212C12.7351 3.14726 12.8528 3.26496 12.9979 3.33753L13.3333 2.66671ZM7.46969 7.46967C7.1768 7.76256 7.1768 8.23744 7.46969 8.53033C7.76258 8.82323 8.23745 8.82323 8.53035 8.53034L7.46969 7.46967ZM15.4167 8.00004C15.4167 7.58583 15.0809 7.25004 14.6667 7.25004C14.2525 7.25004 13.9167 7.58583 13.9167 8.00004H15.4167ZM8.00004 2.08337C8.41425 2.08337 8.75004 1.74759 8.75004 1.33337C8.75004 0.91916 8.41425 0.583374 8.00004 0.583374V2.08337ZM12.0834 8.00004C12.0834 7.58583 11.7476 7.25004 11.3334 7.25004C10.9192 7.25004 10.5834 7.58583 10.5834 8.00004H12.0834ZM8.00004 5.41671C8.41425 5.41671 8.75004 5.08092 8.75004 4.66671C8.75004 4.25249 8.41425 3.91671 8.00004 3.91671V5.41671ZM12.1363 0.803044L10.1363 2.80304L11.197 3.8637L13.197 1.8637L12.1363 0.803044ZM9.91668 3.33337V5.33337H11.4167V3.33337H9.91668ZM10.6667 6.08337H12.6667V4.58337H10.6667V6.08337ZM13.197 5.8637L15.197 3.8637L14.1363 2.80304L12.1363 4.80304L13.197 5.8637ZM15.0021 2.66255L13.6688 1.99589L12.9979 3.33753L14.3313 4.00419L15.0021 2.66255ZM14.0042 2.3313L13.3375 0.997964L11.9959 1.66878L12.6625 3.00212L14.0042 2.3313ZM10.1364 4.80304L7.46969 7.46967L8.53035 8.53034L11.197 5.86371L10.1364 4.80304ZM13.9167 8.00004C13.9167 11.2677 11.2677 13.9167 8.00004 13.9167V15.4167C12.0962 15.4167 15.4167 12.0962 15.4167 8.00004H13.9167ZM8.00004 13.9167C4.73236 13.9167 2.08337 11.2677 2.08337 8.00004H0.583374C0.583374 12.0962 3.90393 15.4167 8.00004 15.4167V13.9167ZM2.08337 8.00004C2.08337 4.73236 4.73236 2.08337 8.00004 2.08337V0.583374C3.90393 0.583374 0.583374 3.90393 0.583374 8.00004H2.08337ZM10.5834 8.00004C10.5834 9.42678 9.42678 10.5834 8.00004 10.5834V12.0834C10.2552 12.0834 12.0834 10.2552 12.0834 8.00004H10.5834ZM8.00004 10.5834C6.57331 10.5834 5.41671 9.42678 5.41671 8.00004H3.91671C3.91671 10.2552 5.74488 12.0834 8.00004 12.0834V10.5834ZM5.41671 8.00004C5.41671 6.57331 6.57331 5.41671 8.00004 5.41671V3.91671C5.74488 3.91671 3.91671 5.74488 3.91671 8.00004H5.41671Z"
                              fill="currentColor"
                            />
                          </svg>
                          Manage Publications
                        </a>
                      </Menu.Item>
                    </div>
                    <div>
                      <Menu.Item>
                        <a
                          href="#"
                          className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Help
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer"
                          onClick={logout}
                        >
                          <svg
                            className="w-4 h-4 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6M6 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.7157 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Logout
                        </Button>
                      </Menu.Item>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img src="./logo.svg" alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>

      {/* Mobile Bottom Fixed Menu */}
      <div className="flex lg:hidden items-center justify-between fixed bottom-0 left-0 w-full h-[72px] bg-white border-b border-gray-200 shadow p-4 z-10">
        <button
          type="button"
          className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50"
        >
          <svg
            className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.86719 16H14.8672M9.88488 1.764L3.10258 7.03912C2.64921 7.39175 2.42252 7.56806 2.25921 7.78886C2.11455 7.98444 2.00679 8.20478 1.94121 8.43905C1.86719 8.70352 1.86719 8.9907 1.86719 9.56505V16.8C1.86719 17.9201 1.86719 18.4801 2.08517 18.908C2.27692 19.2843 2.58288 19.5903 2.95921 19.782C3.38703 20 3.94708 20 5.06719 20H16.6672C17.7873 20 18.3473 20 18.7752 19.782C19.1515 19.5903 19.4575 19.2843 19.6492 18.908C19.8672 18.4801 19.8672 17.9201 19.8672 16.8V9.56505C19.8672 8.9907 19.8672 8.70352 19.7932 8.43905C19.7276 8.20478 19.6198 7.98444 19.4752 7.78886C19.3119 7.56806 19.0852 7.39175 18.6318 7.03913L11.8495 1.764C11.4982 1.49075 11.3225 1.35412 11.1285 1.3016C10.9574 1.25526 10.777 1.25526 10.6058 1.3016C10.4119 1.35412 10.2362 1.49075 9.88488 1.764Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50"
        >
          <svg
            className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.86719 7.8C5.86719 6.11984 5.86719 5.27976 6.19417 4.63803C6.48179 4.07354 6.94073 3.6146 7.50522 3.32698C8.14695 3 8.98703 3 10.6672 3H15.0672C16.7473 3 17.5874 3 18.2292 3.32698C18.7936 3.6146 19.2526 4.07354 19.5402 4.63803C19.8672 5.27976 19.8672 6.11984 19.8672 7.8V21L12.8672 17L5.86719 21V7.8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="group inline-flex items-center gap-3 text-slate-800 px-3 py-2 text-base font-medium leading-6 tracking-sm rounded-md hover:text-purple-700 hover:bg-purple-50"
        >
          <svg
            className="w-6 h-6 text-slate-300 group-hover:text-purple-500"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8672 21L12.7671 20.8499C12.0725 19.808 11.7252 19.287 11.2663 18.9098C10.86 18.5759 10.392 18.3254 9.88879 18.1726C9.32044 18 8.6943 18 7.44201 18H6.06719C4.94708 18 4.38703 18 3.95921 17.782C3.58288 17.5903 3.27692 17.2843 3.08517 16.908C2.86719 16.4802 2.86719 15.9201 2.86719 14.8V6.2C2.86719 5.07989 2.86719 4.51984 3.08517 4.09202C3.27692 3.71569 3.58288 3.40973 3.95921 3.21799C4.38703 3 4.94708 3 6.06719 3H6.46719C8.7074 3 9.8275 3 10.6831 3.43597C11.4358 3.81947 12.0477 4.43139 12.4312 5.18404C12.8672 6.03968 12.8672 7.15979 12.8672 9.4M12.8672 21V9.4M12.8672 21L12.9672 20.8499C13.6619 19.808 14.0092 19.287 14.4681 18.9098C14.8743 18.5759 15.3424 18.3254 15.8456 18.1726C16.4139 18 17.0401 18 18.2924 18H19.6672C20.7873 18 21.3473 18 21.7752 17.782C22.1515 17.5903 22.4575 17.2843 22.6492 16.908C22.8672 16.4802 22.8672 15.9201 22.8672 14.8V6.2C22.8672 5.07989 22.8672 4.51984 22.6492 4.09202C22.4575 3.71569 22.1515 3.40973 21.7752 3.21799C21.3473 3 20.7873 3 19.6672 3H19.2672C17.027 3 15.9069 3 15.0512 3.43597C14.2986 3.81947 13.6867 4.43139 13.3032 5.18404C12.8672 6.03968 12.8672 7.15979 12.8672 9.4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Menu as="div" className="relative inline-flex lg:hidden items-center">
          <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
            <img
              className="inline-block w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
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
            <Menu.Items className="fixed bottom-20 right-0 mt-2 w-full rounded-md shadow-lg bg-white overflow-hidden ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
              <div className="py-3 px-4 flex items-center gap-3 border-b border-gray-200">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Olivia Rhye"
                />
                <div>
                  <p className="text-slate-700 text-sm font-medium tracking-sm">
                    Olivia Rhye
                  </p>
                  <p className="text-slate-500 text-sm tracking-sm">
                    oliviarhye@rhye.com
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div>
                  <Menu.Item>
                    <Link href={`/${user?.username}/about`}>
                      <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm cursor-pointer">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3333 14C13.3333 13.0696 13.3333 12.6044 13.2185 12.2259C12.9599 11.3736 12.293 10.7067 11.4407 10.4482C11.0622 10.3333 10.597 10.3333 9.66662 10.3333H6.3333C5.40292 10.3333 4.93773 10.3333 4.5592 10.4482C3.70693 10.7067 3.03999 11.3736 2.78145 12.2259C2.66663 12.6044 2.66663 13.0696 2.66663 14M11 5C11 6.65685 9.65681 8 7.99996 8C6.3431 8 4.99996 6.65685 4.99996 5C4.99996 3.34315 6.3431 2 7.99996 2C9.65681 2 11 3.34315 11 5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        View profile
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm"
                    >
                      <svg
                        className="w-4 h-4 text-slate-500"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.00004 10C9.10461 10 10 9.10461 10 8.00004C10 6.89547 9.10461 6.00004 8.00004 6.00004C6.89547 6.00004 6.00004 6.89547 6.00004 8.00004C6.00004 9.10461 6.89547 10 8.00004 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.4849 9.81822C12.4042 10.001 12.3801 10.2038 12.4158 10.4004C12.4514 10.597 12.5452 10.7784 12.6849 10.9213L12.7213 10.9576C12.834 11.0702 12.9234 11.2039 12.9844 11.351C13.0454 11.4982 13.0768 11.6559 13.0768 11.8152C13.0768 11.9745 13.0454 12.1322 12.9844 12.2794C12.9234 12.4265 12.834 12.5602 12.7213 12.6728C12.6087 12.7855 12.475 12.8749 12.3278 12.9359C12.1807 12.9969 12.023 13.0283 11.8637 13.0283C11.7044 13.0283 11.5467 12.9969 11.3995 12.9359C11.2524 12.8749 11.1187 12.7855 11.0061 12.6728L10.9697 12.6364C10.8269 12.4967 10.6455 12.403 10.4489 12.3673C10.2523 12.3317 10.0495 12.3557 9.86671 12.4364C9.68745 12.5132 9.53458 12.6408 9.42689 12.8034C9.31921 12.966 9.26142 13.1565 9.26065 13.3516V13.4546C9.26065 13.7761 9.13294 14.0844 8.90562 14.3117C8.67831 14.539 8.37 14.6667 8.04853 14.6667C7.72705 14.6667 7.41874 14.539 7.19143 14.3117C6.96411 14.0844 6.8364 13.7761 6.8364 13.4546V13.4C6.83171 13.1994 6.76678 13.0049 6.65005 12.8417C6.53332 12.6785 6.37018 12.5542 6.18186 12.4849C5.99906 12.4042 5.79629 12.3801 5.59968 12.4158C5.40308 12.4514 5.22166 12.5452 5.07883 12.6849L5.04247 12.7213C4.92989 12.834 4.79621 12.9234 4.64906 12.9844C4.50191 13.0454 4.34418 13.0768 4.18489 13.0768C4.0256 13.0768 3.86787 13.0454 3.72072 12.9844C3.57357 12.9234 3.43989 12.834 3.32731 12.7213C3.21461 12.6087 3.12521 12.475 3.06421 12.3278C3.00321 12.1807 2.97181 12.023 2.97181 11.8637C2.97181 11.7044 3.00321 11.5467 3.06421 11.3995C3.12521 11.2524 3.21461 11.1187 3.32731 11.0061L3.36368 10.9697C3.5034 10.8269 3.59712 10.6455 3.63277 10.4489C3.66842 10.2523 3.64435 10.0495 3.56368 9.86671C3.48685 9.68745 3.35929 9.53458 3.19669 9.42689C3.03409 9.31921 2.84355 9.26142 2.64853 9.26065H2.5455C2.22402 9.26065 1.91571 9.13294 1.6884 8.90562C1.46108 8.67831 1.33337 8.37 1.33337 8.04853C1.33337 7.72705 1.46108 7.41874 1.6884 7.19143C1.91571 6.96411 2.22402 6.8364 2.5455 6.8364H2.60004C2.80064 6.83171 2.9952 6.76678 3.1584 6.65005C3.32161 6.53332 3.44593 6.37018 3.51519 6.18186C3.59587 5.99906 3.61993 5.79629 3.58429 5.59968C3.54864 5.40308 3.45491 5.22166 3.31519 5.07883L3.27883 5.04247C3.16613 4.92989 3.07673 4.79621 3.01573 4.64906C2.95473 4.50191 2.92333 4.34418 2.92333 4.18489C2.92333 4.0256 2.95473 3.86787 3.01573 3.72072C3.07673 3.57357 3.16613 3.43989 3.27883 3.32731C3.3914 3.21461 3.52509 3.12521 3.67223 3.06421C3.81938 3.00321 3.97711 2.97181 4.1364 2.97181C4.2957 2.97181 4.45343 3.00321 4.60057 3.06421C4.74772 3.12521 4.88141 3.21461 4.99398 3.32731L5.03034 3.36368C5.17318 3.5034 5.3546 3.59712 5.5512 3.63277C5.7478 3.66842 5.95058 3.64435 6.13337 3.56368H6.18186C6.36111 3.48685 6.51399 3.35929 6.62167 3.19669C6.72936 3.03409 6.78714 2.84355 6.78792 2.64853V2.5455C6.78792 2.22402 6.91563 1.91571 7.14294 1.6884C7.37026 1.46108 7.67857 1.33337 8.00004 1.33337C8.32152 1.33337 8.62982 1.46108 8.85714 1.6884C9.08446 1.91571 9.21216 2.22402 9.21216 2.5455V2.60004C9.21294 2.79506 9.27073 2.9856 9.37841 3.1482C9.48609 3.3108 9.63897 3.43837 9.81822 3.51519C10.001 3.59587 10.2038 3.61993 10.4004 3.58429C10.597 3.54864 10.7784 3.45491 10.9213 3.31519L10.9576 3.27883C11.0702 3.16613 11.2039 3.07673 11.351 3.01573C11.4982 2.95473 11.6559 2.92333 11.8152 2.92333C11.9745 2.92333 12.1322 2.95473 12.2794 3.01573C12.4265 3.07673 12.5602 3.16613 12.6728 3.27883C12.7855 3.3914 12.8749 3.52509 12.9359 3.67223C12.9969 3.81938 13.0283 3.97711 13.0283 4.1364C13.0283 4.2957 12.9969 4.45343 12.9359 4.60057C12.8749 4.74772 12.7855 4.88141 12.6728 4.99398L12.6364 5.03034C12.4967 5.17318 12.403 5.3546 12.3673 5.5512C12.3317 5.7478 12.3557 5.95058 12.4364 6.13337V6.18186C12.5132 6.36111 12.6408 6.51399 12.8034 6.62167C12.966 6.72936 13.1565 6.78714 13.3516 6.78792H13.4546C13.7761 6.78792 14.0844 6.91563 14.3117 7.14294C14.539 7.37026 14.6667 7.67857 14.6667 8.00004C14.6667 8.32152 14.539 8.62982 14.3117 8.85714C14.0844 9.08446 13.7761 9.21216 13.4546 9.21216H13.4C13.205 9.21294 13.0145 9.27073 12.8519 9.37841C12.6893 9.48609 12.5617 9.63897 12.4849 9.81822Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Settings
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm"
                    >
                      <svg
                        className="w-4 h-4 text-slate-500"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.66662 1.33337L2.72892 8.45861C2.49638 8.73766 2.38011 8.87718 2.37833 8.99502C2.37679 9.09745 2.42244 9.19491 2.50212 9.2593C2.59378 9.33337 2.7754 9.33337 3.13864 9.33337H7.99995L7.33328 14.6667L13.271 7.54147C13.5035 7.26243 13.6198 7.1229 13.6216 7.00507C13.6231 6.90263 13.5775 6.80517 13.4978 6.74078C13.4061 6.66671 13.2245 6.66671 12.8613 6.66671H7.99995L8.66662 1.33337Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Stats
                    </button>
                  </Menu.Item>
                </div>
                <div>
                  <span className="inline-flex px-6 pt-2.5 text-slate-400 text-xs tracking-sm">
                    Publications
                  </span>
                  <Menu.Item>
                    <Link href="/publications">
                      <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm">
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.635 10.2404L9.29624 7.92152L9.22528 7.79865L9.03811 7.47424L8.85078 7.79865L8.77982 7.92152L6.38773 12.0647L6.36398 12.1057L6.30164 12.2138L6.36413 12.322L6.38773 12.3628L7.72654 14.6817L7.79735 14.8047L7.98467 15.1289L8.172 14.8047L8.24296 14.6817L10.635 10.5385L10.6587 10.4974L10.7211 10.3894L10.6587 10.2812L10.635 10.2404Z"
                            fill="#84D5F7"
                          />
                          <path
                            d="M8.54305 7.65092L8.73038 7.32666H8.35588H8.21395H3.4145H3.27257H2.89807L3.08539 7.65092L3.15636 7.77394L5.55601 11.9303L5.62698 12.0532L5.81415 12.3776L6.00147 12.0532L6.07244 11.9303L8.47209 7.77394L8.54305 7.65092Z"
                            fill="#438CCB"
                          />
                          <path
                            d="M3.44834 6.98637H5.84799H5.98992H6.36442L6.17709 6.66196L6.10613 6.53909L4.90638 4.46083L4.83541 4.33796L4.64809 4.01355L4.46092 4.33796L4.38995 4.46083L3.19005 6.53909L3.11909 6.66196L2.93176 6.98637H3.30641H3.44834Z"
                            fill="#84D5F7"
                          />
                          <path
                            d="M5.60966 4.99852L6.67126 6.83726L6.69501 6.87826L6.75735 6.98645H6.88219H6.92955H8.03715H8.08436H8.20919L8.27168 6.87826L8.29529 6.83741L9.62032 4.54232L9.64408 4.50131L9.70642 4.39327L9.64408 4.28509L9.62032 4.24408L8.00492 1.44618L7.93395 1.32316L7.74663 0.998901L7.55946 1.32316L7.48849 1.44618L5.60966 4.70029L5.5859 4.74129L5.52356 4.84948L5.5859 4.95752L5.60966 4.99852Z"
                            fill="#55A6D7"
                          />
                          <path
                            d="M12.8433 7.32666H12.7013H9.86228H9.72035H9.3457L9.53303 7.65092L9.60399 7.77394L11.0236 10.2326L11.0946 10.3555L11.2817 10.6799L11.4691 10.3555L11.54 10.2326L12.9595 7.77394L13.0304 7.65092L13.2178 7.32666H12.8433Z"
                            fill="#55A6D7"
                          />
                          <path
                            d="M8.78947 6.66199L8.60229 6.9864H8.97679H9.11872H12.6674H12.8094H13.184L12.9967 6.66199L12.9257 6.53912L11.1513 3.46568L11.0803 3.34282L10.8932 3.01855L10.7058 3.34282L10.6349 3.46568L8.86043 6.53912L8.78947 6.66199Z"
                            fill="#62BFEC"
                          />
                          <path
                            d="M10.893 2.01971L9.90302 3.73467L7.74667 0L5.44749 3.98237L5.32644 4.19088L4.64736 3.01488L2.23999 7.18639L5.81412 13.3766L6.10509 12.8725L7.98469 16.128L10.9177 11.0482L11.2819 11.679L13.8759 7.18639L10.893 2.01971ZM12.8217 7.69389L11.2818 10.3617L9.62143 7.48675H12.9421L12.8211 7.69525L12.8217 7.69389ZM3.20748 6.82733L3.32853 6.61882L4.64872 4.33205L6.08936 6.82733H3.20748ZM8.11739 6.82733H6.84924L5.70745 4.84954L7.74667 1.31732L9.52277 4.39333L8.11739 6.82733ZM8.45466 7.48599L5.81412 12.0594L3.17373 7.48599H8.45466ZM9.03812 7.7927L10.5373 10.3895L7.98469 14.8107L6.48549 12.214L9.03812 7.7927ZM10.7728 3.54538L10.8938 3.33687L12.9084 6.82733H8.87788L10.7728 3.54538Z"
                            fill="#002C3B"
                          />
                        </svg>
                        Altogic
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm"
                    >
                      <svg
                        className="w-4 h-4 text-slate-500"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6667 1.33337L13.3375 0.997964C13.2297 0.782333 13.0248 0.631676 12.7868 0.593058C12.5488 0.554441 12.3068 0.632573 12.1363 0.803044L12.6667 1.33337ZM10.6667 3.33337L10.1363 2.80304C9.9957 2.9437 9.91668 3.13446 9.91668 3.33337H10.6667ZM12.6667 5.33337V6.08337C12.8656 6.08337 13.0564 6.00436 13.197 5.8637L12.6667 5.33337ZM14.6667 3.33337L15.197 3.8637C15.3675 3.69323 15.4456 3.45121 15.407 3.21324C15.3684 2.97527 15.2177 2.77037 15.0021 2.66255L14.6667 3.33337ZM13.3333 2.66671L12.6625 3.00212C12.7351 3.14726 12.8528 3.26496 12.9979 3.33753L13.3333 2.66671ZM7.46969 7.46967C7.1768 7.76256 7.1768 8.23744 7.46969 8.53033C7.76258 8.82323 8.23745 8.82323 8.53035 8.53034L7.46969 7.46967ZM15.4167 8.00004C15.4167 7.58583 15.0809 7.25004 14.6667 7.25004C14.2525 7.25004 13.9167 7.58583 13.9167 8.00004H15.4167ZM8.00004 2.08337C8.41425 2.08337 8.75004 1.74759 8.75004 1.33337C8.75004 0.91916 8.41425 0.583374 8.00004 0.583374V2.08337ZM12.0834 8.00004C12.0834 7.58583 11.7476 7.25004 11.3334 7.25004C10.9192 7.25004 10.5834 7.58583 10.5834 8.00004H12.0834ZM8.00004 5.41671C8.41425 5.41671 8.75004 5.08092 8.75004 4.66671C8.75004 4.25249 8.41425 3.91671 8.00004 3.91671V5.41671ZM12.1363 0.803044L10.1363 2.80304L11.197 3.8637L13.197 1.8637L12.1363 0.803044ZM9.91668 3.33337V5.33337H11.4167V3.33337H9.91668ZM10.6667 6.08337H12.6667V4.58337H10.6667V6.08337ZM13.197 5.8637L15.197 3.8637L14.1363 2.80304L12.1363 4.80304L13.197 5.8637ZM15.0021 2.66255L13.6688 1.99589L12.9979 3.33753L14.3313 4.00419L15.0021 2.66255ZM14.0042 2.3313L13.3375 0.997964L11.9959 1.66878L12.6625 3.00212L14.0042 2.3313ZM10.1364 4.80304L7.46969 7.46967L8.53035 8.53034L11.197 5.86371L10.1364 4.80304ZM13.9167 8.00004C13.9167 11.2677 11.2677 13.9167 8.00004 13.9167V15.4167C12.0962 15.4167 15.4167 12.0962 15.4167 8.00004H13.9167ZM8.00004 13.9167C4.73236 13.9167 2.08337 11.2677 2.08337 8.00004H0.583374C0.583374 12.0962 3.90393 15.4167 8.00004 15.4167V13.9167ZM2.08337 8.00004C2.08337 4.73236 4.73236 2.08337 8.00004 2.08337V0.583374C3.90393 0.583374 0.583374 3.90393 0.583374 8.00004H2.08337ZM10.5834 8.00004C10.5834 9.42678 9.42678 10.5834 8.00004 10.5834V12.0834C10.2552 12.0834 12.0834 10.2552 12.0834 8.00004H10.5834ZM8.00004 10.5834C6.57331 10.5834 5.41671 9.42678 5.41671 8.00004H3.91671C3.91671 10.2552 5.74488 12.0834 8.00004 12.0834V10.5834ZM5.41671 8.00004C5.41671 6.57331 6.57331 5.41671 8.00004 5.41671V3.91671C5.74488 3.91671 3.91671 5.74488 3.91671 8.00004H5.41671Z"
                          fill="currentColor"
                        />
                      </svg>
                      Manage Publications
                    </button>
                  </Menu.Item>
                </div>
                <div>
                  <Menu.Item>
                    <Link href="/write-a-story">
                      <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Help
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/write-a-story">
                      <a className="flex items-center gap-3 text-slate-500 px-6 py-2.5 text-sm tracking-sm">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6M6 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.7157 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Logout
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </Popover>
  );
}
