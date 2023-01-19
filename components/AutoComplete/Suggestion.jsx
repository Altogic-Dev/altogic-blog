import React from 'react';
import _ from 'lodash';
import { Popover } from '@headlessui/react';
import { TagIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Avatar from '../profile/Avatar';

export default function Suggestion({ suggestions, name, onClick, selected }) {
  const router = useRouter();
  // eslint-disable-next-line consistent-return
  const setSuggestionLink = (suggestion) => {
    switch (name) {
      case 'Users':
        router.push(`/${suggestion.username}`);
        break;
      case 'Publications':
        router.push(`/publication/${suggestion.name}`);
        break;
      case 'Categories':
        router.push(`/tag/${suggestion.name}`);
        break;
      case 'Stories':
        router.push(`/story/${suggestion.storySlug}`);
        break;
      default:
        return () => {};
    }
  };

  return (
    <>
      <div className="my-2 flex justify-between">
        <p className="text-xs tracking-wide text-gray-500 uppercase">{name}</p>
      </div>
      <hr className="border-gray-300 h-px mb-2" />
      {suggestions?.length ? (
        suggestions?.map((suggestion, index) => (
          <Popover.Button
            key={suggestion._id}
            onClick={
              onClick
                ? (e) => onClick(e, suggestion._id, suggestion)
                : () => setSuggestionLink(suggestion)
            }
            className="w-full"
          >
            <li
              className={`hover:cursor-pointer hover:text-slate-300 hover:bg-purple-100 ${
                selected === index ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center p-2 w-full">
                {name === 'Categories' ? (
                  <TagIcon className="w-6 h-6 rounded-full mr-2 text-gray-600" />
                ) : (
                  <div>
                    {_.get(suggestion, 'storyImages[0]') && (
                      <img src={_.get(suggestion, 'storyImages[0]')} alt="" />
                    )}
                    {(suggestion.logo || suggestion.profilePicture) && (
                      <div className="inline-flex flex-shrink-0 w-8">
                        <Avatar
                          width={40}
                          height={40}
                          src={suggestion.logo || suggestion.profilePicture}
                        />
                      </div>
                    )}

                    {!_.get(suggestion, 'storyImages[0]') &&
                      !suggestion.profilePicture && (
                        <div className="w-8 h-8 rounded-full mr-2 bg-gray-200" />
                      )}
                  </div>
                )}
                <div className="ml-2 w-full text-start">
                  <p
                    className={`text-sm w-96 truncate flex items-center ${
                      selected === index
                        ? 'text-purple-500 font-semibold'
                        : 'text-gray-600'
                    }`}
                  >
                    {name === 'Stories' ? suggestion.title : suggestion.name}
                  </p>
                </div>
              </div>
            </li>
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
