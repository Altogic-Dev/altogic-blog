import React, { Fragment, useState, useEffect } from 'react';
import { classNames } from '@/utils/utils';
import { Listbox, Transition } from '@headlessui/react';
import _ from 'lodash';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';

const tabTypes = [
  { name: 'Many Stories (Features page)', value: 'feature' },
  { name: 'Many Stories (Using topics)', value: 'topic' },
  { name: 'Single Story', value: 'story' },
  { name: 'About The Publication', value: 'about' },
];

export default function NavigationForm({ navigation }) {
  const [selected, setSelected] = useState(tabTypes[0]);
  const [selectedContent, setSelectedContent] = useState();
  const [tabData, setTabData] = useState({});
  const topics = useSelector((state) => state.topics.publicationsTopics);
  const stories = useSelector((state) => state.story.publicationsStories);
  const featurePages = useSelector((state) => state.publication.featurePages);

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    type: yup.string().required('Type is required'),
    topic: yup.string().when('type', {
      is: 'topic',
      then: yup.string().required('Topic is required'),
    }),
    story: yup.string().when('type', {
      is: 'story',
      then: yup.string().required('Story is required'),
    }),
  });

  useEffect(() => {
    if (topics || stories || featurePages) {
      setTabData({
        topic: topics,
        story: stories,
        feature: featurePages,
      });
    }
  }, [topics, stories,featurePages]);
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  useEffect(() => {
    if (navigation) {
      setValue('title', navigation.tabName);
      setValue('type', navigation.tabType);
      setValue('url', navigation.contents);
      setSelected(tabTypes.find((tab) => tab.value === navigation.tabType));
    }
  }, [navigation]);

  useEffect(() => {
    if (selected && tabData) {
      if (_.isNil(navigation?.contents)) {
        setSelectedContent(_.first(tabData[selected.value]));
      }
      setSelectedContent(
        _.find(
          tabData[selected.value],
          (item) =>
            item._id === navigation?.contents ||
            item.title === navigation?.contents ||
            item.topic === navigation?.contents
        )
      );
    }
  }, [tabData,selected]);

  return (
    <form className="w-full grid grid-cols-3 gap-4 items-center">
      <Input
        type="text"
        name="title"
        id="title"
        placeholder="Navigation Name One"
        register={register('title')}
        error={errors.title}
      />
      <Listbox value={selected} onChange={setSelected} name="type" id="type">
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3.5 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
            <Listbox.Options className=" absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              {tabTypes.map((tabType) => (
                <Listbox.Option
                  key={tabType.name}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-gray-50' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3.5 pr-9'
                    )
                  }
                  value={tabType}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate text-slate-800'
                        )}
                      >
                        {tabType.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-purple-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      {selected.value !== 'about' && (
        <Listbox
          value={selectedContent}
          onChange={setSelectedContent}
          name="url"
          id="url"
          register={register('url')}
        >
          <div className="relative">
            <Listbox.Button className=" h-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3.5 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block text-slate-700 text-base truncate">
                {selectedContent?.title ||
                  selectedContent?.name ||
                  selectedContent?.topic}
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
              <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                {_.map(tabData[selected.value], (option) => (
                  <Listbox.Option
                    key={option._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-gray-50' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3.5 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate text-slate-800'
                          )}
                        >
                          {option?.title || option?.name || option?.topic}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-purple-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      )}
    </form>
  );
}
