import { useState, Fragment } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const options = [
  { id: 1, tag: 'Draft' },
  { id: 2, tag: 'Stats' },
  { id: 3, tag: 'Settings' },
];

const newsletters = [
  {
    id: 0,
    href: '#',
    title: 'Tincidunt rhoncus, sit dolor mollis feugiat.',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    date: 'July 29',
  },
  {
    id: 1,
    href: '#',
    title: 'Tincidunt rhoncus, sit dolor mollis feugiat.',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    date: 'July 15',
  },
  {
    id: 2,
    href: '#',
    title: 'Tincidunt rhoncus, sit dolor mollis feugiat.',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    date: 'July 19',
  },
];

export default function PublicationsNewsletter() {
  const [selectedOptionBar, setSelectedOptionBar] = useState(options[0]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Newsletter</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Newsletter"
        />
        
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto md:h-screen px-4 lg:px-8 pb-16">
          <div className="text-center">
            <h1 className="text-slate-700 my-8 md:mt-[60px] md:mb-16 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
              HiThemes Biweekly Newsletter
            </h1>
            <p className="text-slate-500 mb-12 text-xl tracking-md">
              Here is HiThemes informations about development and more
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-[592px] mx-auto">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-[14px] py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 15L16.6666 15.9117C16.2245 16.3951 15.6251 16.6667 15.0001 16.6667C14.3751 16.6667 13.7757 16.3951 13.3337 15.9117C12.891 15.4293 12.2916 15.1584 11.6668 15.1584C11.042 15.1584 10.4426 15.4293 9.99998 15.9117M2.5 16.6667H3.89545C4.3031 16.6667 4.50693 16.6667 4.69874 16.6206C4.8688 16.5798 5.03138 16.5124 5.1805 16.4211C5.34869 16.318 5.49282 16.1739 5.78107 15.8856L16.25 5.41666C16.9404 4.72631 16.9404 3.60702 16.25 2.91666C15.5597 2.22631 14.4404 2.22631 13.75 2.91666L3.28105 13.3856C2.9928 13.6739 2.84867 13.818 2.7456 13.9862C2.65422 14.1353 2.58688 14.2979 2.54605 14.4679C2.5 14.6598 2.5 14.8636 2.5 15.2712V16.6667Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Write a newsletter
              </button>
              <Listbox
                value={selectedOptionBar}
                onChange={setSelectedOptionBar}
              >
                <div className="relative">
                  <Listbox.Button className="w-full min-h-[44px] bg-white text-slate-500 py-2.5 pl-3.5 pr-10 text-base text-left border border-gray-300 rounded-full focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 cursor-default">
                    <span className="block text-center truncate">
                      {selectedOptionBar.tag}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <ChevronDownIcon
                        className="h-5 w-5 text-slate-500"
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
                    <Listbox.Options className="absolute w-full bg-white mt-2 border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50 focus:outline-none">
                      {options.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3.5 pr-4 ${
                              active
                                ? 'bg-slate-50 text-slate-700'
                                : 'text-slate-700'
                            }`
                          }
                          value={option}
                        >
                          {({ selected }) => (
                            <>
                              <span className="block truncate">
                                {option.tag}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 right-3.5 flex items-center text-purple-700">
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
            <hr className="mt-[60px] mb-6" />
            <div className="max-w-screen-lg mx-auto text-left">
              <h2 className="text-slate-500 text-lg tracking-sm">
                Send by HiThemes Biweekly Newsletter
              </h2>
              <ul className="divide-y divide-gray-200">
                {newsletters.map((newsletter) => (
                  <li
                    key={newsletter.id}
                    className="flex sm:items-center justify-between gap-5 py-8"
                  >
                    <Link href={newsletter.href}>
                      <a title={newsletter.title}>
                        <h6 className="text-slate-800 text-lg font-semibold tracking-sm">
                          {newsletter.title}
                        </h6>
                        <p className="text-slate-500 text-sm tracking-sm">
                          {newsletter.description}
                        </p>
                      </a>
                    </Link>
                    <span className="flex-shrink-0 text-slate-500 tracking-sm">
                      {newsletter.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
