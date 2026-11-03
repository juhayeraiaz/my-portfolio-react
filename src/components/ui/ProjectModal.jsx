import { useEffect, useRef, useState } from 'react';
import { LuArrowUpRight, LuCalendar, LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { cx } from '../../lib/utils';
import { ProjectPlaceholder } from './ProjectCard';
import './ProjectModal.css';

/** Accessible project details dialog built on the native <dialog> element. */
export function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(0);
  const { title, description, date, siteLink, codeLink, images } = project;
  const hasGallery = images.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => dialogRef.current?.close();
  const go = (delta) => setIndex((current) => (current + delta + images.length) % images.length);

  const onKeyDown = (event) => {
    if (!hasGallery) return;
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };

  return (
    // Clicking the backdrop (the dialog itself, outside the panel) closes it.
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div className="modal__panel">
        <button type="button" className="icon-btn modal__close" onClick={close} aria-label="Close project details">
          <LuX aria-hidden="true" />
        </button>

        <div className="gallery">
          <div className="gallery__stage">
            {images.length ? (
              <img
                key={images[index]}
                src={images[index]}
                alt={`${title} — screenshot ${index + 1} of ${images.length}`}
                decoding="async"
              />
            ) : (
              <ProjectPlaceholder title={title} />
            )}
            {hasGallery && (
              <>
                <button
                  type="button"
                  className="gallery__nav gallery__nav--prev"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                >
                  <LuChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="gallery__nav gallery__nav--next"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                >
                  <LuChevronRight aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {hasGallery && (
            <div className="gallery__thumbs">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  className={cx('gallery__thumb', i === index && 'is-active')}
                  onClick={() => setIndex(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal__body">
          {date && (
            <p className="modal__date mono">
              <LuCalendar aria-hidden="true" /> {date}
            </p>
          )}
          <h2 className="modal__title" id="project-modal-title">
            {title}
          </h2>
          {description && <p className="modal__description">{description}</p>}
          {(siteLink || codeLink) && (
            <div className="modal__actions">
              {siteLink && (
                <a className="btn btn--primary" href={siteLink} target="_blank" rel="noopener noreferrer">
                  Visit live site <LuArrowUpRight className="btn__arrow--diag" aria-hidden="true" />
                </a>
              )}
              {codeLink && (
                <a className="btn btn--ghost" href={codeLink} target="_blank" rel="noopener noreferrer">
                  <SiGithub aria-hidden="true" /> View source code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
