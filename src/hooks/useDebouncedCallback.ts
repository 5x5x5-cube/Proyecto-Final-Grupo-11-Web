import { useCallback, useRef } from 'react';

/**
 * Returns a debounced version of the callback that ignores subsequent
 * calls within the specified delay. Useful for preventing double-clicks
 * on buttons that trigger API calls.
 */
export function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay = 500
): T {
  const lastCallRef = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current < delay) return;
      lastCallRef.current = now;
      callback(...args);
    },
    [callback, delay]
  ) as T;
}
