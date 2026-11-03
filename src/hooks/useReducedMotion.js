import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback) {
  if (typeof window.matchMedia !== 'function') return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches;
}

/** True when the visitor has asked the OS to minimise motion. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
