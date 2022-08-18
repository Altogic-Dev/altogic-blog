import _ from 'lodash';
import React, { useEffect, useRef } from 'react';

function ListObserver({ onEnd, children }) {
    const myRef = useRef();

  const onTriggered = ([ entry ]) => {
    if(_.isFunction(onEnd) && entry.isIntersecting) onEnd()
  };

  useEffect(() => {
    const options = {
        root: document.querySelector('#end-of-list'),
        rootMargin: '0px',
        threshold: 1.0
      }
    const observer = new IntersectionObserver(onTriggered, options);

    observer.observe(myRef.current);
  }, [])

  return (
    <div>
        {children}
        <div ref={myRef} />
    </div>
  );
}

export default ListObserver;
