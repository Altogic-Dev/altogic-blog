import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import SuggestionList from './SuggestionList';

export default function Search({
  suggestions,
  onSearch,
  loading,
  closeModal,
  showSuggestions,
  setShowSuggestions,
  ...rest
}) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const closeSuggestions = () => {
    setShowSuggestions(false);
    setInput('');
    if (closeModal) {
      closeModal();
    }
  };
  const onClick = (e) => {
    setInput(e.target.innerText);
    closeSuggestions();
  };

  const handleDebounceFn = (inputValue) => {
    onSearch(inputValue);
    setShowSuggestions(true);
  };

  const onKeyDown = (key) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      router.push(`/search-result?search=${input}`);
    }
  };
  const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);
  const onChange = async (e) => {
    setInput(e.target.value);
    debounceFn(e.target.value);
  };

  useEffect(() => {
    if (!showSuggestions) {
      closeSuggestions();
    }
  }, [showSuggestions]);
  return (
    <div className="hidden lg:block">
      <div>
        <div className="rounded-md shadow-sm">
          <input
            className="search-input"
            value={input}
            name="email"
            id="email"
            placeholder="Search"
            onKeyDown={onKeyDown}
            onChange={onChange}
            autoComplete="off"
            {...rest}
          />
        </div>
      </div>
      {showSuggestions && !loading && input && (
        <SuggestionList
          filteredSuggestions={suggestions}
          onClick={onClick}
          query={input}
        />
      )}
    </div>
  );
}
