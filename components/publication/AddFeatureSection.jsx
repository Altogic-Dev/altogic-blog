/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Sections from '@/components/Sections';
import { PlusIcon } from '@heroicons/react/outline';
import Button from '../basic/button';

export default function AddFeatureSection() {
  const [sectionList, setSectionList] = useState([
    <Sections key={0} index={0} />,
  ]);

  return (
    <div className="mb-20">
      <div className="relative max-w-screen-xl mx-auto mb-6">
        <div
          className="absolute inset-0 flex items-center px-4 lg:px-8"
          aria-hidden="true"
        >
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <Button
            onClick={() => {
              setSectionList([
                ...sectionList,
                <Sections
                  key={sectionList.length}
                  index={sectionList.length}
                  setSectionList={setSectionList}
                />,
              ]);
            }}
            className="inline-flex items-center justify-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <PlusIcon className="w-5 h-5 text-slate-500" />
            Add Section
          </Button>
        </div>
      </div>
      <div>
        {sectionList.map((section, index) => (
          <div className="mb-16" key={index}>
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}
