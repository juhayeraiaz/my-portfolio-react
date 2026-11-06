import { useState } from 'react';
import { LuChevronDown, LuCircleAlert, LuLoaderCircle, LuRefreshCw } from 'react-icons/lu';
import { profile } from '../../data/portfolio';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectModal } from '../ui/ProjectModal';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Projects.css';

const INITIAL_COUNT = 6;

function SkeletonCard() {
  return (
    <div className="project-card project-card--skeleton card" aria-hidden="true">
      <div className="project-card__media skeleton" />
      <div className="project-card__body">
        <span className="skeleton" style={{ width: '35%', height: 12 }} />
        <span className="skeleton" style={{ width: '70%', height: 22, marginTop: 6 }} />
        <span className="skeleton" style={{ width: '100%', height: 12, marginTop: 10 }} />
        <span className="skeleton" style={{ width: '85%', height: 12 }} />
      </div>
    </div>
  );
}

export function Projects({ projects, status, slow, retry }) {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  const toggleShowAll = () => {
    if (showAll) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    setShowAll((value) => !value);
  };

  return (
    <section className="section" id="projects" aria-labelledby="projects-title" aria-busy={status === 'loading'}>
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Selected work"
          lead="Recent projects I've designed and built end to end. Read the case study behind each one, or open a project for screenshots and links."
        />

        {status === 'loading' && (
          <>
            {slow && (
              <p className="projects__notice" role="status">
                <LuLoaderCircle className="spin" aria-hidden="true" />
                Waking up the project server — free-tier hosting can take up to a minute on the first visit.
              </p>
            )}
            <div className="projects__grid">
              {Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </>
        )}

        {status === 'error' && (
          <Reveal className="projects__error card" role="alert">
            <LuCircleAlert className="projects__error-icon" aria-hidden="true" />
            <div>
              <h3>Couldn&apos;t load projects right now</h3>
              <p>
                The project server didn&apos;t respond. Try again in a moment, or browse my open-source work on GitHub
                in the meantime.
              </p>
              <div className="projects__error-actions">
                <button type="button" className="btn btn--primary btn--sm" onClick={retry}>
                  <LuRefreshCw aria-hidden="true" /> Try again
                </button>
                <a
                  className="btn btn--ghost btn--sm"
                  href={`https://github.com/${profile.githubUsername}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Browse GitHub
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {status === 'success' && projects.length === 0 && (
          <p className="projects__empty">New projects are on the way — check back soon.</p>
        )}

        {status === 'success' && projects.length > 0 && (
          <>
            <ul className="projects__grid" role="list">
              {visible.map((project, index) => (
                <Reveal as="li" key={project.id} delay={(index % 3) * 90}>
                  <ProjectCard project={project} onOpen={() => setSelected(project)} />
                </Reveal>
              ))}
            </ul>

            {hiddenCount > 0 && (
              <div className="projects__more">
                <button type="button" className="btn btn--ghost" onClick={toggleShowAll} aria-expanded={showAll}>
                  {showAll ? 'Show fewer projects' : `Show all ${projects.length} projects`}
                  <LuChevronDown
                    aria-hidden="true"
                    style={{ transform: showAll ? 'rotate(180deg)' : undefined, transition: 'transform 200ms' }}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
