import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const stories = [
  {
    id: 1,
    name: 'Euismod scelerisque scelerisque quam feugiatar...',
    info: 'Olivia Rhye on Jully 28',
  },
  {
    id: 2,
    name: 'Rhoncus nisl mattis at orci eros morbi ut pretium.',
    info: 'Olivia Rhye on Jully 28',
  },
  {
    id: 3,
    name: 'Nascetur pulvinar ut vel risus, faucibus.',
    info: 'Olivia Rhye on Jully 28',
  },
];

export default function PublicationsFullImageHorizontalCard() {
  const [selectedSection, setSelectedSection] = useState(stories[0]);

  return (
    <div>
      <div className="relative flex items-end w-full h-[408px] bg-black bg-opacity-20 p-6">
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mb-4">
            <h2 className="text-slate-100 text-2xl font-semibold">
              Next featured story
            </h2>
            <Listbox value={selectedSection} onChange={setSelectedSection}>
              <div className="relative">
                <Listbox.Button className="relative max-w-sm w-full h-11 bg-white text-slate-500 py-2.5 pl-3.5 pr-10 text-base text-left border border-gray-300 rounded-lg focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 cursor-default">
                  <span className="block truncate">{selectedSection.name}</span>
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
                  <Listbox.Options className="absolute -bottom-0 mb-12 max-w-[384px] w-full bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-20 focus:outline-none">
                    {stories.map((storie) => (
                      <Listbox.Option
                        key={storie.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3.5 pr-4 ${
                            active
                              ? 'bg-slate-50 text-slate-700'
                              : 'text-slate-700'
                          }`
                        }
                        value={storie}
                      >
                        <span className="flex text-slate-700 mb-2 text-base font-medium tracking-sm text-left truncate group-hover:text-slate-900">
                          {storie.name}
                        </span>
                        <span className="text-slate-700 text-xs tracking-sm">
                          {storie.info}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="mt-4 space-y-1">
            <span className="flex w-[267px] h-6 bg-black/20" />
            <span className="flex w-[145px] h-6 bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
