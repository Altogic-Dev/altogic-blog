import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { classNames } from '@/utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { storyActions } from '@/redux/story/storySlice';
import _ from 'lodash';

export default function PublicationsFullImageVerticalCard({
  smallSize,
  largeSize,
  singleBigCard,
  index,
  listBox,
  sectionIndex,
  story,
}) {
  const [selectedSection, setSelectedSection] = useState();
  const publicationsStories = useSelector(
    (state) => state.story.publicationsStories
  );
  const featStories = useSelector((state) => state.story.featureStories);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    if (featStories || stories) {
      setSelectedSection(
        _.get(featStories, `[section-${sectionIndex}][${index}]`) ||
          _.get(stories, `[0]`)
      );
    }
  }, [featStories, stories]);

  const dispatch = useDispatch();
  const handleSelectStory = (story) => {
    setSelectedSection(story);
    dispatch(
      storyActions.selectFeatureStoriesRequest({
        story,
        index,
        sectionIndex,
      })
    );
  };

  useEffect(() => {
    if (story && publicationsStories) {
      handleSelectStory(
        publicationsStories.find((pubStory) => pubStory?._id === story.story)
      );
    }
  }, [story, publicationsStories]);
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
    <div>
      <div
        className={classNames(
          'relative flex w-full bg-black bg-opacity-20 p-6 rounded-lg',
          smallSize ? 'h-[350px]' : null,
          largeSize ? 'h-[399px]' : null,
          singleBigCard
            ? 'items-end sm:items-start justify-center sm:justify-end'
            : 'items-end'
        )}
      >
        <div
          className={classNames(
            'w-full z-20',
            singleBigCard ? 'w-full sm:w-[294px] mt-14' : null
          )}
        >
          <div>
            <span className="flex w-[267px] h-6 bg-black/20" />

            {listBox && (
              <Listbox value={selectedSection} onChange={handleSelectStory}>
                <div className="relative">
                  <Listbox.Button className="relative max-w-sm w-full h-11 bg-white text-slate-500 py-2.5 pl-3.5 pr-10 text-base text-left border border-gray-300 rounded-lg focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 cursor-default">
                    <span className="block truncate">
                      {selectedSection?.title}
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
                    <Listbox.Options className="absolute -bottom-0 mb-12 max-w-[384px] w-full bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-20 focus:outline-none">
                      {stories.map((story) => (
                        <Listbox.Option
                          key={story._id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3.5 pr-4 ${
                              active
                                ? 'bg-slate-50 text-slate-700'
                                : 'text-slate-700'
                            }`
                          }
                          value={story}
                        >
                          <span className="flex text-slate-700 mb-2 text-base font-medium tracking-sm text-left truncate group-hover:text-slate-900">
                            {story.title}
                          </span>
                          <span className="text-slate-700 text-xs tracking-sm">
                            {story?.user?.name} on{' '}
                            {DateTime.fromISO(story?.createdAt).toFormat(
                              'LLL dd'
                            )}
                          </span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
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
