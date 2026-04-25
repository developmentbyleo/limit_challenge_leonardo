'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_DEBOUNCE_TIME } from '../constants';

export function useDebounce<T>(value: T, delay: number = DEFAULT_DEBOUNCE_TIME): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
