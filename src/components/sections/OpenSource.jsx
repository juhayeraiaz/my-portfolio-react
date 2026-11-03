import { LuArrowUpRight, LuFolderGit2, LuGitFork, LuStar } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { profile } from '../../data/portfolio';
import { LANGUAGE_COLORS } from '../../lib/github';
import { timeAgo, trackPointer } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './OpenSource.css';

const githubUrl = `https://github.com/${profile.githubUsername}`;

function RepoCard({ repo }) {
  const { name, description, url, homepage, language, stars, forks, pushedAt, topics } = repo;
  return (
    <article className="repo card spotlight" onPointerMove={trackPointer}>
      <div className="repo__header">
        <LuFolderGit2 className="repo__icon" aria-hidden="true" />
        {homepage && (
          <a className="repo__demo" href={homepage} target="_blank" rel="noreferrer" aria-label={`Live demo of ${name}`}>
            <LuArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
      <h3 className="repo__name">
        <a href={url} target="_blank" rel="noreferrer">
          {name}
        </a>
      </h3>
      {description && <p className="repo__description">{description}</p>}
      {topics.length > 0 && (
        <ul className="repo__topics" role="list" aria-label="Topics">
          {topics.map((topic) => (
            <li key={topic} className="tag tag--accent">
              {topic}
            </li>
          ))}
        </ul>
      )}
      <div className="repo__footer mono">
        {language && (
          <span>
            <span
              className="repo__lang"
              style={{ background: LANGUAGE_COLORS[language] ?? 'var(--text-subtle)' }}
              aria-hidden="true"
            />
            {language}
          </span>
        )}
        {stars > 0 && (
          <span aria-label={`${stars} stars`}>
            <LuStar aria-hidden="true" /> {stars}
          </span>
        )}
        {forks > 0 && (
          <span aria-label={`${forks} forks`}>
            <LuGitFork aria-hidden="true" /> {forks}
          </span>
        )}
        {pushedAt && <span className="repo__updated">Updated {timeAgo(pushedAt)}</span>}
      </div>
    </article>
  );
}

function RepoSkeleton() {
  return (
    <div className="repo card" aria-hidden="true">
      <span className="skeleton" style={{ width: 28, height: 28 }} />
      <span className="skeleton" style={{ width: '55%', height: 18, marginTop: 18 }} />
      <span className="skeleton" style={{ width: '100%', height: 12, marginTop: 14 }} />
      <span className="skeleton" style={{ width: '75%', height: 12, marginTop: 8 }} />
    </div>
  );
}

export function OpenSource({ repos, total, status }) {
  return (
    <section className="section section--alt" id="open-source" aria-labelledby="open-source-title">
      <div className="container">
        <SectionHeading
          id="open-source-title"
          eyebrow="Open source"
          title="From my GitHub"
          lead="A selection of my public repositories, pulled live from the GitHub API."
        />

        {status === 'error' ? (
          <Reveal className="repos__fallback card">
            <SiGithub aria-hidden="true" />
            <p>GitHub is taking a break right now — you can browse all my repositories directly on my profile.</p>
          </Reveal>
        ) : (
          <ul className="repos__grid" role="list" aria-busy={status === 'loading'}>
            {status === 'loading'
              ? Array.from({ length: 6 }, (_, index) => (
                  <li key={index}>
                    <RepoSkeleton />
                  </li>
                ))
              : repos.map((repo, index) => (
                  <Reveal as="li" key={repo.id} delay={(index % 3) * 80}>
                    <RepoCard repo={repo} />
                  </Reveal>
                ))}
          </ul>
        )}

        <div className="repos__more">
          <a className="btn btn--ghost" href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer">
            <SiGithub aria-hidden="true" />
            {total > 0 ? `View all ${total} repositories` : 'View all repositories'}
            <LuArrowUpRight className="btn__arrow--diag" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
