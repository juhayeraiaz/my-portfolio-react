import { cx } from '../../lib/utils';
import { Reveal } from './Reveal';

export function SectionHeading({ id, eyebrow, title, lead, align = 'left' }) {
  return (
    <Reveal className={cx('section-heading', align === 'center' && 'section-heading--center')}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}
