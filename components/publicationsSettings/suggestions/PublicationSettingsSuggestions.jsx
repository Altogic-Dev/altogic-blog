import Suggestion from '@/components/AutoComplete/Suggestion';
import { Popover } from '@headlessui/react';

function PublicationSettingsSuggestions({ suggestions, name, onClick }) {
  return (
    <div
      className="w-full absolute bg-white border border-gray-100 border-t-0 p-4 shadow top-[45.5px] left-0 z-50 duration-1000"
      id="suggestionUsersList"
    >
      <ul className="suggestions list-none mt-0 overflow-y-auto pl-0 w-full">
        <Popover>
          <Suggestion suggestions={suggestions} name={name} onClick={onClick} />
        </Popover>
      </ul>
    </div>
  );
}

export default PublicationSettingsSuggestions;
