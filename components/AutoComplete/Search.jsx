import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
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
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [input, setInput] = useState('');
  const closeSuggestions = () => {
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);
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
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onKeyDown = (key) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      setInput(suggestions[activeSuggestionIndex].name);
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
          activeSuggestionIndex={activeSuggestionIndex}
          onClick={onClick}
          query={input}
        />
      )}
    </div>
  );
}
