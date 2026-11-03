import { useSyncExternalStore } from 'react';

let toasts = [];
let nextId = 0;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

export function dismissToast(id) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

/** Shows a short status message. `tone` is 'success' | 'error' | 'info'. */
export function toast(message, { tone = 'success', duration = 3200 } = {}) {
  const id = ++nextId;
  toasts = [...toasts.slice(-2), { id, message, tone }];
  emit();
  setTimeout(() => dismissToast(id), duration);
  return id;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useToasts() {
  return useSyncExternalStore(
    subscribe,
    () => toasts,
    () => toasts,
  );
}
