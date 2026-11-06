import { useEffect } from 'react';

function canonicalOrigin() {
  const href = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  try {
    return new URL(href).origin;
  } catch {
    return window.location.origin;
  }
}

/**
 * Sets the page title, description, canonical URL and social tags while the page is
 * mounted, then restores the originals. Keeps sub-pages from inheriting the home page's
 * canonical URL (which would tell search engines they are duplicates of it).
 */
export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    const url = `${canonicalOrigin()}${path}`;
    const targets = [
      ['meta[name="description"]', 'content', description],
      ['link[rel="canonical"]', 'href', url],
      ['meta[property="og:url"]', 'content', url],
      ['meta[property="og:title"]', 'content', title],
      ['meta[property="og:description"]', 'content', description],
      ['meta[name="twitter:title"]', 'content', title],
      ['meta[name="twitter:description"]', 'content', description],
    ];

    const previousTitle = document.title;
    document.title = title;
    const restore = targets.map(([selector, attribute, value]) => {
      const element = document.head.querySelector(selector);
      if (!element || !value) return null;
      const previous = element.getAttribute(attribute);
      element.setAttribute(attribute, value);
      return () => element.setAttribute(attribute, previous);
    });

    return () => {
      document.title = previousTitle;
      restore.forEach((undo) => undo?.());
    };
  }, [title, description, path]);
}
