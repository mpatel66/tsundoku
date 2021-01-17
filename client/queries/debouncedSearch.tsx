import { useEffect, useState } from 'react';

const useDebounce = (search:string, time = 500): string => {
  const [debounced, setDebounced] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, time);
    return () => {
      // clear timeout on unmount
      clearTimeout(handler);
    };
  },[search, time]);   
  return debounced;
};

export default useDebounce;