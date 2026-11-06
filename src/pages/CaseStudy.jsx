import { useEffect, useState } from 'react';
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuLock } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { CommandPalette } from '../components/ui/CommandPalette';
import { ProjectPlaceholder } from '../components/ui/ProjectCard';
import { caseStudies, getCaseStudy } from '../data/caseStudies';
import { profile } from '../data/portfolio';
import { usePageMeta } from '../hooks/usePageMeta';
import { prettyUrl } from '../lib/utils';
import NotFound from './NotFound';
import './CaseStudy.css';

const SECTIONS = [
  ['overview', 'Overview'],
  ['challenge', 'The challenge'],
  ['approach', 'How I built it'],
  ['features', 'What I built'],
  ['tech', 'Under the hood'],
  ['outcome', 'The result'],
];

function Screenshot({ study }) {
  const [failed, setFailed] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  // Full-page captures are taller than the frame: let visitors scroll through them.
  const onLoad = (event) => {
    const frame = event.currentTarget.parentElement;
    setScrollable(frame.scrollHeight > frame.clientHeight + 4);
  };

  return (
    <figure className="case-shot card">
      <div className="case-shot__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p className="case-shot__url mono">{study.liveUrl ? prettyUrl(study.liveUrl) : study.title}</p>
      </div>
      {study.image && !failed ? (
        <div
          className="case-shot__viewport"
          tabIndex={scrollable ? 0 : undefined}
          role={scrollable ? 'region' : undefined}
          aria-label={scrollable ? `${study.title} full-page screenshot, scrollable` : undefined}
        >
          <img
            src={study.image}
            alt={`${study.title} website screenshot`}
            decoding="async"
            onLoad={onLoad}
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div className="case-shot__placeholder">
          <ProjectPlaceholder title={study.title} />
        </div>
      )}
      {scrollable && !failed && (
        <figcaption className="case-shot__hint mono">Scroll inside the frame to explore the full page</figcaption>
      )}
    </figure>
  );
}

function Pager({ index }) {
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  return (
    <nav className="case-pager" aria-label="More case studies">
      <Link to={`/projects/${prev.slug}`} className="case-pager__link card">
        <span className="case-pager__label mono">
          <LuArrowLeft aria-hidden="true" /> Previous
        </span>
        <span className="case-pager__title">{prev.title}</span>
        <span className="case-pager__kind">{prev.kind}</span>
      </Link>
      <Link to={`/projects/${next.slug}`} className="case-pager__link case-pager__link--next card">
        <span className="case-pager__label mono">
          Next <LuArrowRight aria-hidden="true" />
        </span>
        <span className="case-pager__title">{next.title}</span>
        <span className="case-pager__kind">{next.kind}</span>
      </Link>
    </nav>
  );
}

function CaseStudyPage({ study }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const index = caseStudies.indexOf(study);

  usePageMeta({
    title: `${study.title} case study — ${profile.name}`,
    description: study.summary,
    path: `/projects/${study.slug}`,
  });

  // A new case study starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [study.slug]);

  // ⌘K / Ctrl+K opens the command menu here too.
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openPalette = () => setPaletteOpen(true);

  return (
    <>
      <Navbar onOpenPalette={openPalette} />
      <main id="main" tabIndex={-1} className="case">
        <article aria-labelledby="case-title">
          <header className="case-hero">
            <div className="container">
              <Link to="/#projects" className="case-back">
                <LuArrowLeft aria-hidden="true" /> All projects
              </Link>
              <p className="eyebrow">Case study · {study.kind}</p>
              <h1 className="case-title" id="case-title">
                {study.title}
              </h1>
              <p className="case-summary">{study.summary}</p>

              <dl className="case-meta">
                <div>
                  <dt className="mono">Role</dt>
                  <dd>{study.role}</dd>
                </div>
                <div>
                  <dt className="mono">Type</dt>
                  <dd>{study.type}</dd>
                </div>
                <div>
                  <dt className="mono">Year</dt>
                  <dd>{study.year}</dd>
                </div>
                <div>
                  <dt className="mono">Status</dt>
                  <dd>
                    <span className="case-status" data-live={study.status === 'Live' || undefined}>
                      {study.status}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="case-actions">
                {study.liveUrl && (
                  <a className="btn btn--primary" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                    {study.liveLabel ?? 'Visit live site'} <LuArrowUpRight aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
                {study.codeUrl && (
                  <a className="btn btn--ghost" href={study.codeUrl} target="_blank" rel="noopener noreferrer">
                    <SiGithub aria-hidden="true" /> {study.apiUrl ? 'Front-end code' : 'Source code'}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
                {study.apiUrl && (
                  <a className="btn btn--ghost" href={study.apiUrl} target="_blank" rel="noopener noreferrer">
                    <SiGithub aria-hidden="true" /> API code
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
                {study.codeNote && (
                  <p className="case-code-note">
                    <LuLock aria-hidden="true" /> {study.codeNote}
                  </p>
                )}
              </div>
              {study.note && <p className="case-disclaimer">{study.note}</p>}
            </div>
          </header>

          <div className="container">
            <Screenshot study={study} />
          </div>

          <div className="container case-layout">
            <aside className="case-aside">
              <div className="case-aside__block">
                <h2 className="case-aside__heading mono">Built with</h2>
                <ul className="case-stack" role="list">
                  {study.stack.map((tool) => (
                    <li key={tool} className="tag">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <nav className="case-aside__block case-toc" aria-label="On this page">
                <h2 className="case-aside__heading mono">On this page</h2>
                <ol role="list">
                  {SECTIONS.map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`}>{label}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="case-content">
              <section id="overview" className="case-section">
                <h2>Overview</h2>
                <p>{study.overview}</p>
              </section>

              <section id="challenge" className="case-section">
                <h2>The challenge</h2>
                <p>{study.challenge}</p>
              </section>

              <section id="approach" className="case-section">
                <h2>How I built it</h2>
                <ol className="case-steps" role="list">
                  {study.approach.map((step, i) => (
                    <li key={step}>
                      <span className="case-steps__n mono" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="features" className="case-section">
                <h2>What I built</h2>
                <ul className="case-features" role="list">
                  {study.features.map((feature) => (
                    <li key={feature.title} className="case-feature card">
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="tech" className="case-section">
                <h2>Under the hood</h2>
                <ul className="case-list" role="list">
                  {study.technical.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="outcome" className="case-section">
                <h2>The result</h2>
                <p className="case-outcome">{study.outcome}</p>
              </section>
            </div>
          </div>

          <div className="container">
            <Pager index={index} />
            <section className="case-cta card" aria-labelledby="case-cta-title">
              <div>
                <h2 id="case-cta-title">Have a project like this in mind?</h2>
                <p>Tell me what you&apos;re building. I&apos;ll reply with how I&apos;d approach it.</p>
              </div>
              <Link to="/#contact" className="btn btn--primary">
                Let&apos;s talk <LuArrowRight aria-hidden="true" />
              </Link>
            </section>
          </div>
        </article>
      </main>
      <Footer onOpenPalette={openPalette} />
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  if (!study) return <NotFound />;
  // Keyed by slug so moving between case studies resets page state.
  return <CaseStudyPage key={study.slug} study={study} />;
}
