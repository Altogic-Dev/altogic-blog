import { Popover } from '@headlessui/react';
import HeaderMenu from './Menu';

export default function Header() {
  return (
    <Popover className="relative bg-white border-b border-gray-200">
      <HeaderMenu />
      {/* Mobile Bottom Fixed Menu */}
    </Popover>
  );
}
