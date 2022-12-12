import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { storyActions } from '@/redux/story/storySlice';
import Category from '@/components/Category';
import { CheckIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { classNames, parseHtml } from '@/utils/utils';
import PublicationSettingsSuggestions from '@/components/publicationsSettings/suggestions/PublicationSettingsSuggestions';
import { Listbox, Transition } from '@headlessui/react';
import Layout from '@/layouts/Layout';
import Button from '@/components/basic/button';
import { topicsActions } from '@/redux/topics/topicsSlice';

export default function PublishSettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryInputRef = useRef(null);

  const story = useSelector((state) => state.story.story);
  const userFromStorage = useSelector((state) => state.auth.user);
  const publications = useSelector((state) => state.publication.publications);
  const [loading, setLoading] = useState(false);
  const topicLoading = useSelector((state) => state.topics.isLoading);
  const selectedPublication = useSelector(
    (state) => state.publication.selectedPublication
  );
  const foundTopics = useSelector((state) => state.topics.searchTopics);

  const { storySlug, topic } = router.query;

  const [user, setUser] = useState();
  const [authors, setAuthors] = useState([]);
  const [inpSelectedAuthor, setInpSelectedAuthor] = useState();
  const [inpCategory, setInpCategory] = useState('');
  const [inpCategoryNames, setInpCategoryNames] = useState([]);
  const [inpRestrictComments, setInpRestrictComments] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const debouncedSearch = useCallback(
    _.debounce((category) => {
      if (category) {
        dispatch(topicsActions.searchTopicsRequest(category));
      }
    }, 500),
    []
  );

  const handleAddTopic = (topic) => {
    setIsSearchOpen(false);
    if (
      !inpCategoryNames?.some(
        (item) => item.toLowerCase() === topic.name.toLowerCase()
      ) &&
      _.size(inpCategoryNames) < 5
    ) {
      setInpCategoryNames((prev) => [...prev, topic.name]);
      setInpCategory('');
    }
  };
  const handleInsert = (e) => {
    if (e.key === 'Enter' && _.size(inpCategoryNames) < 5) {
      if (!isSearchOpen && inpCategory.trim()) {
        handleAddTopic({ name: inpCategory });
      } else if (
        _.some(foundTopics, (topic) =>
          _.includes(topic.name.toLowerCase(), inpCategory.toLowerCase())
        )
      ) {
        handleAddTopic(foundTopics[selectedIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (selectedIndex < foundTopics.length - 1) {
        setSelectedIndex((state) => state + 1);
      } else {
        setSelectedIndex(0);
      }
    } else if (e.key === 'ArrowUp') {
      if (selectedIndex > 0) setSelectedIndex((state) => state - 1);
      else setSelectedIndex(foundTopics.length - 1);
    }
  };

  const handleDelete = (categoryName) => {
    const newCategoryNames = _.reject(
      inpCategoryNames,
      (category) => category === categoryName
    );

    setInpCategoryNames(newCategoryNames);
  };

  const addCategoryFromRecommended = (categoryName) => {
    if (
      !inpCategoryNames?.some(
        (item) => item.toLowerCase() === categoryName.toLowerCase()
      ) &&
      _.size(inpCategoryNames) < 5
    ) {
      setInpCategoryNames((prev) => [...prev, categoryName.name]);
    }
  };
  const handlePublish = () => {
    setLoading(true);

    const categoryNamesSorted = [...inpCategoryNames].sort();
    const categoryPairsEdited = [];
    for (let i = 0; i < categoryNamesSorted.length - 1; i += 1) {
      for (let j = i; j < categoryNamesSorted.length - 1; j += 1) {
        categoryPairsEdited.push({
          topicA: categoryNamesSorted[i],
          topicB: categoryNamesSorted[j + 1],
        });
      }
    }
    dispatch(
      storyActions.publishStoryRequest({
        story: {
          ...story,
          publication:
            inpSelectedAuthor.type === 'publication'
              ? inpSelectedAuthor.id
              : undefined,
          user: user?._id,
          publicationName:
            inpSelectedAuthor.type === 'publication'
              ? inpSelectedAuthor.name
              : undefined,
          isPublished: true,
          categoryNames: inpCategoryNames,
          isRestrictedComments: inpRestrictComments,
          excerpt: parseHtml(story?.content)?.slice(0, 300),
        },
        categoryPairs: categoryPairsEdited,
        onSuccess: () => router.push(`/story/${story.storySlug}`),
        selectedPublication:
          inpSelectedAuthor.type === 'publication' ? story?.publication : null,
      })
    );
  };

  useEffect(() => {
    setSelectedIndex(0);
    if (_.size(foundTopics) === 0) setIsSearchOpen(false);
    else setIsSearchOpen(true);
  }, [foundTopics]);

  useEffect(() => {
    if (inpCategory && !isSearchOpen) categoryInputRef.current.focus();
  }, [isSearchOpen]);
  useEffect(() => {
    setIsSearchOpen(false);
    if (inpCategory) debouncedSearch(inpCategory);
  }, [inpCategory]);

  useEffect(() => {
    setUser(userFromStorage);
  }, [userFromStorage]);

  useEffect(() => {
    if (_.isEmpty(inpCategoryNames) && !_.isNil(story)) {
      setInpCategoryNames(story.categoryNames);
      setInpRestrictComments(story.isRestrictedComments);
    }
  }, [story]);
  useEffect(() => {
    if (topic) {
      setInpCategoryNames((prev) => [...prev, topic]);
    }
  }, [topic]);
  useEffect(() => {
    if (!story && storySlug) {
      dispatch(
        storyActions.getStoryBySlugRequest({
          storySlug,
          userId: user?._id,
        })
      );
    }
  }, [storySlug]);

  useEffect(() => {
    const userAuthor = {
      id: userFromStorage?._id,
      name: userFromStorage?.name,
      userName: userFromStorage?.username,
      avatar: userFromStorage?.profilePicture,
      type: 'user',
    };
    const publicationAuthors = _.map(publications, (publication) => ({
      id: publication._id,
      name: publication.name,
      userName: publication.publicationname,
      avatar: publication.logo,
      type: 'publication',
    }));

    if (!_.isEmpty(publicationAuthors))
      setAuthors([userAuthor, ...publicationAuthors]);
    else setAuthors([userAuthor]);

    if (selectedPublication) {
      const selected = _.find(
        publicationAuthors,
        (publication) => publication.id === selectedPublication?._id
      );
      setInpSelectedAuthor(selected);
    } else {
      setInpSelectedAuthor(userAuthor);
    }
  }, [publications]);
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setIsSearchOpen(false);
    });
    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, []);
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publish Settings</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publish Settings"
        />
        
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-12 pt-8 pb-[72px] lg:pb-36">
          <div className="w-full">
            <h1 className="text-slate-800 mb-12 text-lg tracking-sm">
              Publish Settings
            </h1>
            <div className="flex flex-col-reverse md:grid md:grid-cols-[2fr,1fr] gap-12">
              <div>
                <span className="text-slate-600 text-sm tracking-sm">
                  Story Preview
                </span>
                <h1 className="text-slate-800 text-2xl font-bold tracking-sm mb-4">
                  {story?.title}
                </h1>
                <div
                  className="prose prose-img:rounded-none prose-figcaption:mt-0 prose-blockquote:text-2xl prose-blockquote:md:text-3xl prose-blockquote:pl-5 prose-blockquote:md:pl-6 prose-blockquote:not-italic prose-blockquote:border-purple-700 prose-blockquote:border-l-2 prose-h1:text-base prose-h1:md:text-lg prose-h1:text-slate-800 prose-h1:font-bold prose-h1:tracking-md prose-h2:text-xl prose-h2:font-semibold prose-p:text-base prose-p:text-slate-500 prose-p:tracking-sm mb-10 sm:mb-24"
                  dangerouslySetInnerHTML={{ __html: _.get(story, 'content') }}
                />
                <Link href={`/write-a-story?id=${_.get(story, '_id')}`}>
                  <Button className="flex md:inline-flex items-center justify-center gap-2 w-full md:w-auto px-3.5 py-2.5 text-sm font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 15L16.6666 15.9117C16.2245 16.3951 15.6251 16.6667 15.0001 16.6667C14.3751 16.6667 13.7757 16.3951 13.3337 15.9117C12.891 15.4293 12.2916 15.1584 11.6668 15.1584C11.042 15.1584 10.4426 15.4293 9.99998 15.9117M2.5 16.6667H3.89545C4.3031 16.6667 4.50693 16.6667 4.69874 16.6206C4.8688 16.5798 5.03138 16.5125 5.1805 16.4211C5.34869 16.318 5.49282 16.1739 5.78107 15.8856L16.25 5.41669C16.9404 4.72634 16.9404 3.60705 16.25 2.91669C15.5597 2.22634 14.4404 2.22634 13.75 2.91669L3.28105 13.3856C2.9928 13.6739 2.84867 13.818 2.7456 13.9862C2.65422 14.1353 2.58688 14.2979 2.54605 14.468C2.5 14.6598 2.5 14.8636 2.5 15.2713V16.6667Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit Story
                  </Button>
                </Link>
                <hr className="block md:hidden my-16" />
                <Button
                  className="flex md:hidden items-center justify-center gap-2 w-full px-3.5 py-2.5 mb-16 text-base font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handlePublish}
                  loading={loading}
                >
                  Publish Now
                </Button>
              </div>
              <div>
                <Listbox
                  value={inpSelectedAuthor}
                  onChange={setInpSelectedAuthor}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-slate-600 mb-4 text-sm tracking-sm">
                        Publishing to:
                      </Listbox.Label>
                      <div className="relative mb-8">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3.5 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                          <span className="flex items-center">
                            <img
                              src={inpSelectedAuthor?.avatar}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span className="ml-2 block truncate">
                              {inpSelectedAuthor?.name}{' '}
                              <span className="text-slate-500">
                                {inpSelectedAuthor?.userName}
                              </span>
                            </span>
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-500"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {_.map(authors, (author) => (
                              <Listbox.Option
                                key={author?.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'text-white bg-gray-50'
                                      : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-3.5 pr-9'
                                  )
                                }
                                value={author}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={author?.avatar}
                                        alt=""
                                        className="flex-shrink-0 h-6 w-6 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? 'font-semibold'
                                            : 'font-normal',
                                          'ml-2 block truncate text-slate-800'
                                        )}
                                      >
                                        {author?.name}{' '}
                                        <span className="text-slate-500">
                                          {author?.userName}
                                        </span>
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span className="absolute inset-y-0 right-0 flex items-center text-purple-600 pr-4">
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
                    </>
                  )}
                </Listbox>
                <div className="relative mb-4 md:mb-6">
                  <span className="inline-flex text-slate-600 mb-4 text-sm tracking-sm">
                    Add Category:
                  </span>
                  <div className="relative flex flex-wrap items-center gap-2 py-1 mb-8 rounded-md">
                    <input
                      className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-slate-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      placeholder="Category Name"
                      value={inpCategory}
                      onChange={(e) => {
                        setInpCategory(e.target.value);
                      }}
                      onKeyDown={handleInsert}
                      ref={categoryInputRef}
                    />
                    {isSearchOpen &&
                      _.size(inpCategory) !== 0 &&
                      _.size(foundTopics) > 0 && (
                        <PublicationSettingsSuggestions
                          name="Categories"
                          selectedIndex={selectedIndex}
                          suggestions={foundTopics}
                          onClick={(e, topicId, topic) => handleAddTopic(topic)}
                          loading={topicLoading}
                        />
                      )}

                    {_.map(inpCategoryNames, (category) => (
                      <Category
                        key={category}
                        tag={category}
                        onClick={() => handleDelete(category)}
                        className="mt-2 text-xs"
                      />
                    ))}
                  </div>
                </div>
                <div className="md:mb-20">
                  {_.size(user?.recommendedTopics) > 0 && (
                    <>
                      <p className="text-slate-600 mb-4 text-sm tracking-sm">
                        Recommended Categories
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mb-10">
                        {_.map(user?.recommendedTopics, (categoryName) => (
                          <Button
                            key={categoryName}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            onClick={() =>
                              addCategoryFromRecommended(categoryName)
                            }
                          >
                            <PlusIcon
                              className="mr-2 h-5 w-5 text-gray-700"
                              aria-hidden="true"
                            />
                            {categoryName}
                          </Button>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="private-list"
                        name="list"
                        type="checkbox"
                        className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
                        onChange={() => setInpRestrictComments((prev) => !prev)}
                        checked={inpRestrictComments}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="private-list"
                        className="text-sm font-medium text-slate-800 tracking-sm"
                      >
                        Restrict Comments
                      </label>
                    </div>
                  </div>
                </div>
                <Button
                  className="hidden md:flex items-center justify-center gap-2 w-full px-3.5 py-2.5 text-base font-medium tracking-sm rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handlePublish}
                  loading={loading}
                >
                  Publish Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
