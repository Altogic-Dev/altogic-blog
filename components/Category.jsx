import React from 'react';
import { XIcon } from '@heroicons/react/solid';

function Category({ tag, onClick, className }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm leading-5 rounded-md tracking-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${className}`}
    >
      <XIcon
        onClick={onClick}
        className="mr-2 h-4 w-4 sm:h-5 sm:w-5 hover:text-indigo-300"
        aria-hidden="true"
      />
      {tag}
    </button>
  );
}

export default Category;
