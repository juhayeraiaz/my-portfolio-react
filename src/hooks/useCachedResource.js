import { useCallback, useEffect, useState } from 'react';
import { readCache, writeCache } from '../lib/utils';

/**
 * Stale-while-revalidate fetch: renders cached data instantly, refreshes it
 * in the background and keeps showing the cache if the network fails.
 *
 * @param {object} options
 * @param {string} options.url
 * @param {string} options.cacheKey   localStorage key
 * @param {(json: unknown) => unknown} options.transform  must be referentially stable
 * @param {number} [options.maxAge]   skip the network while the cache is younger than this (ms)
 * @param {number} [options.timeout]  abort the request after this many ms
 * @param {number} [options.slowAfter] flag the request as slow after this many ms
 */
export function useCachedResource({ url, cacheKey, transform, maxAge = 0, timeout = 60_000, slowAfter = 4_000 }) {
  const [cached] = useState(() => readCache(cacheKey));
  const [data, setData] = useState(() => cached?.data ?? null);
  const [status, setStatus] = useState(() => (cached ? 'success' : 'loading'));
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const isFresh = cached && maxAge > 0 && Date.now() - cached.savedAt < maxAge;
    if (attempt === 0 && isFresh) return undefined;

    let cancelled = false;
    const controller = new AbortController();
    const slowTimer = setTimeout(() => setSlow(true), slowAfter);
    const timeoutTimer = setTimeout(() => controller.abort(), timeout);

    fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
      })
      .then((json) => {
        if (cancelled) return;
        const value = transform(json);
        setData(value);
        setStatus('success');
        writeCache(cacheKey, value);
      })
      .catch(() => {
        if (cancelled) return;
        // Keep showing cached data if we have it; only surface the error otherwise.
        setStatus((previous) => (previous === 'success' ? previous : 'error'));
      })
      .finally(() => {
        clearTimeout(slowTimer);
        clearTimeout(timeoutTimer);
        if (!cancelled) setSlow(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(slowTimer);
      clearTimeout(timeoutTimer);
    };
  }, [attempt, url, cacheKey, transform, maxAge, timeout, slowAfter, cached]);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((count) => count + 1);
  }, []);

  return { data, status, slow, retry };
}
