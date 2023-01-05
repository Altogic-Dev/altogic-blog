import { Fragment, useState, useEffect } from 'react';
import { Listbox, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { storyActions } from '@/redux/story/storySlice';
import _ from 'lodash';

export default function PublicationsStreamCard({
  listBox,
  dropdown,
  index,
  sectionIndex,
  story,
  isTag,
}) {
  const [selectedSection, setSelectedSection] = useState();
  const publicationsStories = useSelector(
    (state) => state.story.publicationsStories
  );
  const featStories = useSelector((state) => state.story.featureStories);
  const [stories, setStories] = useState([]);

  const dispatch = useDispatch();
  const handleSelectStory = (story) => {
    if (story) {
      setSelectedSection(story);
      dispatch(
        storyActions.selectFeatureStoriesRequest({
          story,
          index,
          sectionIndex,
        })
      );
    }
  };

  useEffect(() => {
    if (!isTag && story && publicationsStories) {
      handleSelectStory(
        publicationsStories.find((pubStory) => pubStory?._id === story.story)
      );
    }
  }, [story, publicationsStories]);

  useEffect(() => {
    if (featStories || stories) {
      setSelectedSection(
        _.get(featStories, `[section-${sectionIndex}][${index}]`) ||
          _.get(stories, `[0]`)
      );
    }
  }, [featStories, stories]);

  useEffect(() => {
    if (publicationsStories) {
      if (_.isArray(publicationsStories[sectionIndex])) {
        setStories(publicationsStories[sectionIndex]);
      } else {
        setStories(publicationsStories);
      }
    }
  }, [publicationsStories]);

  return (
    <div className="space-y-4">
      <span className="flex w-[380px] h-6 bg-black/20" />

      {listBox && (
        <Listbox value={selectedSection} onChange={handleSelectStory}>
          <div className="relative">
            <Listbox.Button className="relative min-w-[240px] max-w-[384px] w-full h-11 bg-white text-slate-500 py-2.5 pl-3.5 pr-10 text-base text-left border border-gray-300 rounded-lg focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 cursor-default">
              <span className="block truncate">{selectedSection?.title}</span>
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
              <Listbox.Options className="absolute -bottom-0 mb-12 min-w-[240px] w-96 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-20 focus:outline-none">
                {stories.map((story) => (
                  <Listbox.Option
                    key={story._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3.5 pr-4 ${
                        active ? 'bg-slate-50 text-slate-700' : 'text-slate-700'
                      }`
                    }
                    value={story}
                  >
                    <span className="flex text-slate-700 mb-2 text-base font-medium tracking-sm text-left truncate group-hover:text-slate-900">
                      {story.title}
                    </span>
                    <span className="text-slate-700 text-xs tracking-sm">
                      {story?.user.name} on{' '}
                      {DateTime.fromISO(story?.createdAt).toFormat('LLL dd')}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
      {dropdown && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center bg-slate-100 text-slate-700 py-2.5 px-3.5 text-base rounded-full hover:bg-purple-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Change a story...
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
            <Menu.Items className="absolute left-0 mt-2 w-96 origin-top-left rounded-md bg-white shadow-lg z-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {stories.map((story) => (
                <Menu.Item key={story.id}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? 'bg-slate-50 text-white' : 'text-gray-900'
                      } group flex flex-col w-full rounded-md p-3.5`}
                    >
                      <span className="flex text-slate-700 mb-2 text-base font-medium tracking-sm text-left truncate group-hover:text-slate-900">
                        {story.title}
                      </span>
                      <span className="text-slate-700 text-xs tracking-sm">
                        {story?.user?.name} on{' '}
                        {DateTime.fromISO(story?.createdAt).toFormat('LLL dd')}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      <div className="mt-4 space-y-1">
        <span className="flex w-[384px] h-6 bg-slate-200" />
        <span className="flex w-[209px] h-6 bg-slate-200" />
      </div>
    </div>
  );
}
