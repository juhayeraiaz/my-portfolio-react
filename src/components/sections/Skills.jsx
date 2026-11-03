import { skillGroups } from '../../data/portfolio';
import { trackPointer } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Skills.css';

export function Skills() {
  return (
    <section className="section section--alt" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="My toolkit"
          lead="The languages, frameworks and platforms I use to design, build and ship production-ready web applications."
        />

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 100}
              className="skill-group card spotlight"
              onPointerMove={trackPointer}
            >
              <div className="skill-group__header">
                <h3 className="skill-group__title">{group.title}</h3>
                <span className="skill-group__count mono">{String(group.skills.length).padStart(2, '0')}</span>
              </div>
              <ul className="skill-group__list" role="list">
                {group.skills.map(({ name, icon: Icon, color }) => (
                  <li key={name} className="skill" style={color ? { '--brand': color } : undefined}>
                    <Icon className="skill__icon" aria-hidden="true" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
