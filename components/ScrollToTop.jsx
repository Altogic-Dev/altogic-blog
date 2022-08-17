import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/solid';

function ScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
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
      {showBtn && (
        <button
          className="fixed z-90 bottom-20 right-8 border-0 w-10 h-10 rounded-full drop-shadow-sm bg-slate-100"
          onClick={() => scrollUp()}
        >
          <ChevronUpIcon className="text-purple-700" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
