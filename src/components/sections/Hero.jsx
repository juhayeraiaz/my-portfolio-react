import { LuArrowRight, LuFileText, LuGitBranch, LuMapPin, LuSparkles } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { profile, skillGroups, socials } from '../../data/portfolio';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';

const allSkills = skillGroups.flatMap((group) => group.skills);

function CodeWindow() {
  return (
    <figure className="code-window" aria-label="A JavaScript object describing Juhayer">
      <div className="code-window__bar">
        <span className="code-window__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="code-window__tab mono">
          <span className="code-window__lang">JS</span> engineer.js
        </span>
      </div>
      <pre className="code-window__code">
        <code>
          <span className="line">
            <span className="tok-c">{'// Hello there 👋'}</span>
          </span>
          <span className="line">
            <span className="tok-k">const</span> engineer = {'{'}
          </span>
          <span className="line">
            {'  '}
            <span className="tok-p">name</span>: <span className="tok-s">&apos;{profile.name}&apos;</span>,
          </span>
          <span className="line">
            {'  '}
            <span className="tok-p">role</span>: <span className="tok-s">&apos;{profile.roles[0]}&apos;</span>,
          </span>
          <span className="line">
            {'  '}
            <span className="tok-p">location</span>: <span className="tok-s">&apos;{profile.location}&apos;</span>,
          </span>
          <span className="line">
            {'  '}
            <span className="tok-p">stack</span>: [<span className="tok-s">&apos;React&apos;</span>,{' '}
            <span className="tok-s">&apos;Node.js&apos;</span>, <span className="tok-s">&apos;MongoDB&apos;</span>],
          </span>
          <span className="line">
            {'  '}
            <span className="tok-p">values</span>: [<span className="tok-s">&apos;clean code&apos;</span>,{' '}
            <span className="tok-s">&apos;great UX&apos;</span>],
          </span>
          <span className="line">
            {'  '}
            <span className="tok-p">openToWork</span>: <span className="tok-b">{String(Boolean(profile.availability))}</span>,
          </span>
          <span className="line">{'};'}</span>
          <span className="line"> </span>
          <span className="line">
            <span className="tok-k">export default</span> engineer;<span className="code-window__cursor" aria-hidden="true" />
          </span>
        </code>
      </pre>
      <figcaption className="code-window__status mono" aria-hidden="true">
        <span>
          <LuGitBranch /> main
        </span>
        <span>JavaScript</span>
        <span>UTF-8</span>
      </figcaption>
    </figure>
  );
}

function TechMarquee() {
  const items = [...allSkills, ...allSkills];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map(({ name, icon: Icon }, index) => (
          <span className="marquee__item" key={`${name}-${index}`}>
            <Icon />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const typedRole = useTypewriter(profile.roles);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          {profile.availability && (
            <p className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              {profile.availability}
            </p>
          )}

          <h1 className="hero__title" id="hero-title">
            <span className="hero__greeting">
              Hi, I&apos;m <span className="hero__name">{profile.name}</span>
            </span>
            <span className="hero__role">
              <span className="visually-hidden">{profile.roles[0]}</span>
              <span className="gradient-text" aria-hidden="true">
                {typedRole}
              </span>
              <span className="hero__caret" aria-hidden="true" />
            </span>
          </h1>

          <p className="hero__lead">{profile.summary}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View my work <LuArrowRight className="btn__arrow" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get in touch
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn btn--ghost" target="_blank" rel="noreferrer">
                <LuFileText aria-hidden="true" /> Résumé
              </a>
            )}
          </div>

          <div className="hero__meta">
            <span className="hero__location">
              <LuMapPin aria-hidden="true" /> Based in {profile.location}
            </span>
            <span className="hero__divider" aria-hidden="true" />
            <ul className="hero__socials" role="list">
              {socials.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noreferrer" aria-label={name} title={name}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__visual">
          <CodeWindow />
          <a
            className="hero__chip hero__chip--top"
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub aria-hidden="true" /> @{profile.githubUsername}
          </a>
          <span className="hero__chip hero__chip--bottom">
            <LuSparkles aria-hidden="true" /> Building for the web since {profile.since}
          </span>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
