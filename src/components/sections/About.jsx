import { about, profile, services, skillGroups } from '../../data/portfolio';
import { trackPointer } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './About.css';

const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0);

function Stat({ value, label, loading }) {
  return (
    <div className="stat card">
      {loading ? (
        <span className="stat__value skeleton" style={{ width: '3ch', height: '1em' }} />
      ) : (
        <span className="stat__value">{value}</span>
      )}
      <span className="stat__label">{label}</span>
    </div>
  );
}

export function About({ projects, github }) {
  const stats = [
    { key: 'since', value: profile.since, label: 'Building for the web since' },
    projects.status !== 'error' && {
      key: 'projects',
      value: projects.count,
      loading: projects.status === 'loading',
      label: 'Featured projects shipped',
    },
    github.status !== 'error' && {
      key: 'repos',
      value: github.total,
      loading: github.status === 'loading',
      label: 'Public repositories on GitHub',
    },
    { key: 'skills', value: skillCount, label: 'Technologies in my toolkit' },
  ].filter(Boolean);

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          eyebrow="About me"
          title={
            <>
              Engineering products with care, <span className="gradient-text">from interface to API.</span>
            </>
          }
        />

        <div className="about__grid">
          <Reveal className="about__text">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className="about__stats" delay={120}>
            {stats.map(({ key, ...stat }) => (
              <Stat key={key} {...stat} />
            ))}
          </Reveal>
        </div>

        <div className="services">
          <Reveal as="h3" className="services__title">
            What I do
          </Reveal>
          <ul className="services__list" role="list">
            {services.map(({ icon: Icon, title, description }, index) => (
              <Reveal as="li" key={title} delay={index * 90} className="service card spotlight" onPointerMove={trackPointer}>
                <span className="service__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h4 className="service__name">{title}</h4>
                <p className="service__description">{description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
