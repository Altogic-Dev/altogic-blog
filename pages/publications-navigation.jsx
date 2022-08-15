import React, { Fragment, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { Listbox, Transition, Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabTypes = [
  { name: "Many Stories (Features page)" },
  { name: "Many Stories (Using tags)" },
  { name: "Single Story" },
  { name: "All Archived Stories" },
  { name: "About The Publication" },
];

export default function PublicationsNavigation() {
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState(tabTypes[0]);
  const [selected1, setSelected1] = useState(tabTypes[0]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Navigation</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Navigation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="h-screen max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="flex flex-col gap-4 my-8 md:mt-[60px]">
            <div className="flex items-center justify-between w-full mb-[60px]">
              <h1 className="text-slate-700 mb-4 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes navigation
              </h1>
              <div className="flex items-center w-full sm:w-auto gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-md font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
              </div>
            </div>
            <h2 className="text-slate-500 tracking-sm">
              Add tabs and point them to tags or individual stories to create
              navigation. Navigation will be shown on homepage and stories
              within your publication.
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="block text-slate-700 mb-4 text-lg font-semibold opacity-0">
                  Move
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full transition ease-in-out duration-150 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8954 10 12H12ZM12 12H14C14 10.8954 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8954 17 12H19ZM19 12H21C21 10.8954 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8954 3 12H5ZM5 12H7C7 10.8954 6.10457 10 5 10V12Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="navigation-name-1"
                  className="block text-slate-700 mb-4 text-lg font-semibold"
                >
                  Tab Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="navigation-name-1"
                    id="navigation-name-1"
                    placeholder="Navigation Name One"
                    className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="max-w-[312px] flex-1">
                <span className="block text-slate-700 mb-4 text-lg font-semibold">
                  Tab Type
                </span>
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full h-11 cursor-default rounded-lg bg-white py-2 pl-3.5 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block text-slate-700 text-base truncate">
                        {selected.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                        {tabTypes.map((tabType, tabTypeIdx) => (
                          <Listbox.Option
                            key={tabTypeIdx}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-gray-50"
                                  : "text-gray-900",
                                "cursor-default select-none relative py-2 pl-3.5 pr-9"
                              )
                            }
                            value={tabType}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate text-slate-800"
                                  )}
                                >
                                  {tabType.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-purple-600">
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
                </Listbox>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="contents-1"
                  className="block text-slate-700 mb-4 text-lg font-semibold"
                >
                  Contents
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="contents-1"
                    id="contents-1"
                    placeholder="Euismod"
                    className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="block text-slate-700 mb-4 text-lg font-semibold opacity-0">
                  Move
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-11 h-11 border border-gray-300 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5 text-slate-700"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.66667C7.03976 1.66667 6.66667 2.03976 6.66667 2.5C6.66667 2.96024 7.03976 3.33333 7.5 3.33333V1.66667ZM12.5 3.33333C12.9602 3.33333 13.3333 2.96024 13.3333 2.5C13.3333 2.03976 12.9602 1.66667 12.5 1.66667V3.33333ZM2.5 4.16667C2.03976 4.16667 1.66667 4.53976 1.66667 5C1.66667 5.46024 2.03976 5.83333 2.5 5.83333V4.16667ZM17.5 5.83333C17.9602 5.83333 18.3333 5.46024 18.3333 5C18.3333 4.53976 17.9602 4.16667 17.5 4.16667V5.83333ZM16.6648 5.05543C16.6954 4.59621 16.348 4.19913 15.8888 4.16851C15.4295 4.1379 15.0325 4.48535 15.0018 4.94457L16.6648 5.05543ZM15.2489 13.7661L14.4174 13.7106L14.4174 13.7106L15.2489 13.7661ZM4.75107 13.7661L3.91958 13.8215L4.75107 13.7661ZM4.99815 4.94457C4.96754 4.48535 4.57045 4.1379 4.11123 4.16851C3.65202 4.19913 3.30456 4.59621 3.33518 5.05543L4.99815 4.94457ZM6.24861 17.2497L5.88519 17.9996L5.88519 17.9996L6.24861 17.2497ZM5.16665 16.2375L5.89073 15.825L5.16665 16.2375ZM14.8333 16.2375L15.5574 16.65L15.5574 16.65L14.8333 16.2375ZM13.7514 17.2497L14.1148 17.9996L14.1148 17.9996L13.7514 17.2497ZM9.16667 8.75C9.16667 8.28976 8.79357 7.91667 8.33333 7.91667C7.8731 7.91667 7.5 8.28976 7.5 8.75H9.16667ZM7.5 12.9167C7.5 13.3769 7.8731 13.75 8.33333 13.75C8.79357 13.75 9.16667 13.3769 9.16667 12.9167H7.5ZM12.5 8.75C12.5 8.28976 12.1269 7.91667 11.6667 7.91667C11.2064 7.91667 10.8333 8.28976 10.8333 8.75H12.5ZM10.8333 12.9167C10.8333 13.3769 11.2064 13.75 11.6667 13.75C12.1269 13.75 12.5 13.3769 12.5 12.9167H10.8333ZM7.5 3.33333H12.5V1.66667H7.5V3.33333ZM2.5 5.83333H17.5V4.16667H2.5V5.83333ZM15.0018 4.94457L14.4174 13.7106L16.0804 13.8215L16.6648 5.05543L15.0018 4.94457ZM11.2578 16.6667H8.74221V18.3333H11.2578V16.6667ZM5.58256 13.7106L4.99815 4.94457L3.33518 5.05543L3.91958 13.8215L5.58256 13.7106ZM8.74221 16.6667C8.06988 16.6667 7.61419 16.6661 7.26071 16.638C6.91738 16.6107 6.73904 16.5614 6.61204 16.4998L5.88519 17.9996C6.2746 18.1884 6.684 18.2641 7.12883 18.2994C7.56352 18.3339 8.09642 18.3333 8.74221 18.3333V16.6667ZM3.91958 13.8215C3.96254 14.4659 3.99738 14.9976 4.06073 15.4291C4.12555 15.8706 4.22837 16.274 4.44258 16.65L5.89073 15.825C5.82087 15.7024 5.75975 15.5277 5.70971 15.187C5.6582 14.8361 5.62728 14.3815 5.58256 13.7106L3.91958 13.8215ZM6.61204 16.4998C6.30894 16.3529 6.05745 16.1177 5.89073 15.825L4.44258 16.65C4.77603 17.2353 5.27899 17.7059 5.88519 17.9996L6.61204 16.4998ZM14.4174 13.7106C14.3727 14.3815 14.3418 14.8361 14.2903 15.187C14.2403 15.5277 14.1791 15.7024 14.1093 15.825L15.5574 16.65C15.7716 16.274 15.8745 15.8706 15.9393 15.4291C16.0026 14.9976 16.0375 14.4659 16.0804 13.8215L14.4174 13.7106ZM11.2578 18.3333C11.9036 18.3333 12.4365 18.3339 12.8712 18.2994C13.316 18.2641 13.7254 18.1884 14.1148 17.9996L13.388 16.4998C13.261 16.5614 13.0826 16.6107 12.7393 16.638C12.3858 16.6661 11.9301 16.6667 11.2578 16.6667V18.3333ZM14.1093 15.825C13.9425 16.1177 13.6911 16.3529 13.388 16.4998L14.1148 17.9996C14.721 17.7059 15.224 17.2353 15.5574 16.65L14.1093 15.825ZM7.5 8.75V12.9167H9.16667V8.75H7.5ZM10.8333 8.75V12.9167H12.5V8.75H10.8333Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold opacity-0">
                  Move
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full transition ease-in-out duration-150 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12V14C13.1046 14 14 13.1046 14 12H12ZM12 12H10C10 13.1046 10.8954 14 12 14V12ZM12 12V10C10.8954 10 10 10.8954 10 12H12ZM12 12H14C14 10.8954 13.1046 10 12 10V12ZM19 12V14C20.1046 14 21 13.1046 21 12H19ZM19 12H17C17 13.1046 17.8954 14 19 14V12ZM19 12V10C17.8954 10 17 10.8954 17 12H19ZM19 12H21C21 10.8954 20.1046 10 19 10V12ZM5 12V14C6.10457 14 7 13.1046 7 12H5ZM5 12H3C3 13.1046 3.89543 14 5 14V12ZM5 12V10C3.89543 10 3 10.8954 3 12H5ZM5 12H7C7 10.8954 6.10457 10 5 10V12Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="navigation-name-2"
                  className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold"
                >
                  Tab Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="navigation-name-2"
                    id="navigation-name-2"
                    placeholder="Navigation Name Two"
                    className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="max-w-[312px] flex-1">
                <span className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold">
                  Tab Type
                </span>
                <Listbox value={selected1} onChange={setSelected1}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full h-11 cursor-default rounded-lg bg-white py-2 pl-3.5 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block text-slate-700 text-base truncate">
                        {selected.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                        {tabTypes.map((tabType, tabTypeIdx) => (
                          <Listbox.Option
                            key={tabTypeIdx}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-gray-50"
                                  : "text-gray-900",
                                "cursor-default select-none relative py-2 pl-3.5 pr-9"
                              )
                            }
                            value={tabType}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate text-slate-800"
                                  )}
                                >
                                  {tabType.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-purple-600">
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
                </Listbox>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="contents-2"
                  className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold"
                >
                  Contents
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="contents-2"
                    id="contents-2"
                    placeholder="#Design"
                    className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold opacity-0">
                  Move
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-11 h-11 border border-gray-300 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5 text-slate-700"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.66667C7.03976 1.66667 6.66667 2.03976 6.66667 2.5C6.66667 2.96024 7.03976 3.33333 7.5 3.33333V1.66667ZM12.5 3.33333C12.9602 3.33333 13.3333 2.96024 13.3333 2.5C13.3333 2.03976 12.9602 1.66667 12.5 1.66667V3.33333ZM2.5 4.16667C2.03976 4.16667 1.66667 4.53976 1.66667 5C1.66667 5.46024 2.03976 5.83333 2.5 5.83333V4.16667ZM17.5 5.83333C17.9602 5.83333 18.3333 5.46024 18.3333 5C18.3333 4.53976 17.9602 4.16667 17.5 4.16667V5.83333ZM16.6648 5.05543C16.6954 4.59621 16.348 4.19913 15.8888 4.16851C15.4295 4.1379 15.0325 4.48535 15.0018 4.94457L16.6648 5.05543ZM15.2489 13.7661L14.4174 13.7106L14.4174 13.7106L15.2489 13.7661ZM4.75107 13.7661L3.91958 13.8215L4.75107 13.7661ZM4.99815 4.94457C4.96754 4.48535 4.57045 4.1379 4.11123 4.16851C3.65202 4.19913 3.30456 4.59621 3.33518 5.05543L4.99815 4.94457ZM6.24861 17.2497L5.88519 17.9996L5.88519 17.9996L6.24861 17.2497ZM5.16665 16.2375L5.89073 15.825L5.16665 16.2375ZM14.8333 16.2375L15.5574 16.65L15.5574 16.65L14.8333 16.2375ZM13.7514 17.2497L14.1148 17.9996L14.1148 17.9996L13.7514 17.2497ZM9.16667 8.75C9.16667 8.28976 8.79357 7.91667 8.33333 7.91667C7.8731 7.91667 7.5 8.28976 7.5 8.75H9.16667ZM7.5 12.9167C7.5 13.3769 7.8731 13.75 8.33333 13.75C8.79357 13.75 9.16667 13.3769 9.16667 12.9167H7.5ZM12.5 8.75C12.5 8.28976 12.1269 7.91667 11.6667 7.91667C11.2064 7.91667 10.8333 8.28976 10.8333 8.75H12.5ZM10.8333 12.9167C10.8333 13.3769 11.2064 13.75 11.6667 13.75C12.1269 13.75 12.5 13.3769 12.5 12.9167H10.8333ZM7.5 3.33333H12.5V1.66667H7.5V3.33333ZM2.5 5.83333H17.5V4.16667H2.5V5.83333ZM15.0018 4.94457L14.4174 13.7106L16.0804 13.8215L16.6648 5.05543L15.0018 4.94457ZM11.2578 16.6667H8.74221V18.3333H11.2578V16.6667ZM5.58256 13.7106L4.99815 4.94457L3.33518 5.05543L3.91958 13.8215L5.58256 13.7106ZM8.74221 16.6667C8.06988 16.6667 7.61419 16.6661 7.26071 16.638C6.91738 16.6107 6.73904 16.5614 6.61204 16.4998L5.88519 17.9996C6.2746 18.1884 6.684 18.2641 7.12883 18.2994C7.56352 18.3339 8.09642 18.3333 8.74221 18.3333V16.6667ZM3.91958 13.8215C3.96254 14.4659 3.99738 14.9976 4.06073 15.4291C4.12555 15.8706 4.22837 16.274 4.44258 16.65L5.89073 15.825C5.82087 15.7024 5.75975 15.5277 5.70971 15.187C5.6582 14.8361 5.62728 14.3815 5.58256 13.7106L3.91958 13.8215ZM6.61204 16.4998C6.30894 16.3529 6.05745 16.1177 5.89073 15.825L4.44258 16.65C4.77603 17.2353 5.27899 17.7059 5.88519 17.9996L6.61204 16.4998ZM14.4174 13.7106C14.3727 14.3815 14.3418 14.8361 14.2903 15.187C14.2403 15.5277 14.1791 15.7024 14.1093 15.825L15.5574 16.65C15.7716 16.274 15.8745 15.8706 15.9393 15.4291C16.0026 14.9976 16.0375 14.4659 16.0804 13.8215L14.4174 13.7106ZM11.2578 18.3333C11.9036 18.3333 12.4365 18.3339 12.8712 18.2994C13.316 18.2641 13.7254 18.1884 14.1148 17.9996L13.388 16.4998C13.261 16.5614 13.0826 16.6107 12.7393 16.638C12.3858 16.6661 11.9301 16.6667 11.2578 16.6667V18.3333ZM14.1093 15.825C13.9425 16.1177 13.6911 16.3529 13.388 16.4998L14.1148 17.9996C14.721 17.7059 15.224 17.2353 15.5574 16.65L14.1093 15.825ZM7.5 8.75V12.9167H9.16667V8.75H7.5ZM10.8333 8.75V12.9167H12.5V8.75H10.8333Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99935 4.16667V15.8333M4.16602 10H15.8327"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add another
            </a>
            <div className="mt-12">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-purple-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3">
                      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                        Add a tab linking to a different site (e.g. your
                        non-Blog site, or a store)
                      </span>
                    </Switch.Label>
                  </Switch.Group>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="type-tab-name"
                    id="type-tab-name"
                    placeholder="Type tab name..."
                    className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="type-a-link-to-your-site"
                    id="type-a-link-to-your-site"
                    placeholder="Type a link to your site"
                    className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold opacity-0">
                    Move
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-11 h-11 border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-5 h-5 text-slate-700"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 1.66667C7.03976 1.66667 6.66667 2.03976 6.66667 2.5C6.66667 2.96024 7.03976 3.33333 7.5 3.33333V1.66667ZM12.5 3.33333C12.9602 3.33333 13.3333 2.96024 13.3333 2.5C13.3333 2.03976 12.9602 1.66667 12.5 1.66667V3.33333ZM2.5 4.16667C2.03976 4.16667 1.66667 4.53976 1.66667 5C1.66667 5.46024 2.03976 5.83333 2.5 5.83333V4.16667ZM17.5 5.83333C17.9602 5.83333 18.3333 5.46024 18.3333 5C18.3333 4.53976 17.9602 4.16667 17.5 4.16667V5.83333ZM16.6648 5.05543C16.6954 4.59621 16.348 4.19913 15.8888 4.16851C15.4295 4.1379 15.0325 4.48535 15.0018 4.94457L16.6648 5.05543ZM15.2489 13.7661L14.4174 13.7106L14.4174 13.7106L15.2489 13.7661ZM4.75107 13.7661L3.91958 13.8215L4.75107 13.7661ZM4.99815 4.94457C4.96754 4.48535 4.57045 4.1379 4.11123 4.16851C3.65202 4.19913 3.30456 4.59621 3.33518 5.05543L4.99815 4.94457ZM6.24861 17.2497L5.88519 17.9996L5.88519 17.9996L6.24861 17.2497ZM5.16665 16.2375L5.89073 15.825L5.16665 16.2375ZM14.8333 16.2375L15.5574 16.65L15.5574 16.65L14.8333 16.2375ZM13.7514 17.2497L14.1148 17.9996L14.1148 17.9996L13.7514 17.2497ZM9.16667 8.75C9.16667 8.28976 8.79357 7.91667 8.33333 7.91667C7.8731 7.91667 7.5 8.28976 7.5 8.75H9.16667ZM7.5 12.9167C7.5 13.3769 7.8731 13.75 8.33333 13.75C8.79357 13.75 9.16667 13.3769 9.16667 12.9167H7.5ZM12.5 8.75C12.5 8.28976 12.1269 7.91667 11.6667 7.91667C11.2064 7.91667 10.8333 8.28976 10.8333 8.75H12.5ZM10.8333 12.9167C10.8333 13.3769 11.2064 13.75 11.6667 13.75C12.1269 13.75 12.5 13.3769 12.5 12.9167H10.8333ZM7.5 3.33333H12.5V1.66667H7.5V3.33333ZM2.5 5.83333H17.5V4.16667H2.5V5.83333ZM15.0018 4.94457L14.4174 13.7106L16.0804 13.8215L16.6648 5.05543L15.0018 4.94457ZM11.2578 16.6667H8.74221V18.3333H11.2578V16.6667ZM5.58256 13.7106L4.99815 4.94457L3.33518 5.05543L3.91958 13.8215L5.58256 13.7106ZM8.74221 16.6667C8.06988 16.6667 7.61419 16.6661 7.26071 16.638C6.91738 16.6107 6.73904 16.5614 6.61204 16.4998L5.88519 17.9996C6.2746 18.1884 6.684 18.2641 7.12883 18.2994C7.56352 18.3339 8.09642 18.3333 8.74221 18.3333V16.6667ZM3.91958 13.8215C3.96254 14.4659 3.99738 14.9976 4.06073 15.4291C4.12555 15.8706 4.22837 16.274 4.44258 16.65L5.89073 15.825C5.82087 15.7024 5.75975 15.5277 5.70971 15.187C5.6582 14.8361 5.62728 14.3815 5.58256 13.7106L3.91958 13.8215ZM6.61204 16.4998C6.30894 16.3529 6.05745 16.1177 5.89073 15.825L4.44258 16.65C4.77603 17.2353 5.27899 17.7059 5.88519 17.9996L6.61204 16.4998ZM14.4174 13.7106C14.3727 14.3815 14.3418 14.8361 14.2903 15.187C14.2403 15.5277 14.1791 15.7024 14.1093 15.825L15.5574 16.65C15.7716 16.274 15.8745 15.8706 15.9393 15.4291C16.0026 14.9976 16.0375 14.4659 16.0804 13.8215L14.4174 13.7106ZM11.2578 18.3333C11.9036 18.3333 12.4365 18.3339 12.8712 18.2994C13.316 18.2641 13.7254 18.1884 14.1148 17.9996L13.388 16.4998C13.261 16.5614 13.0826 16.6107 12.7393 16.638C12.3858 16.6661 11.9301 16.6667 11.2578 16.6667V18.3333ZM14.1093 15.825C13.9425 16.1177 13.6911 16.3529 13.388 16.4998L14.1148 17.9996C14.721 17.7059 15.224 17.2353 15.5574 16.65L14.1093 15.825ZM7.5 8.75V12.9167H9.16667V8.75H7.5ZM10.8333 8.75V12.9167H12.5V8.75H10.8333Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
