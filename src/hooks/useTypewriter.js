import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Types and deletes each word in turn. Falls back to the first word when the
 * visitor prefers reduced motion.
 */
export function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 35, pause = 1800 } = {}) {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState({ index: 0, text: '', deleting: false });

  useEffect(() => {
    if (reducedMotion || words.length === 0) return undefined;

    const word = words[state.index % words.length];
    let delay = state.deleting ? deleteSpeed : typeSpeed;
    if (!state.deleting && state.text === word) delay = pause;
    if (state.deleting && state.text === '') delay = 350;

    const timer = setTimeout(() => {
      setState((prev) => {
        const current = words[prev.index % words.length];
        if (!prev.deleting && prev.text === current) return { ...prev, deleting: true };
        if (prev.deleting && prev.text === '') return { index: prev.index + 1, text: '', deleting: false };
        const nextLength = prev.text.length + (prev.deleting ? -1 : 1);
        return { ...prev, text: current.slice(0, nextLength) };
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [state, words, reducedMotion, typeSpeed, deleteSpeed, pause]);

  return reducedMotion ? (words[0] ?? '') : state.text;
}
