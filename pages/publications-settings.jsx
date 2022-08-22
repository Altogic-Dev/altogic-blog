import { useState } from 'react';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import { PlusIcon, XIcon } from '@heroicons/react/solid';
import Layout from '@/layout/Layout';
import Sections from '../components/Sections';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
              <div className="max-w-screen-xl mx-auto px-4 lg:px-8 mt-8 lg:mt-20">
                <form action="" className="mb-24">
                  <div className="pb-2 mb-8 border-b border-gray-200">
                    <h2 className="text-slate-700 text-2xl font-medium tracking-md">
                      General
                    </h2>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="publication-name"
                        className="block text-slate-700 mb-3 text-lg"
                      >
                        Name*
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="publication-name"
                          id="publication-name"
                          placeholder="Type your publication name"
                          className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                        <p className="mt-1.5 text-sm text-slate-500">
                          Link: medium.com/altogic
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-slate-700 mb-3 text-lg"
                      >
                        Description*
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Type your description"
                          className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                        <p className="mt-1.5 text-sm text-slate-500">
                          The description is longer, and appears in story
                          footers, search results and the like. Max 280
                          characters.
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="tagline"
                        className="block text-slate-700 mb-3 text-lg"
                      >
                        Tagline*
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="tagline"
                          id="tagline"
                          placeholder="Type a short tagline"
                          className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                        <p className="mt-1.5 text-sm text-slate-500">
                          The tagline is short and appears on your publication’s
                          homepage. It’s a quick way to tell readers about your
                          publication. Max 100 characters.
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 items-center gap-8">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-slate-700 mb-3 text-lg"
                        >
                          Publication avatar*
                        </label>
                        <p className="text-slate-500 text-sm">
                          The avatar appears with your stories across Medium.
                          Recommended size: Square, at least 1000 pixels per
                          side File type: JPG, PNG or GIF
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                        <img
                          className="w-16 h-16 rounded-full"
                          src="./hi-avatar.svg"
                          alt=""
                        />
                        <div className="space-x-4">
                          <button
                            type="button"
                            className="text-slate-600 text-sm font-medium tracking-sm"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-purple-700 text-sm font-medium tracking-sm"
                          >
                            Change Avatar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-8 lg:my-14 border-gray-200" />
                  <div className="grid lg:grid-cols-2 gap-8 mb-14">
                    <div className="grid md:grid-cols-2 items-center gap-8">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-slate-700 mb-3 text-lg"
                        >
                          Publication logo
                        </label>
                        <p className="text-slate-500 text-sm">
                          The logo is displayed at the top of your publication.
                          We recommend the logo have your publication’s name and
                          a transparent background. <br /> Recommended size:
                          Each side of the logo should be at least 400 pixels
                          wide File type: JPG, PNG or GIF
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                        <img
                          className="w-16 h-16 rounded-full"
                          src="./hi-avatar.svg"
                          alt=""
                        />
                        <div className="space-x-4">
                          <button
                            type="button"
                            className="text-slate-600 text-sm font-medium tracking-sm"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-purple-700 text-sm font-medium tracking-sm"
                          >
                            Change Avatar
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 items-center gap-8">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-slate-700 mb-3 text-lg"
                        >
                          Publication cover image
                        </label>
                        <p className="text-slate-500 text-sm">
                          The cover image is used to promote your publication on
                          Blog.
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                        <img
                          className="w-16 h-16 rounded-full"
                          src="./hi-avatar.svg"
                          alt=""
                        />
                        <div className="space-x-4">
                          <button
                            type="button"
                            className="text-slate-600 text-sm font-medium tracking-sm"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-purple-700 text-sm font-medium tracking-sm"
                          >
                            Change Avatar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-2 mb-8 border-b border-gray-200">
                    <h2 className="text-slate-700 text-2xl font-medium tracking-md">
                      Social and tags
                    </h2>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8 mb-14">
                    <div className="grid md:grid-cols-[180px,1fr] gap-8">
                      <div>
                        <h6 className="text-slate-700 mb-3 text-lg tracking-sm">
                          Contact info
                        </h6>
                        <p className="text-slate-500 text-sm tracking-sm">
                          These links will be public.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M1.66797 5.83334L8.47207 10.5962C9.02304 10.9819 9.29853 11.1747 9.59819 11.2494C9.86288 11.3154 10.1397 11.3154 10.4044 11.2494C10.7041 11.1747 10.9796 10.9819 11.5305 10.5962L18.3346 5.83334M5.66797 16.6667H14.3346C15.7348 16.6667 16.4348 16.6667 16.9696 16.3942C17.44 16.1545 17.8225 15.7721 18.0622 15.3017C18.3346 14.7669 18.3346 14.0668 18.3346 12.6667V7.33334C18.3346 5.93321 18.3346 5.23315 18.0622 4.69837C17.8225 4.22796 17.44 3.84551 16.9696 3.60583C16.4348 3.33334 15.7348 3.33334 14.3346 3.33334H5.66797C4.26784 3.33334 3.56777 3.33334 3.03299 3.60583C2.56259 3.84551 2.18014 4.22796 1.94045 4.69837C1.66797 5.23315 1.66797 5.93321 1.66797 7.33334V12.6667C1.66797 14.0668 1.66797 14.7669 1.94045 15.3017C2.18014 15.7721 2.56259 16.1545 3.03299 16.3942C3.56777 16.6667 4.26784 16.6667 5.66797 16.6667Z"
                                stroke="currentColor"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="info@hithemes.io"
                            className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.3774 6.23312C17.384 6.39803 17.3861 6.56289 17.3861 6.7278C17.3861 11.7278 13.7751 17.5 7.17174 17.5C5.1433 17.5 3.25715 16.8703 1.66797 15.7983C1.94889 15.8283 2.23418 15.8509 2.52385 15.8509C4.2057 15.8509 5.75476 15.2435 6.98349 14.2241C5.41255 14.2016 4.08605 13.0996 3.62855 11.6004C3.84818 11.6453 4.07436 11.6679 4.30566 11.6679C4.63181 11.6679 4.94848 11.623 5.25201 11.533C3.60811 11.1882 2.3699 9.65899 2.3699 7.82241C2.3699 7.79992 2.3699 7.79238 2.3699 7.77739C2.85439 8.05475 3.40892 8.22708 3.99775 8.24956C3.03314 7.56741 2.39907 6.40552 2.39907 5.09367C2.39907 4.40402 2.57564 3.75181 2.88648 3.1896C4.65661 5.48345 7.30309 6.99022 10.2866 7.14764C10.2253 6.87028 10.194 6.578 10.194 6.28564C10.194 4.19419 11.8014 2.5 13.7846 2.5C14.817 2.5 15.7495 2.95734 16.404 3.69197C17.2234 3.52705 17.991 3.21223 18.6857 2.77745C18.4164 3.66201 17.848 4.40398 17.1052 4.86875C17.832 4.77879 18.5251 4.57655 19.168 4.2767C18.6857 5.03382 18.0786 5.70088 17.3774 6.23312Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="twitter"
                            id="twitter"
                            placeholder="@hithemes.io"
                            className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.742188 10.0098C0.742188 14.5882 4.086 18.395 8.45867 19.1667L8.51027 19.1254C8.49308 19.1221 8.47588 19.1187 8.45869 19.1152V12.582H6.14375V10.0098H8.45869V7.95206C8.45869 5.63712 9.95054 4.35104 12.0597 4.35104C12.7285 4.35104 13.4487 4.45393 14.1174 4.55681V6.9232H12.9342C11.8025 6.9232 11.5453 7.48907 11.5453 8.20928V10.0098H14.0146L13.603 12.582H11.5453V19.1152C11.5281 19.1187 11.5109 19.1221 11.4937 19.1254L11.5453 19.1667C15.9179 18.395 19.2617 14.5882 19.2617 10.0098C19.2617 4.9169 15.0948 0.75 10.002 0.75C4.90909 0.75 0.742188 4.9169 0.742188 10.0098Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="facebook"
                            id="facebook"
                            placeholder="@hithemes.io"
                            className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-slate-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.85097 1.66669C2.19762 1.66669 1.66797 2.19634 1.66797 2.84969V17.1503C1.66797 17.8037 2.19762 18.3334 2.85097 18.3334H17.1516C17.805 18.3334 18.3346 17.8037 18.3346 17.1503V2.84969C18.3346 2.19634 17.805 1.66669 17.1516 1.66669H2.85097ZM5.40887 6.84254C6.20738 6.84254 6.8547 6.19522 6.8547 5.39671C6.8547 4.5982 6.20738 3.95087 5.40887 3.95087C4.61036 3.95087 3.96304 4.5982 3.96304 5.39671C3.96304 6.19522 4.61036 6.84254 5.40887 6.84254ZM8.17883 7.91105H10.575V9.00877C10.575 9.00877 11.2253 7.70828 12.9945 7.70828C14.5727 7.70828 15.8801 8.48575 15.8801 10.8555V15.8528H13.397V11.4611C13.397 10.0631 12.6506 9.90937 12.0819 9.90937C10.9016 9.90937 10.6996 10.9274 10.6996 11.6434V15.8528H8.17883V7.91105ZM6.66924 7.91106H4.1485V15.8528H6.66924V7.91106Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="linkedin"
                            id="linkedin"
                            placeholder="@hithemes.io"
                            className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-[180px,1fr] gap-8">
                      <div>
                        <h6 className="text-slate-700 mb-3 text-lg tracking-sm">
                          Tags
                        </h6>
                        <p className="text-slate-500 text-sm tracking-sm">
                          Adding tags (up to 5) allows people to search for and
                          discover your publication.
                        </p>
                      </div>
                      <div>
                        <div className="relative mb-4 md:mb-6">
                          <div className="flex flex-wrap items-center gap-2 px-2 py-1 lg:mb-8 border border-gray-300 rounded-md">
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
                          </div>
                        </div>
                        <div>
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
                      </div>
                    </div>
                  </div>
                  <div className="pb-2 mb-8 border-b border-gray-200">
                    <h2 className="text-slate-700 text-2xl font-medium tracking-md">
                      People
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-[180px,1fr] gap-3 lg:gap-8 mb-8 md:mb-14">
                    <div>
                      <h6 className="text-slate-700 mb-3 text-lg tracking-sm">
                        Editors
                      </h6>
                      <p className="text-slate-500 text-sm tracking-sm">
                        Editors can add or remove stories. They can also review,
                        edit and publish submissions.
                      </p>
                    </div>
                    <div className="relative md:mb-6">
                      <div className="flex flex-wrap items-center gap-2 px-2 py-1 lg:mb-8 border border-gray-300 rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <XIcon
                            className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                          />
                          hithemes
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <XIcon
                            className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                          />
                          ismail
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <XIcon
                            className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                          />
                          halit
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-[180px,1fr] gap-3 lg:gap-8">
                    <h6 className="text-slate-700 text-lg tracking-sm">
                      Writers
                    </h6>
                    <div>
                      <div className="relative md:mb-6">
                        <div className="flex flex-wrap items-center gap-2 px-2 py-1 lg:mb-8 border border-gray-300 rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <XIcon
                              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                              aria-hidden="true"
                            />
                            ali13456
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <XIcon
                              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                              aria-hidden="true"
                            />
                            ahmet123456
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <XIcon
                              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                              aria-hidden="true"
                            />
                            veli12345
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-8 lg:my-14 border-gray-200" />
                  <div className="flex items-center justify-end gap-4">
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
                </form>
              </div>
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
