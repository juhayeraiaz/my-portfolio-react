import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/utils';

const supportsObserver = () => typeof IntersectionObserver !== 'undefined';

/** Fades its children in the first time they scroll into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => !supportsObserver());

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
