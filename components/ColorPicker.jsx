import { SketchPicker } from 'react-color';
import { Popover } from '@headlessui/react';

function ColorPicker({ color, onChangeComplete }) {
  return (
    <Popover.Panel className="absolute z-10">
      <SketchPicker  color={color} onChange={onChangeComplete} />
    </Popover.Panel>
  );
}

export default ColorPicker;
