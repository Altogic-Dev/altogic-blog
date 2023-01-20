import { Popover } from '@headlessui/react';
import HeaderMenu from './Menu';

export default function Header({logo}) {
  return (
    <Popover className="relative bg-white border-b border-gray-200">
      <HeaderMenu logo={logo} />
      {/* Mobile Bottom Fixed Menu */}
    </Popover>
  );
}
