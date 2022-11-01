import Suggestion from '@/components/AutoComplete/Suggestion';
import { Popover } from '@headlessui/react';

function PublicationSettingsSuggestions({
  suggestions,
  name,
  onClick,
  loading,
}) {
  return (
    <div
      className="w-full absolute bg-white border border-gray-100 border-t-0 p-4 shadow top-[45.5px] left-0 z-50 duration-1000"
      id="suggestionUsersList"
    >
      <ul className="suggestions list-none mt-0 pl-0 w-full">
        <Popover>
          {!loading ? (
            <Suggestion
              suggestions={suggestions}
              name={name}
              onClick={onClick}
            />
          ) : (
            <span className='text-xs text-slate-500'>Loading Categories...</span>
          )}
        </Popover>
      </ul>
    </div>
  );
}

export default PublicationSettingsSuggestions;
