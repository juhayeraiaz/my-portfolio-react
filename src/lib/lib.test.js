import { describe, expect, it } from 'vitest';
import { selectRepos } from './github';
import { formatProjectDate, normalizeProjects, parseProjectDate } from './projects';
import { safeUrl, timeAgo } from './utils';

describe('safeUrl', () => {
  it('accepts http(s) URLs and adds a protocol when missing', () => {
    expect(safeUrl('https://example.com/a')).toBe('https://example.com/a');
    expect(safeUrl('example.com')).toBe('https://example.com/');
  });

  it('rejects unsafe or empty values', () => {
    expect(safeUrl('javascript:alert(1)')).toBe('');
    expect(safeUrl('data:text/html,hi')).toBe('');
    expect(safeUrl('')).toBe('');
    expect(safeUrl(undefined)).toBe('');
  });
});

describe('project dates', () => {
  it('parses the stored "23rd Dec 2024" format', () => {
    expect(parseProjectDate('23rd Dec 2024')).toBe(Date.UTC(2024, 11, 23));
    expect(parseProjectDate('1st January 2023')).toBe(Date.UTC(2023, 0, 1));
  });

  it('formats dates with correct ordinal suffixes', () => {
    expect(formatProjectDate(new Date(2024, 11, 1))).toBe('1st Dec 2024');
    expect(formatProjectDate(new Date(2024, 11, 2))).toBe('2nd Dec 2024');
    expect(formatProjectDate(new Date(2024, 11, 3))).toBe('3rd Dec 2024');
    expect(formatProjectDate(new Date(2024, 11, 11))).toBe('11th Dec 2024');
    expect(formatProjectDate(new Date(2024, 11, 22))).toBe('22nd Dec 2024');
  });
});

describe('normalizeProjects', () => {
  it('sorts newest first, collects images and sanitises links', () => {
    const result = normalizeProjects([
      { _id: 'a', title: 'Old', date: '5th Jan 2023', img: 'https://i.ibb.co/1.png', siteLink: 'javascript:x' },
      { _id: 'b', title: 'New', date: '23rd Dec 2024', img: 'https://i.ibb.co/2.png', img3: 'https://i.ibb.co/3.png' },
      { title: '' },
      null,
    ]);
    expect(result.map((p) => p.title)).toEqual(['New', 'Old']);
    expect(result[0].images).toEqual(['https://i.ibb.co/2.png', 'https://i.ibb.co/3.png']);
    expect(result[1].siteLink).toBe('');
  });

  it('returns an empty list for unexpected payloads', () => {
    expect(normalizeProjects({ error: true })).toEqual([]);
  });
});

describe('selectRepos', () => {
  const repo = (name, extra = {}) => ({
    id: name,
    name,
    html_url: `https://github.com/u/${name}`,
    pushed_at: '2024-01-01T00:00:00Z',
    ...extra,
  });

  it('skips forks and the profile repo, preferring documented repos', () => {
    const { repos, total } = selectRepos(
      [
        repo('u', { description: 'profile' }),
        repo('forked', { fork: true, description: 'x' }),
        repo('bare', { pushed_at: '2025-01-01T00:00:00Z' }),
        repo('documented', { description: 'Does things', homepage: 'https://demo.dev' }),
      ],
      { username: 'u' },
    );
    expect(total).toBe(4);
    expect(repos.map((r) => r.name)).toEqual(['documented', 'bare']);
    expect(repos[0].homepage).toBe('https://demo.dev/');
  });

  it('honours pinned repositories in order', () => {
    const { repos } = selectRepos([repo('a'), repo('b'), repo('c')], { username: 'u', pinned: ['c', 'a'] });
    expect(repos.map((r) => r.name)).toEqual(['c', 'a']);
  });
});

describe('timeAgo', () => {
  it('formats relative times', () => {
    const now = Date.UTC(2025, 5, 1);
    expect(timeAgo(now - 3 * 24 * 3600 * 1000, now)).toBe('3 days ago');
    expect(timeAgo(now - 400 * 24 * 3600 * 1000, now)).toBe('last year');
    expect(timeAgo('not a date', now)).toBe('');
  });
});

describe('case studies', () => {
  it('has complete, uniquely-slugged entries', async () => {
    const { caseStudies } = await import('../data/caseStudies');
    const slugs = caseStudies.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const study of caseStudies) {
      for (const key of ['title', 'kind', 'type', 'year', 'status', 'role', 'summary', 'overview', 'challenge', 'outcome']) {
        expect(study[key], `${study.slug}.${key}`).toBeTruthy();
      }
      expect(study.approach.length).toBeGreaterThan(1);
      expect(study.features.length).toBeGreaterThan(1);
      expect(study.stack.length).toBeGreaterThan(0);
      expect(safeUrl(study.liveUrl)).toBeTruthy();
    }
  });

  it('matches API projects to case studies by title', async () => {
    const { findCaseStudy, slugify } = await import('../data/caseStudies');
    expect(slugify('Abdullah Shoe – E-commerce Website')).toBe('abdullah-shoe-e-commerce-website');
    expect(findCaseStudy({ title: 'Abdullah Shoe – E-commerce Website' })?.slug).toBe('abdullah-shoe');
    expect(findCaseStudy({ title: 'Rent a House' })?.slug).toBe('rent-a-house');
    expect(findCaseStudy({ title: 'Bikreta Store' })?.slug).toBe('bikreta');
    expect(findCaseStudy({ title: 'Drilledness' })).toBeNull();
    expect(findCaseStudy({ title: 'Something new' })).toBeNull();
  });
});

describe('normalizeProjects links', () => {
  it('drops a "code" link that just repeats the live site', () => {
    const [project] = normalizeProjects([
      { _id: 'a', title: 'Client site', siteLink: 'https://shop.example.com/', codeLink: 'https://shop.example.com' },
    ]);
    expect(project.siteLink).toBe('https://shop.example.com/');
    expect(project.codeLink).toBe('');
  });
});
