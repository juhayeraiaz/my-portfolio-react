import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';
const THEME_COLORS = { dark: '#07090c', light: '#f7f9fb' };
const listeners = new Set();

function readTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', THEME_COLORS[theme]);
  });
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
  listeners.forEach((listener) => listener());
}

export function setTheme(theme) {
  const reduceMotion =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof document.startViewTransition === 'function' && !reduceMotion) {
    document.startViewTransition(() => applyTheme(theme));
  } else {
    applyTheme(theme);
  }
}

/** Global light/dark theme shared by every component, persisted to localStorage. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark');
  const toggleTheme = useCallback(() => setTheme(readTheme() === 'dark' ? 'light' : 'dark'), []);
  return { theme, setTheme, toggleTheme };
}
