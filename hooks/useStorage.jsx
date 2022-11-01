import { useState, useEffect } from 'react';

const useStorage = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined')
      setValue(JSON.parse(localStorage.getItem('session')));
  }, []);

  return value;
};

export default useStorage;
