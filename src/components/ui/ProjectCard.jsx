import { useState } from 'react';
import { LuArrowRight, LuArrowUpRight, LuImages, LuMaximize2 } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { findCaseStudy } from '../../data/caseStudies';
import { trackPointer } from '../../lib/utils';

export function ProjectPlaceholder({ title }) {
  return (
    <div className="project-placeholder" aria-hidden="true">
      <span>{title.charAt(0)}</span>
    </div>
  );
}

export function ProjectCard({ project, onOpen }) {
  const { title, description, date, siteLink, codeLink, images } = project;
  const [imageFailed, setImageFailed] = useState(false);
  const cover = !imageFailed && images[0];
  const study = findCaseStudy(project);

  return (
    <article className="project-card card spotlight" onPointerMove={trackPointer}>
      {/* Mouse convenience; keyboard and screen-reader users use the title button below. */}
      <div className="project-card__media" onClick={onOpen}>
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            decoding="async"
            width="640"
            height="400"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ProjectPlaceholder title={title} />
        )}
        <span className="project-card__zoom" aria-hidden="true">
          <LuMaximize2 /> View details
        </span>
      </div>

      <div className="project-card__body">
        <div className="project-card__meta mono">
          {date && <time>{date}</time>}
          {images.length > 1 && (
            <span>
              <LuImages aria-hidden="true" /> {images.length} screenshots
            </span>
          )}
        </div>

        <h3 className="project-card__title">
          <button type="button" onClick={onOpen}>
            {title}
          </button>
        </h3>

        {description && <p className="project-card__description">{description}</p>}

        {(study || siteLink || codeLink) && (
          <div className="project-card__actions">
            {study && (
              <Link className="btn btn--primary btn--sm" to={`/projects/${study.slug}`}>
                Case study <LuArrowRight aria-hidden="true" />
                <span className="visually-hidden"> of {title}</span>
              </Link>
            )}
            {siteLink && (
              <a
                className={`btn ${study ? 'btn--ghost' : 'btn--primary'} btn--sm`}
                href={siteLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo <LuArrowUpRight className="btn__arrow--diag" aria-hidden="true" />
                <span className="visually-hidden"> of {title} (opens in a new tab)</span>
              </a>
            )}
            {codeLink && (
              <a
                className={`btn btn--ghost btn--sm${study ? ' project-card__icon-btn' : ''}`}
                href={codeLink}
                target="_blank"
                rel="noopener noreferrer"
                title={study ? 'Source code' : undefined}
              >
                <SiGithub aria-hidden="true" /> {!study && 'Code'}
                <span className="visually-hidden">
                  {study ? 'Code' : ''} for {title} (opens in a new tab)
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
