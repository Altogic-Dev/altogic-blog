import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';

function ScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <button
        type="button"
        disabled={!showBtn}
        className={`${
          showBtn ? 'opacity-1 ' : 'opacity-0 '
        }transition ease-in-out delay-150 inline-flex items-center justify-center fixed z-90 bottom-20 right-6 border-0 w-12 h-12 rounded-full drop-shadow-sm bg-slate-100 p-4 shadow-md z-[99]`}
        onClick={() => scrollUp()}
      >
        <ChevronUpIcon className="w-5 h-5 text-purple-700  " />
      </button>
    </div>
  );
}

export default ScrollToTop;
