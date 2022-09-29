import Head from 'next/head';
import { Tab } from '@headlessui/react';
import Layout from '@/layouts/Layout';
import Sections from '@/components/Sections';
import { classNames } from '@/utils/utils';
import PublicationSettingsInfo from './PublicationsSettingsInfo';

export default function PublicationsSettings() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Settings</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Settings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 my-8 lg:my-[60px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
              <h1 className="text-slate-700 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes settings
              </h1>
              <div className="hidden lg:flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <Tab.Group>
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
            <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                    selected
                      ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                      : 'text-slate-500'
                  )
                }
              >
                Info
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                    selected
                      ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                      : 'text-slate-500'
                  )
                }
              >
                Homepage
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <PublicationSettingsInfo />
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-12">
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
                  <div className="flex items-center justify-center pb-6 mb-6 border-b border-gray-200 divide-x divide-gray-200">
                    <div className="flex items-center gap-5 px-5">
                      <span className="inline-flex items-center text-slate-400 py-1 text-sm tracking-sm">
                        Layout
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 14H3M20 10H3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Title
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Logo
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 9.25H15M21 4H3M21 14.75H15M21 20H3M4.6 16H9.4C9.96005 16 10.2401 16 10.454 15.891C10.6422 15.7951 10.7951 15.6422 10.891 15.454C11 15.2401 11 14.9601 11 14.4V9.6C11 9.03995 11 8.75992 10.891 8.54601C10.7951 8.35785 10.6422 8.20487 10.454 8.10899C10.2401 8 9.96005 8 9.4 8H4.6C4.03995 8 3.75992 8 3.54601 8.10899C3.35785 8.20487 3.20487 8.35785 3.10899 8.54601C3 8.75992 3 9.03995 3 9.6V14.4C3 14.9601 3 15.2401 3.10899 15.454C3.20487 15.6422 3.35785 15.7951 3.54601 15.891C3.75992 16 4.03995 16 4.6 16Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Both
                      </button>
                    </div>
                    <div className="flex items-center gap-5 px-5">
                      <span className="inline-flex items-center text-slate-400 py-1 text-sm tracking-sm">
                        Alignment
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 10H3M20 6H3M20 14H3M16 18H3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 10H6M21 6H3M21 14H3M18 18H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-5 px-5">
                      <span className="inline-flex items-center text-slate-400 py-1 text-sm tracking-sm">
                        Color
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 4C7 3.44772 6.55228 3 6 3C5.44772 3 5 3.44772 5 4H7ZM5 20C5 20.5523 5.44772 21 6 21C6.55228 21 7 20.5523 7 20H5ZM9.5 11C8.94772 11 8.5 11.4477 8.5 12C8.5 12.5523 8.94772 13 9.5 13V11ZM4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5V3ZM4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21V19ZM5 4V20H7V4H5ZM9.5 5H15.5V3H9.5V5ZM15.5 11H9.5V13H15.5V11ZM18.5 8C18.5 9.65685 17.1569 11 15.5 11V13C18.2614 13 20.5 10.7614 20.5 8H18.5ZM15.5 5C17.1569 5 18.5 6.34315 18.5 8H20.5C20.5 5.23858 18.2614 3 15.5 3V5ZM9.5 13H16.5V11H9.5V13ZM16.5 19H9.5V21H16.5V19ZM19.5 16C19.5 17.6569 18.1569 19 16.5 19V21C19.2614 21 21.5 18.7614 21.5 16H19.5ZM16.5 13C18.1569 13 19.5 14.3431 19.5 16H21.5C21.5 13.2386 19.2614 11 16.5 11V13ZM8.5 4V20H10.5V4H8.5ZM9.5 3H4V5H9.5V3ZM9.5 19H4V21H9.5V19Z"
                            fill="currentColor"
                          />
                        </svg>
                        Text
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 12C2 17.5228 6.47715 22 12 22C13.6569 22 15 20.6569 15 19V18.5C15 18.0356 15 17.8034 15.0257 17.6084C15.2029 16.2622 16.2622 15.2029 17.6084 15.0257C17.8034 15 18.0356 15 18.5 15H19C20.6569 15 22 13.6569 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7C15.4477 7 15 7.44772 15 8C15 8.55228 15.4477 9 16 9Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Background
                      </button>
                    </div>
                    <div className="flex items-center gap-5 px-5">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                      >
                        Add background image
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="relative w-full h-[430px] bg-no-repeat bg-cover bg-center"
                    // style={{
                    //   backgroundImage:
                    //     "url('https://images.unsplash.com/photo-1660239006153-788e6d91a271?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3174&q=80')",
                    // }}
                  >
                    <div className="max-w-screen-xl mx-auto text-white px-4 lg:px-8">
                      Merhaba
                    </div>
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 max-w-screen-xl w-full mx-auto px-4 lg:px-8 mb-16">
                      <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-200">
                        <ul className="flex items-center gap-4">
                          <li className="flex items-center justify-center">
                            <a
                              href="#"
                              className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                            >
                              Navigation One
                            </a>
                          </li>
                          <li className="flex items-center justify-center">
                            <a
                              href="#"
                              className="inline-block text-slate-500 p-3 text-base tracking-sm rounded-md uppercase hover:bg-gray-100"
                            >
                              Navigation Two
                            </a>
                          </li>
                        </ul>
                        <ul className="flex items-center">
                          <li>
                            <a
                              href="#"
                              className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                            >
                              <svg
                                className="w-6 h-6 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M20.8513 7.47974C20.8592 7.67764 20.8618 7.87546 20.8618 8.07336C20.8618 14.0734 16.5286 21 8.60453 21C6.1704 21 3.90702 20.2444 2 18.958C2.3371 18.994 2.67946 19.021 3.02706 19.021C5.04528 19.021 6.90415 18.2922 8.37863 17.0689C6.4935 17.0419 4.90169 15.7195 4.3527 13.9204C4.61625 13.9744 4.88767 14.0015 5.16523 14.0015C5.55661 14.0015 5.93661 13.9476 6.30085 13.8396C4.32817 13.4258 2.84232 11.5908 2.84232 9.38689C2.84232 9.3599 2.84232 9.35086 2.84232 9.33287C3.4237 9.6657 4.08914 9.87249 4.79573 9.89948C3.63821 9.08089 2.87732 7.68662 2.87732 6.11241C2.87732 5.28482 3.08921 4.50218 3.46221 3.82752C5.58637 6.58014 8.76214 8.38826 12.3424 8.57716C12.2689 8.24433 12.2312 7.89359 12.2312 7.54277C12.2312 5.03303 14.1601 3 16.5399 3C17.7789 3 18.8979 3.5488 19.6833 4.43036C20.6665 4.23246 21.5877 3.85468 22.4212 3.33294C22.0981 4.39441 21.416 5.28478 20.5247 5.8425C21.3968 5.73455 22.2286 5.49186 23 5.13204C22.4212 6.04058 21.6927 6.84106 20.8513 7.47974Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                            >
                              <svg
                                className="w-6 h-6 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.888672 12.0118C0.888672 17.5059 4.90124 22.074 10.1484 23L10.2104 22.9505C10.1897 22.9465 10.1691 22.9424 10.1485 22.9383V15.0984H7.37054V12.0118H10.1485V9.5425C10.1485 6.76457 11.9387 5.22127 14.4697 5.22127C15.2722 5.22127 16.1365 5.34474 16.939 5.4682V8.30786H15.5191C14.161 8.30786 13.8524 8.98691 13.8524 9.85116V12.0118H16.8155L16.3217 15.0984H13.8524V22.9383C13.8317 22.9424 13.8111 22.9465 13.7904 22.9505L13.8524 23C19.0996 22.074 23.1121 17.5059 23.1121 12.0118C23.1121 5.9003 18.1119 0.900024 12.0004 0.900024C5.88895 0.900024 0.888672 5.9003 0.888672 12.0118Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
                            >
                              <svg
                                className="w-6 h-6 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.41961 2C2.63558 2 2 2.63558 2 3.41961V20.5804C2 21.3644 2.63558 22 3.41961 22H20.5804C21.3644 22 22 21.3644 22 20.5804V3.41961C22 2.63558 21.3644 2 20.5804 2H3.41961ZM6.48908 8.21103C7.44729 8.21103 8.22408 7.43424 8.22408 6.47603C8.22408 5.51781 7.44729 4.74102 6.48908 4.74102C5.53087 4.74102 4.75409 5.51781 4.75409 6.47603C4.75409 7.43424 5.53087 8.21103 6.48908 8.21103ZM9.81304 9.49324H12.6885V10.8105C12.6885 10.8105 13.4688 9.24991 15.5918 9.24991C17.4857 9.24991 19.0546 10.1829 19.0546 13.0266V19.0233H16.0748V13.7533C16.0748 12.0757 15.1792 11.8912 14.4967 11.8912C13.0804 11.8912 12.8379 13.1129 12.8379 13.9721V19.0233H9.81304V9.49324ZM8.00152 9.49325H4.97664V19.0233H8.00152V9.49325Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 mb-20">
                <div className="relative max-w-screen-xl mx-auto mb-6">
                  <div
                    className="absolute inset-0 flex items-center px-4 lg:px-8"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <svg
                        className="w-5 h-5 text-slate-500"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8346 4.16667C10.8346 3.70643 10.4615 3.33333 10.0013 3.33333C9.54106 3.33333 9.16797 3.70643 9.16797 4.16667H10.8346ZM9.16797 15.8333C9.16797 16.2936 9.54106 16.6667 10.0013 16.6667C10.4615 16.6667 10.8346 16.2936 10.8346 15.8333H9.16797ZM4.16797 9.16667C3.70773 9.16667 3.33464 9.53976 3.33464 10C3.33464 10.4602 3.70773 10.8333 4.16797 10.8333V9.16667ZM15.8346 10.8333C16.2949 10.8333 16.668 10.4602 16.668 10C16.668 9.53976 16.2949 9.16667 15.8346 9.16667V10.8333ZM9.16797 4.16667V15.8333H10.8346V4.16667H9.16797ZM4.16797 10.8333H15.8346V9.16667H4.16797V10.8333Z"
                          fill="#64748B"
                        />
                      </svg>
                      Add Section
                    </button>
                  </div>
                </div>
                <div>
                  <Sections />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Layout>
    </div>
  );
}
