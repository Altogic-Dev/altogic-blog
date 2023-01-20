import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import SuggestionList from './SuggestionList';

export default function Search({
  suggestions,
  onSearch,
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
  // const onClick = (e) => {
  //   setInput(e.target.innerText);
  //   closeSuggestions();
  // };

  const handleDebounceFn = (inputValue) => {
    if (inputValue.length >= 3) {
      onSearch(inputValue);
      setShowSuggestions(true);
    }
  };

  const onKeyDown = (key) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      router.push(`/search-result?search=${input}`);
    }
  };
  const debounceFn = useCallback(_.debounce(handleDebounceFn, 500), []);
  const onChange = async (e) => {
    setInput(e.target.value);
    debounceFn(e.target.value);
  };
  useEffect(() => {
    if (!showSuggestions) {
      closeSuggestions();
    }
  }, [showSuggestions]);
  useEffect(() => {
    document.addEventListener('click', closeSuggestions);

    return () => {
      document.removeEventListener('click', closeSuggestions);
    };
  }, []);

  useEffect(() => {
    closeSuggestions()
  }, [router.asPath])
  return (
    <div className="">
      <div>
        <div className="rounded-md shadow-sm">
          <input
            className="search-input"
            value={input}
            name="search"
            id="search"
            placeholder="Search"
            onKeyDown={onKeyDown}
            onChange={onChange}
            autoComplete="off"
            {...rest}
          />
        </div>
      </div>
      {showSuggestions && input && (
        <SuggestionList filteredSuggestions={suggestions} query={input} />
      )}
    </div>
  );
}
