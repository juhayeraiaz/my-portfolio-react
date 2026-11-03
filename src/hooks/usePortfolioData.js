import { API_URL, pinnedRepos, profile } from '../data/portfolio';
import { selectRepos } from '../lib/github';
import { normalizeProjects } from '../lib/projects';
import { useCachedResource } from './useCachedResource';

const HOUR = 60 * 60 * 1000;

const toRepos = (json) => selectRepos(json, { username: profile.githubUsername, pinned: pinnedRepos });

/** Projects from the portfolio API. The free-tier server can take ~a minute to wake up. */
export function useProjects() {
  const { data, ...rest } = useCachedResource({
    url: `${API_URL}/projects`,
    cacheKey: 'ja:projects:v1',
    transform: normalizeProjects,
    timeout: 90_000,
  });
  return { projects: data ?? [], ...rest };
}

/** Public GitHub repositories (cached for an hour to stay well within API rate limits). */
export function useGitHubRepos() {
  const { data, ...rest } = useCachedResource({
    url: `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=pushed`,
    cacheKey: 'ja:github:v1',
    transform: toRepos,
    maxAge: HOUR,
    timeout: 20_000,
  });
  return { repos: data?.repos ?? [], total: data?.total ?? 0, ...rest };
}
