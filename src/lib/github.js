import { safeUrl } from './utils';

export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Java: '#b07219',
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Vue: '#41b883',
};

const byPushedDesc = (a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at);

/**
 * Picks the repositories worth showcasing. Pinned names win; otherwise repos
 * with a description, live demo or topics are preferred, newest first.
 */
export function selectRepos(raw, { username, pinned = [], limit = 6 } = {}) {
  if (!Array.isArray(raw)) return { repos: [], total: 0 };
  const owned = raw.filter(
    (repo) => repo && !repo.fork && !repo.archived && repo.name?.toLowerCase() !== username?.toLowerCase(),
  );

  let picked;
  if (pinned.length) {
    picked = pinned
      .map((name) => owned.find((repo) => repo.name.toLowerCase() === name.toLowerCase()))
      .filter(Boolean);
  } else {
    const isShowcase = (repo) => Boolean(repo.description || repo.homepage || repo.topics?.length);
    picked = [...owned.filter(isShowcase).sort(byPushedDesc), ...owned.filter((r) => !isShowcase(r)).sort(byPushedDesc)];
  }

  return {
    total: raw.length,
    repos: picked.slice(0, limit).map((repo) => {
      const homepage = safeUrl(repo.homepage ?? '');
      return {
        id: repo.id,
        name: repo.name,
        description: repo.description ?? '',
        url: repo.html_url,
        homepage: homepage && homepage !== safeUrl(repo.html_url) ? homepage : '',
        language: repo.language ?? '',
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        pushedAt: repo.pushed_at,
        topics: Array.isArray(repo.topics) ? repo.topics.slice(0, 4) : [],
      };
    }),
  };
}
