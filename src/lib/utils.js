/** Joins truthy class names. */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Returns an absolute http(s) URL, or '' for anything unsafe or empty.
 * Guards against `javascript:` links coming from remote data.
 */
export function safeUrl(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed.replace(/^\/+/, '')}`;
  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

/** Strips protocol and trailing slash for display: https://foo.dev/ → foo.dev */
export function prettyUrl(value) {
  return value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

const DIVISIONS = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Infinity, unit: 'year' },
];

/** "3 months ago" style formatting. */
export function timeAgo(input, now = Date.now()) {
  const time = typeof input === 'number' ? input : Date.parse(input);
  if (!Number.isFinite(time)) return '';
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  let duration = (time - now) / 1000;
  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) return formatter.format(Math.round(duration), division.unit);
    duration /= division.amount;
  }
  return '';
}

export function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && 'data' in parsed ? parsed : null;
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    /* quota exceeded or storage disabled — caching is best-effort */
  }
}

/** Updates --mx/--my on the hovered element so CSS can draw a spotlight under the cursor. */
export function trackPointer(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

/** Copies text, falling back to execCommand where the async Clipboard API is unavailable. */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy approach */
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    return ok;
  } catch {
    return false;
  }
}

export const isMac = typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.userAgent);

/** Smooth-scrolls to a section and moves focus there for keyboard and screen-reader users. */
export function scrollToSection(id) {
  const target = id ? document.getElementById(id) : null;
  if (!target) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}
