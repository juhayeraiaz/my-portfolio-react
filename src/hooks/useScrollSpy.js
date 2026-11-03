import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in the middle of the viewport,
 * so the navigation can highlight where the visitor is.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState('');
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A thin band across the middle of the screen decides the active section.
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [key]);

  return active;
}
