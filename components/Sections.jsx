import { useState, Fragment } from 'react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Listbox, Transition, Tab, Switch } from '@headlessui/react';
import Sidebar from '@/layouts/Sidebar';
import { classNames } from '@/utils/utils';
import PublicationsNormalCard from './PublicationsNormalCard';
import PublicationsFullImageVerticalCard from './PublicationsFullImageVerticalCard';
import PublicationsStreamCard from './PublicationsStreamCard';
import PublicationsListImageCard from './PublicationsListImageCard';

const sections = [
  { id: 1, tag: 'Stories in a tag' },
  { id: 2, tag: 'Featured stories' },
];

export default function Sections() {
  const [selectedSectionBar, setSelectedSectionBar] = useState(sections[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [normalCard, setNormalCard] = useState(true);
  const [imageCard, setImageCard] = useState(false);
  const [counter, setCounter] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [containerScreen, setContainerScreen] = useState(false);
  const tag = useState(false);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <div className="flex flex-col xl:flex-row items-center justify-between gap-8 max-w-screen-xl mx-auto px-4 lg:px-8 mb-12">
        <div className="flex items-center gap-4">
          <span>Section: </span>
          <Listbox value={selectedSectionBar} onChange={setSelectedSectionBar}>
            <div className="relative">
              <Listbox.Button
                className={`relative ${
                  tag ? 'max-w-[180px]' : 'max-w-[240px] min-w-[240px]'
                } w-full bg-white text-slate-500 py-2.5 pl-3.5 pr-10 text-base text-left border border-gray-300 rounded-lg focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 cursor-default`}
              >
                <span className="block truncate">{selectedSectionBar.tag}</span>
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
                <Listbox.Options className="absolute mt-1 min-w-[240px] max-w-[240px] w-full bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50 focus:outline-none">
                  {sections.map((section) => (
                    <Listbox.Option
                      key={section.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3.5 pr-4 ${
                          active
                            ? 'bg-slate-50 text-slate-700'
                            : 'text-slate-700'
                        }`
                      }
                      value={section}
                    >
                      {({ selected }) => (
                        <>
                          <span className="block truncate">{section.tag}</span>
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
        {tag ? (
          <div className="ml-4">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="#Tag"
              className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        ) : null}
        <div className="flex items-center flex-wrap justify-center gap-y-6">
          <div className="relative inline-flex max-h-[32px] pr-5 sm:border-r border-slate-300">
            <button
              type="button"
              onClick={() => {
                setCounter(counter === 0 ? 0 : counter - 1);
              }}
              className="relative inline-flex items-center p-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5 text-slate-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16797 9.16667C3.70773 9.16667 3.33464 9.53976 3.33464 10C3.33464 10.4602 3.70773 10.8333 4.16797 10.8333V9.16667ZM15.8346 10.8333C16.2949 10.8333 16.668 10.4602 16.668 10C16.668 9.53976 16.2949 9.16667 15.8346 9.16667V10.8333ZM4.16797 10.8333H15.8346V9.16667H4.16797V10.8333Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <input
              type="text"
              name="number"
              id="number"
              className="
            block
            w-12
            min-w-0
            p-1.5
            text-slate-500
            text-sm font-medium
            border border-gray-300
            focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500
            text-center
          "
              value={counter}
            />
            <button
              type="button"
              onClick={() => setCounter(counter + 1)}
              className="relative inline-flex items-center p-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5 text-slate-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8346 4.16666C10.8346 3.70643 10.4615 3.33333 10.0013 3.33333C9.54106 3.33333 9.16797 3.70643 9.16797 4.16666H10.8346ZM9.16797 15.8333C9.16797 16.2936 9.54106 16.6667 10.0013 16.6667C10.4615 16.6667 10.8346 16.2936 10.8346 15.8333H9.16797ZM4.16797 9.16666C3.70773 9.16666 3.33464 9.53976 3.33464 10C3.33464 10.4602 3.70773 10.8333 4.16797 10.8333V9.16666ZM15.8346 10.8333C16.2949 10.8333 16.668 10.4602 16.668 10C16.668 9.53976 16.2949 9.16666 15.8346 9.16666V10.8333ZM9.16797 4.16666V15.8333H10.8346V4.16666H9.16797ZM4.16797 10.8333H15.8346V9.16666H4.16797V10.8333Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="px-5 sm:border-r border-slate-300">
            <Tab.List className="flex items-center gap-5">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex items-center gap-2 h-full text-sm tracking-sm hover:text-purple-700 focus:outline-none',
                    selected ? 'text-purple-700 relative' : 'text-slate-400'
                  )
                }
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9H21M3 15H21M12 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Grid
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex items-center gap-2 h-full text-sm tracking-sm hover:text-purple-700 focus:outline-none',
                    selected ? 'text-purple-700 relative' : 'text-slate-400'
                  )
                }
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9H21M3 15H21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Stream
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'inline-flex items-center gap-2 h-full text-sm tracking-sm hover:text-purple-700 focus:outline-none',
                    selected ? 'text-purple-700 relative' : 'text-slate-400'
                  )
                }
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                List
              </Tab>
            </Tab.List>
          </div>
          <div className="flex items-center gap-5 px-5 border-r border-slate-300">
            <button
              type="button"
              onClick={() => {
                setNormalCard(!normalCard);
                setImageCard(false);
              }}
              className={classNames(
                normalCard ? 'text-purple-700' : 'text-slate-400'
              )}
              disabled={selectedIndex === 1 ? true : selectedIndex === 2}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 21H12H6.5M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13C21 14.6802 21 15.5202 20.673 16.162C20.3854 16.7265 19.9265 17.1854 19.362 17.473C18.7202 17.8 17.8802 17.8 16.2 17.8H7.8C6.11984 17.8 5.27976 17.8 4.63803 17.473C4.07354 17.1854 3.6146 16.7265 3.32698 16.162C3 15.5202 3 14.6802 3 13V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                setImageCard(!imageCard);
                setNormalCard(false);
              }}
              className={classNames(
                imageCard ? 'text-purple-700' : 'text-slate-400'
              )}
              disabled={selectedIndex === 1 ? true : selectedIndex === 2}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.6L6.5 17.6M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-5 px-5 border-r border-slate-300">
            <button
              type="button"
              onClick={() => {
                setFullScreen(!fullScreen);
                setContainerScreen(false);
              }}
              className={classNames(
                fullScreen ? 'text-purple-700' : 'text-slate-400'
              )}
              disabled={selectedIndex === 1 ? true : selectedIndex === 2}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M12 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                setContainerScreen(!containerScreen);
                setFullScreen(false);
              }}
              className={classNames(
                containerScreen ? 'text-purple-700' : 'text-slate-400'
              )}
              disabled={selectedIndex === 1 ? true : selectedIndex === 2}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          <div className="px-5 border-r border-slate-300">
            <Switch.Group as="div" className="flex items-center">
              <Switch.Label as="span" className="mr-2">
                <span className="text-slate-400 text-sm tracking-sm">
                  Title
                </span>
              </Switch.Label>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? 'bg-purple-600' : 'bg-gray-100',
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
            </Switch.Group>
          </div>
          <div className="px-5 flex">
            <button
              type="button"
              className="inline-flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4V2ZM15 4C15.5523 4 16 3.55228 16 3C16 2.44772 15.5523 2 15 2V4ZM3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7V5ZM21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5V7ZM19.9978 6.06652C20.0345 5.51546 19.6176 5.03895 19.0665 5.00221C18.5155 4.96548 18.039 5.38242 18.0022 5.93348L19.9978 6.06652ZM18.2987 16.5193L17.3009 16.4528L18.2987 16.5193ZM5.70129 16.5193L4.7035 16.5858L5.70129 16.5193ZM5.99779 5.93348C5.96105 5.38242 5.48454 4.96548 4.93348 5.00221C4.38242 5.03895 3.96548 5.51546 4.00221 6.06652L5.99779 5.93348ZM7.49834 20.6997L7.06223 21.5996H7.06223L7.49834 20.6997ZM6.19998 19.485L7.06888 18.99L6.19998 19.485ZM17.8 19.485L18.6689 19.98H18.6689L17.8 19.485ZM16.5017 20.6997L16.9378 21.5996H16.9378L16.5017 20.6997ZM11 10.5C11 9.94772 10.5523 9.5 10 9.5C9.44772 9.5 9 9.94772 9 10.5H11ZM9 15.5C9 16.0523 9.44772 16.5 10 16.5C10.5523 16.5 11 16.0523 11 15.5H9ZM15 10.5C15 9.94772 14.5523 9.5 14 9.5C13.4477 9.5 13 9.94772 13 10.5H15ZM13 15.5C13 16.0523 13.4477 16.5 14 16.5C14.5523 16.5 15 16.0523 15 15.5H13ZM9 4H15V2H9V4ZM3 7H21V5H3V7ZM18.0022 5.93348L17.3009 16.4528L19.2965 16.5858L19.9978 6.06652L18.0022 5.93348ZM13.5093 20H10.4907V22H13.5093V20ZM6.69907 16.4528L5.99779 5.93348L4.00221 6.06652L4.7035 16.5858L6.69907 16.4528ZM10.4907 20C9.68385 20 9.13703 19.9993 8.71286 19.9656C8.30086 19.9329 8.08684 19.8736 7.93444 19.7998L7.06223 21.5996C7.52952 21.826 8.0208 21.917 8.55459 21.9593C9.07622 22.0007 9.71571 22 10.4907 22V20ZM4.7035 16.5858C4.75505 17.359 4.79686 17.9972 4.87287 18.5149C4.95066 19.0447 5.07405 19.5288 5.33109 19.98L7.06888 18.99C6.98505 18.8429 6.9117 18.6333 6.85166 18.2243C6.78984 17.8034 6.75274 17.2578 6.69907 16.4528L4.7035 16.5858ZM7.93444 19.7998C7.57072 19.6235 7.26895 19.3412 7.06888 18.99L5.33109 19.98C5.73123 20.6824 6.33479 21.247 7.06223 21.5996L7.93444 19.7998ZM17.3009 16.4528C17.2473 17.2578 17.2102 17.8034 17.1483 18.2243C17.0883 18.6333 17.015 18.8429 16.9311 18.99L18.6689 19.98C18.926 19.5288 19.0493 19.0447 19.1271 18.5149C19.2031 17.9972 19.245 17.359 19.2965 16.5858L17.3009 16.4528ZM13.5093 22C14.2843 22 14.9238 22.0007 15.4454 21.9593C15.9792 21.917 16.4705 21.826 16.9378 21.5996L16.0656 19.7998C15.9132 19.8736 15.6991 19.9329 15.2871 19.9656C14.863 19.9993 14.3161 20 13.5093 20V22ZM16.9311 18.99C16.7311 19.3412 16.4293 19.6235 16.0656 19.7998L16.9378 21.5996C17.6652 21.247 18.2688 20.6824 18.6689 19.98L16.9311 18.99ZM9 10.5V15.5H11V10.5H9ZM13 10.5V15.5H15V10.5H13Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {enabled ? (
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="mb-12 max-w-xs">
            <form action="">
              <div className="flex items-center gap-[22px]">
                <input
                  type="text"
                  name="sectionTitle"
                  id="sectionTitle"
                  placeholder="Type section title"
                  className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center flex-shrink-0 w-11 h-11 bg-purple-700 text-white rounded-full hover:bg-purple-800 focus:outline-none"
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <div
        className={classNames(
          fullScreen
            ? 'max-w-full px-0'
            : 'max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'
        )}
      >
        <Tab.Panels>
          <Tab.Panel className="space-y-10">
            {normalCard && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <PublicationsNormalCard smallSize listBox />
                  <PublicationsNormalCard smallSize dropdown />
                  <PublicationsNormalCard smallSize listBox />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                  <PublicationsNormalCard mediumSize listBox />
                  <PublicationsNormalCard mediumSize listBox />
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <PublicationsNormalCard singleBigCard largeSize listBox />
                </div>
              </>
            )}
            {imageCard && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <PublicationsFullImageVerticalCard largeSize />
                  <PublicationsFullImageVerticalCard largeSize />
                  <PublicationsFullImageVerticalCard largeSize />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                  <PublicationsFullImageVerticalCard largeSize />
                  <PublicationsFullImageVerticalCard largeSize />
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <PublicationsFullImageVerticalCard largeSize singleBigCard />
                </div>
              </>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-[800px,1fr] gap-8">
              <div>
                <PublicationsStreamCard dropdown />
                <hr className="my-10" />
                <PublicationsStreamCard listBox />
                <hr className="my-10" />
                <PublicationsStreamCard listBox />
                <hr className="my-10" />
                <PublicationsStreamCard listBox />
              </div>
              <div className="lg:flex lg:flex-col lg:gap-10">
                <Sidebar publicationProfile />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-[800px,1fr] gap-8">
              <div>
                <PublicationsListImageCard dropdown />
                <hr className="my-10" />
                <PublicationsListImageCard listBox />
                <hr className="my-10" />
                <PublicationsListImageCard listBox />
                <hr className="my-10" />
                <PublicationsListImageCard listBox />
                <hr className="my-10" />
                <PublicationsListImageCard listBox />
                <hr className="my-10" />
                <PublicationsListImageCard listBox />
              </div>
              <div className="lg:flex lg:flex-col lg:gap-10">
                <Sidebar publicationProfile />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}
