import { LuArrowUpRight } from 'react-icons/lu';
import { experience } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Experience.css';

/** Work history timeline. Renders nothing until `experience` in data/portfolio.js has entries. */
export function Experience() {
  if (!experience.length) return null;

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I've worked"
          lead="Teams I've been part of and the impact I've had along the way."
        />

        <ol className="timeline" role="list">
          {experience.map((job, index) => (
            <Reveal as="li" key={`${job.company}-${job.period}`} delay={index * 80} className="timeline__item">
              <div className="timeline__period mono">{job.period}</div>
              <div className="timeline__card card">
                <h3 className="timeline__role">
                  {job.role}{' '}
                  <span className="timeline__company">
                    @{' '}
                    {job.companyUrl ? (
                      <a href={job.companyUrl} target="_blank" rel="noreferrer">
                        {job.company}
                        <LuArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      job.company
                    )}
                  </span>
                </h3>
                {job.location && <p className="timeline__location">{job.location}</p>}
                {job.summary && <p className="timeline__summary">{job.summary}</p>}
                {job.highlights?.length > 0 && (
                  <ul className="timeline__highlights">
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {job.stack?.length > 0 && (
                  <ul className="timeline__stack" role="list" aria-label="Technologies used">
                    {job.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
