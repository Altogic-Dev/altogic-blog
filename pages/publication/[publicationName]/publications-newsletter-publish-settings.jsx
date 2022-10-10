import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  XIcon,
  PlusIcon,
} from '@heroicons/react/solid';
import { classNames } from '@/utils/utils';

const peoples = [
  {
    id: 1,
    name: 'Wade Cooper',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Devon Webb',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Tom Cook',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Tanya Fox',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Mason Heaney',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    userName: '@olivirhye',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function PublicationsNewsletterPublishSettings() {
  const [selected, setSelected] = useState(peoples[3]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publish Settings</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publish Settings"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-8 pb-[72px] lg:pb-36">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-slate-800 mb-12 text-lg tracking-sm">
              Publish Settings
            </h1>
            <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
              <div>
                <span className="inline-block text-slate-600 mb-2 text-sm tracking-sm">
                  Email Preview
                </span>
                <div className="prose prose-img:rounded-none prose-figcaption:mt-0 prose-blockquote:text-2xl prose-blockquote:md:text-3xl prose-blockquote:pl-5 prose-blockquote:md:pl-6 prose-blockquote:not-italic prose-blockquote:border-purple-700 prose-blockquote:border-l-2 prose-h1:text-base prose-h1:md:text-lg prose-h1:text-slate-800 prose-h1:font-bold prose-h1:tracking-md prose-h2:text-xl prose-h2:font-semibold prose-p:text-base prose-p:text-slate-500 prose-p:tracking-sm max-w-full mb-10 sm:mb-24">
                  <h1>Lorem ipsum solor sit amet</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ullamcorper mattis lorem non. Ultrices praesent amet
                    ipsum justo massa. Eu dolor aliquet risus gravida nunc at
                    feugiat consequat purus. Non massa enim vitae duis mattis.
                    Vel in ultricies vel fringilla.
                  </p>
                  <p>
                    Mi tincidunt elit, id quisque ligula ac diam, amet. Vel
                    etiam suspendisse morbi eleifend faucibus eget vestibulum
                    felis. Dictum quis montes, sit sit. Tellus aliquam enim
                    urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi,
                    tellus tincidunt. At feugiat sapien varius id.
                  </p>
                  <p>
                    Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                    volutpat mollis at volutpat lectus velit, sed auctor.
                    Porttitor fames arcu quis fusce augue enim. Quis at habitant
                    diam at. Suscipit tristique risus, at donec. In turpis vel
                    et quam imperdiet. Ipsum molestie aliquet sodales id est ac
                    volutpat.{' '}
                  </p>
                  <figure>
                    <img
                      className="w-full rounded-lg"
                      src="https://images.unsplash.com/photo-1658195771962-93726079f35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                      alt=""
                    />
                  </figure>
                  <p>
                    Dolor enim eu tortor urna sed duis nulla. Aliquam
                    vestibulum, nulla odio nisl vitae. In aliquet pellentesque
                    aenean hac vestibulum turpis mi bibendum diam. Tempor
                    integer aliquam in vitae malesuada fringilla.
                  </p>
                  <p>
                    Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                    imperdiet commodo consectetur convallis risus. Sed
                    condimentum enim dignissim adipiscing faucibus consequat,
                    urna. Viverra purus et erat auctor aliquam. Risus, volutpat
                    vulputate posuere purus sit congue convallis aliquet. Arcu
                    id augue ut feugiat donec porttitor neque. Mauris, neque
                    ultricies eu vestibulum, bibendum quam lorem id. Dolor
                    lacus, eget nunc lectus in tellus, pharetra, porttitor.
                  </p>
                  <p>
                    Ipsum sit mattis nulla quam nulla. Gravida id gravida ac
                    enim mauris id. Non pellentesque congue eget consectetur
                    turpis. Sapien, dictum molestie sem tempor. Diam elit, orci,
                    tincidunt aenean tempus. Quis velit eget ut tortor tellus.
                    Sed vel, congue felis elit erat nam nibh orci.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex md:inline-flex items-center justify-center gap-2 w-full md:w-auto px-3.5 py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 15L16.6666 15.9117C16.2245 16.3951 15.6251 16.6667 15.0001 16.6667C14.3751 16.6667 13.7757 16.3951 13.3337 15.9117C12.891 15.4293 12.2916 15.1584 11.6668 15.1584C11.042 15.1584 10.4426 15.4293 9.99998 15.9117M2.5 16.6667H3.89545C4.3031 16.6667 4.50693 16.6667 4.69874 16.6206C4.8688 16.5798 5.03138 16.5125 5.1805 16.4211C5.34869 16.318 5.49282 16.1739 5.78107 15.8856L16.25 5.41669C16.9404 4.72634 16.9404 3.60705 16.25 2.91669C15.5597 2.22634 14.4404 2.22634 13.75 2.91669L3.28105 13.3856C2.9928 13.6739 2.84867 13.818 2.7456 13.9862C2.65422 14.1353 2.58688 14.2979 2.54605 14.468C2.5 14.6598 2.5 14.8636 2.5 15.2713V16.6667Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Edit Email
                </button>
                <hr className="block md:hidden my-16" />
                <button
                  type="button"
                  className="flex md:hidden items-center justify-center gap-2 w-full px-3.5 py-2.5 mb-16 text-base font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Send Now
                </button>
              </div>
              <div>
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-slate-600 mb-4 text-sm tracking-sm">
                        Publishing to:
                      </Listbox.Label>
                      <div className="relative mb-8">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3.5 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                          <span className="flex items-center">
                            <img
                              src={selected.avatar}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span className="ml-2 block truncate">
                              {selected.name}{' '}
                              <span className="text-slate-500">
                                {selected.userName}
                              </span>
                            </span>
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-500"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {peoples.map((people) => (
                              <Listbox.Option
                                key={people.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'text-white bg-gray-50'
                                      : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-3.5 pr-9'
                                  )
                                }
                                value={people}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={people.avatar}
                                        alt=""
                                        className="flex-shrink-0 h-6 w-6 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? 'font-semibold'
                                            : 'font-normal',
                                          'ml-2 block truncate text-slate-800'
                                        )}
                                      >
                                        {people.name}{' '}
                                        <span className="text-slate-500">
                                          {people.userName}
                                        </span>
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span className="absolute inset-y-0 right-0 flex items-center text-purple-600 pr-4">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
                <div className="relative mb-4 md:mb-6">
                  <span className="inline-flex text-slate-600 mb-4 text-sm tracking-sm">
                    Add Tags:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 px-2 py-1 mb-8 border border-gray-300 rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <XIcon
                        className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                      Forum
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <XIcon
                        className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                      Altogic
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <XIcon
                        className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                      Altogic
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <XIcon
                        className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                      Altogic
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <XIcon
                        className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                      Altogic
                    </button>
                  </div>
                </div>
                <div className="md:mb-20">
                  <p className="text-slate-600 mb-4 text-sm tracking-sm">
                    Recomended Tags
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PlusIcon
                        className="mr-2 h-5 w-5 text-gray-700"
                        aria-hidden="true"
                      />
                      Design
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PlusIcon
                        className="mr-2 h-5 w-5 text-gray-700"
                        aria-hidden="true"
                      />
                      Figma
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PlusIcon
                        className="mr-2 h-5 w-5 text-gray-700"
                        aria-hidden="true"
                      />
                      TailwindCss
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PlusIcon
                        className="mr-2 h-5 w-5 text-gray-700"
                        aria-hidden="true"
                      />
                      Css
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PlusIcon
                        className="mr-2 h-5 w-5 text-gray-700"
                        aria-hidden="true"
                      />
                      Html
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="hidden md:flex items-center justify-center gap-2 w-full px-3.5 py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
