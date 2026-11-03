import { useState } from 'react';
import { LuArrowUpRight, LuImages, LuMaximize2 } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
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

        {(siteLink || codeLink) && (
          <div className="project-card__actions">
            {siteLink && (
              <a className="btn btn--primary btn--sm" href={siteLink} target="_blank" rel="noopener noreferrer">
                Live demo <LuArrowUpRight className="btn__arrow--diag" aria-hidden="true" />
                <span className="visually-hidden"> of {title} (opens in a new tab)</span>
              </a>
            )}
            {codeLink && (
              <a className="btn btn--ghost btn--sm" href={codeLink} target="_blank" rel="noopener noreferrer">
                <SiGithub aria-hidden="true" /> Code
                <span className="visually-hidden"> for {title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
