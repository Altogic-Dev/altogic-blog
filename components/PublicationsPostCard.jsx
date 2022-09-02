import { Fragment, useState } from 'react';
import { Menu, Transition, Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PublicationPostCard({
  firstPadding,
  personName,
  date,
  storiesCount,
  bigImage,
  image,
  title,
  description,
  readMoreUrl,
  bookmark,
}) {
  const [createNewList, setCreateNewList] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className={classNames(firstPadding ? 'py-8 first:pt-0' : 'py-8')}>
        <a href="#" className="inline-flex items-center gap-3 mb-4">
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div>
            <span className="text-slate-700  text-base font-medium tracking-sm">
              {personName}
            </span>
            <div className="flex items-center gap-2 text-slate-500 tracking-sm">
              <span>{date}</span>
              <svg
                className="h-1 w-1 text-slate-500"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx={4} cy={4} r={3} />
              </svg>
              <span>{storiesCount} stories</span>
            </div>
          </div>
        </a>
        <a href="#" className="group inline-block mb-4 md:mb-8">
          <img
            className={classNames(
              bigImage
                ? 'w-full h-[250px] object-cover mb-8 rounded-md'
                : 'w-full h-[220px] object-cover mb-8 rounded-md'
            )}
            src={image}
            alt={title}
          />
          <div className="flex items-center gap-2">
            <h2 className="text-slate-900 text-3xl mb-2 font-semibold leading-9 tracking-md transition ease-in-out duration-150 group-hover:text-purple-700">
              {title}
            </h2>
          </div>
          <p className="text-slate-500 text-sm tracking-sm">{description}</p>
        </a>
        <div className="flex items-center justify-between gap-4">
          <a
            href={readMoreUrl}
            className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700"
          >
            Read more
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
          </a>
          {bookmark && (
            <div className="flex items-center gap-4 relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-gray-300 before:w-[1px] before:h-[30px]">
              <Menu as="div" className="relative inline-block text-left ml-4">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center w-12 h-12 p-3 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <svg
                      className="w-6 h-6 text-slate-400 group-hover:text-slate-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21H19ZM5 21H4C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L5 21ZM12 17L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L12 17ZM17.362 3.32698L17.816 2.43597L17.362 3.32698ZM18.673 4.63803L19.564 4.18404L18.673 4.63803ZM6.63803 3.32698L6.18404 2.43597L6.63803 3.32698ZM5.32698 4.63803L4.43597 4.18404L5.32698 4.63803ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7H13ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM9.8 4H14.2V2H9.8V4ZM18 7.8V21H20V7.8H18ZM6 21V7.8H4V21H6ZM19.4961 20.1318L12.4961 16.1318L11.5039 17.8682L18.5039 21.8682L19.4961 20.1318ZM11.5039 16.1318L4.50386 20.1318L5.49614 21.8682L12.4961 17.8682L11.5039 16.1318ZM14.2 4C15.0566 4 15.6389 4.00078 16.089 4.03755C16.5274 4.07337 16.7516 4.1383 16.908 4.21799L17.816 2.43597C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7014 1.99922 15.0236 2 14.2 2V4ZM20 7.8C20 6.97642 20.0008 6.2986 19.9558 5.74817C19.9099 5.18608 19.8113 4.66937 19.564 4.18404L17.782 5.09202C17.8617 5.24842 17.9266 5.47262 17.9624 5.91104C17.9992 6.36113 18 6.94342 18 7.8H20ZM16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202L19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43597L16.908 4.21799ZM9.8 2C8.97642 2 8.2986 1.99922 7.74817 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43597L7.09202 4.21799C7.24842 4.1383 7.47262 4.07337 7.91104 4.03755C8.36113 4.00078 8.94342 4 9.8 4V2ZM6 7.8C6 6.94342 6.00078 6.36113 6.03755 5.91104C6.07337 5.47262 6.1383 5.24842 6.21799 5.09202L4.43597 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74817C3.99922 6.2986 4 6.97642 4 7.8H6ZM6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404L6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799L6.18404 2.43597ZM13 13V7H11V13H13ZM9 11H15V9H9V11Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20 focus:outline-none">
                    <div disabled>
                      <div className="relative flex items-center justify-between w-full px-6 py-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="private-list"
                              name="list"
                              type="checkbox"
                              className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="private-list"
                              className="text-sm font-medium text-slate-800 tracking-sm"
                            >
                              Private List
                            </label>
                          </div>
                        </div>
                        <div>
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
                        </div>
                      </div>
                    </div>
                    <div disabled>
                      <div className="relative flex items-center w-full px-6 py-4">
                        <div className="flex items-center h-5">
                          <input
                            id="public-list"
                            name="list"
                            type="checkbox"
                            className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="public-list"
                            className="text-sm font-medium text-slate-800 tracking-sm"
                          >
                            Public List
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setCreateNewList(!createNewList)}
                        className="flex items-center justify-center w-full px-6 py-4 text-purple-700 text-base tracking-sm text-center hover:bg-slate-50"
                      >
                        Create new list
                      </button>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
      {createNewList && (
        <div className="relative z-20">
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
                <div className="text-left mb-8">
                  <div className="mb-5">
                    <h3 className="text-slate-800 mb-2 text-lg font-medium tracking-sm">
                      Create List
                    </h3>
                    <span className="text-slate-500 text-sm tracking-sm">
                      Please enter a name for this list.
                    </span>
                  </div>
                  <form action="">
                    <div className="mb-6">
                      <label
                        htmlFor="list-name"
                        className="block text-slate-700 text-sm font-medium tracking-sm mb-1.5"
                      >
                        {' '}
                        List name{' '}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="list-name"
                          id="list-name"
                          placeholder="e.g. App"
                          className="block w-full min-h-[44px] text-slate-500 border-slate-300 rounded-md shadow-sm tracking-sm placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
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
                  </form>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateNewList(false)}
                    className="inline-flex items-center justify-center px-[14px] py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-[14px] py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
