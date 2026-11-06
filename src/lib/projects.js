import { safeUrl } from './utils';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Parses dates stored by the admin form, e.g. "23rd Dec 2024". */
export function parseProjectDate(value) {
  if (typeof value !== 'string' || !value) return NaN;
  const match = /(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]{3})[a-z]*\.?,?\s+(\d{4})/i.exec(value);
  if (match) {
    const month = MONTHS.indexOf(match[2].toLowerCase());
    if (month !== -1) return Date.UTC(Number(match[3]), month, Number(match[1]));
  }
  return Date.parse(value);
}

const sameUrl = (a, b) => Boolean(a && b) && a.replace(/\/+$/, '') === b.replace(/\/+$/, '');

/** MongoDB ObjectIds embed their creation time in the first 4 bytes. */
function objectIdTime(id) {
  return typeof id === 'string' && /^[a-f\d]{24}$/i.test(id) ? parseInt(id.slice(0, 8), 16) * 1000 : NaN;
}

/** Turns the raw API payload into clean, newest-first project objects. */
export function normalizeProjects(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item.title === 'string' && item.title.trim())
    .map((item, order) => {
      const time = [parseProjectDate(item.date), objectIdTime(item._id)].find(Number.isFinite) ?? 0;
      const siteLink = safeUrl(item.siteLink);
      const codeLink = safeUrl(item.codeLink);
      return {
        id: String(item._id ?? `${item.title}-${order}`),
        title: item.title.trim(),
        description: typeof item.description === 'string' ? item.description.trim() : '',
        siteLink,
        // Client sites often repeat the live URL as "code": don't show a Code button for it.
        codeLink: codeLink && sameUrl(codeLink, siteLink) ? '' : codeLink,
        date: typeof item.date === 'string' ? item.date : '',
        time,
        order,
        images: [item.img, item.img2, item.img3].map(safeUrl).filter(Boolean),
      };
    })
    .sort((a, b) => b.time - a.time || b.order - a.order);
}

function ordinal(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
}

/** Formats dates the way the API stores them, e.g. "23rd Dec 2024". */
export function formatProjectDate(date) {
  return `${ordinal(date.getDate())} ${date.toLocaleString('en', { month: 'short' })} ${date.getFullYear()}`;
}
