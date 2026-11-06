import { Link, useLocation } from 'react-router-dom';

/**
 * Link to a section of the home page. On the home page it is a plain in-page anchor;
 * on any other page (e.g. a case study) it routes back home and scrolls to the section.
 */
export function SectionLink({ id, children, ...props }) {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return (
      <a href={`#${id}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={id === 'top' ? '/' : `/#${id}`} {...props}>
      {children}
    </Link>
  );
}
