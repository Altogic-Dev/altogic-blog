import { topicsActions } from '@/redux/topics/topicsSlice';
import { capitiliazeAllWords } from '@/utils/utils';
import { PlusIcon } from '@heroicons/react/outline';
import _ from 'lodash';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../basic/button';
import Category from '../Category';
import PublicationSettingsSuggestions from '../publicationsSettings/suggestions/PublicationSettingsSuggestions';

export default function RecommendationInput({ tags, setTags }) {
  const foundTopics = useSelector((state) => state.topics.searchTopics);
  const topicLoading = useSelector((state) => state.topics.isLoading);
  const categoryInputRef = useRef(null);
  const dispatch = useDispatch();
  const [inpCategory, setInpCategory] = useState('');
  const [inpCategoryNames, setInpCategoryNames] = useState(tags);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const user = useSelector((state) => state.auth.user);

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
      setInpCategoryNames((prev) => [...prev, capitiliazeAllWords(topic.name)]);
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

  useEffect(() => {
    setSelectedIndex(0);
    if (_.size(foundTopics) === 0) setIsSearchOpen(false);
    else setIsSearchOpen(true);
  }, [foundTopics]);

  useEffect(() => {
    setIsSearchOpen(false);
    if (inpCategory) debouncedSearch(inpCategory);
  }, [inpCategory]);

  useEffect(() => {
    setTags(inpCategoryNames);
  }, [inpCategoryNames]);

  return (
    <div className="relative mb-4 md:mb-6">
      <div className="relative flex flex-wrap items-center gap-2 py-1 mb-8 rounded-md">
        <input
          className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white sm:text-sm text-slate-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
      <div>
        <p className="text-slate-600 mb-4 text-sm tracking-sm">
          Recommended Categories
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {_.map(user?.recommendedTopics, (topic) => (
            <Button
              key={topic}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => handleAddTopic({ name: topic })}
            >
              <PlusIcon
                className="mr-2 h-5 w-5 text-gray-700"
                aria-hidden="true"
              />
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
