import _ from 'lodash';
import { useState } from 'react';
import Category from './Category';

export default function TagInput({
  label,
  tags,
  setTags,
  maxTags,
  onChange,
  value,
  ...inputProps
}) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleInsert = (e) => {
    if (
      e.key === 'Enter' &&
      _.size(tags) < maxTags &&
      !_.includes(tags, input)
    ) {
      setTags([input, ...tags]);
      setInput('');
    }
  };

  const handleDelete = (tagName) => {
    const newTags = _.reject(tags, (tag) => tag === tagName);
    setTags(newTags);
  };

  return (
    <div className="relative mb-4 md:mb-6">
      {label && (
        <span className="inline-flex text-slate-600 mb-4 text-sm tracking-sm">
          {label}:
        </span>
      )}
      <div className="flex flex-wrap items-center gap-2 py-1 mb-8 rounded-md">
        <input
          className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-slate-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          disabled={_.size(tags) >= maxTags}
          onKeyDown={handleInsert}
          onChange={handleChange}
          value={input}
          {...inputProps}
        />

        {_.map(tags, (tagName) => (
          <Category
            key={tagName}
            tag={tagName}
            onClick={() => handleDelete(tagName)}
            className="mt-2 text-xs"
          />
        ))}
      </div>
    </div>
  );
}
