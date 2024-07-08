import { useState, useEffect } from 'react';
export function useLocalStorageState(initailState, key) {
  let [value, setValue] = useState(() => {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
