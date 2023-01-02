import React from 'react';
import { Popover } from '@headlessui/react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import Suggestion from './Suggestion';

export default function SuggestionList({
  filteredSuggestions,
  query,
}) {
  const loading = useSelector((state) => state.general.isLoading);
  return (
    <div
      className="w-full absolute bg-white border border-gray-100 border-t-0 p-4 shadow top-[48.5px] left-0 z-50 duration-1000"
      id="suggestionList"
    >
      <ul className="suggestions list-none mt-0 overflow-y-auto pl-0 w-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#9333ea" size={20} />
          </div>
        ) : (
          <Popover>
            <Suggestion
              suggestions={filteredSuggestions?.users}
              name="Users"
            />
            <Suggestion
              suggestions={filteredSuggestions?.publications}
              name="Publications"
            />
            <Suggestion
              suggestions={filteredSuggestions?.topics}
              name="Categories"
            />
            <Suggestion
              suggestions={filteredSuggestions?.stories}
              name="Stories"
            />
            <hr className="border-gray-300 h-px mb-2" />
            <Link href={`/search-result?search=${query}`}>
              <a className="text-purple-700 font-medium tracking-sm hover:text-purple-500 hover:bg-gray-100 flex items-center">
                <ChevronLeftIcon className="h-5 w-5 inline-block mr-2" />
                See all results
              </a>
            </Link>
          </Popover>
        )}
      </ul>
    </div>
  );
}
