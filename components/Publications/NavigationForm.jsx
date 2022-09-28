import React, { Fragment, useState, useEffect } from 'react';
import { classNames } from '@/utils/utils';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import Select from '../Select';

const tabTypes = [
  { name: 'Many Stories (Features page)', value: 'feature' },
  { name: 'Many Stories (Using topics)', value: 'topic' },
  { name: 'Single Story', value: 'story' },
  { name: 'About The Publication', value: 'about' },
];

export default function NavigationForm({ navigation }) {
  const [selected, setSelected] = useState(tabTypes[0]);
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
  }, [topics, stories]);
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
  return (
    <form className="w-full flex">
      <div className="flex-1 mr-4">
        <label
          htmlFor="title"
          className="block text-slate-700 mb-4 text-lg font-semibold"
        >
          Tab Name
        </label>
        <div className="mt-1">
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Navigation Name One"
            register={register('title')}
            error={errors.title}
          />
        </div>
      </div>
      <div className="flex-1 mr-4">
        <span className="block text-slate-700 mb-4 text-lg font-semibold">
          Tab Type
        </span>
        <Listbox value={selected} onChange={setSelected} name="type" id="type">
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
      </div>
      <div className="flex-1">
        <label
          htmlFor="url"
          className="block text-slate-700 mb-4 text-lg font-semibold"
        >
          Contents
        </label>
        {selected.value !== 'about' && (
          <div className="mt-1">
            <Select
              type="text"
              name="url"
              id="url"
              className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
              options={tabData[selected.value]}
              register={register('url')}
              error={errors.url}
              value={navigation?.contents}
            />
          </div>
        )}
      </div>
    </form>
  );
}
