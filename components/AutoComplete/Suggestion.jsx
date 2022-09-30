import React from 'react';
import { Popover } from '@headlessui/react';
import { TagIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function Suggestion({ suggestions, name, onClick }) {
  const router = useRouter();
  // eslint-disable-next-line consistent-return
  const setSuggestionLink = (suggestion) => {
    switch (name) {
      case 'Users':
        router.push(`/${suggestion.username}`);
        break;
      case 'Publications':
        router.push(`/publication/${suggestion.id}`);
        break;
      case 'Topics':
        router.push(`/tag/${suggestion.name}`);
        break;
      case 'Stories':
        router.push(`/story/${suggestion.storySlug}`);
        break;
      default:
        return '';
    }
  };
  return (
    <>
      <div className="my-2 flex justify-between">
        <p className="text-xs tracking-wide text-gray-500 uppercase">{name}</p>
      </div>
      <hr className="border-gray-300 h-px mb-2" />
      {suggestions?.length ? (
        suggestions?.map((suggestion) => (
          <Popover.Button
            key={suggestion._id}
            onClick={(e) => onClick(e, suggestion._id, suggestion)}
            className="w-full"
          >
            <a
              role="button"
              tabIndex="0"
              onClick={() => setSuggestionLink(suggestion)}
              aria-hidden="true"
            >
              <li className="hover:cursor-pointer hover:text-slate-300 hover:bg-gray-100">
                <div className="flex items-center p-2 w-full">
                  {suggestion.profilePicture || suggestion.storyImages ? (
                    <img
                      src={
                        name === 'Stories'
                          ? suggestion.storyImages[0]
                          : suggestion.profilePicture
                      }
                      alt="profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <TagIcon className="w-6 h-6 rounded-full mr-2 text-gray-600" />
                  )}
                  <div className="ml-2 w-full text-start">
                    <p className="text-sm font-semibold text-slate-500 inline-block w-96 truncate">
                      {name === 'Stories' ? suggestion.title : suggestion.name}
                    </p>
                  </div>
                </div>
              </li>
            </a>
          </Popover.Button>
        ))
      ) : (
        <li className="hover:cursor-pointer hover:text-slate-300 hover:bg-gray-100">
          <div className="flex items-center p-2">
            <div className="ml-2">
              <p className="text-sm font-semibold text-slate-500">
                No {name} found
              </p>
            </div>
          </div>
        </li>
      )}
    </>
  );
}
