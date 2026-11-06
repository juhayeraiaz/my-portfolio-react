import { LuArrowUp } from 'react-icons/lu';
import { navLinks, profile, socials } from '../../data/portfolio';
import { isMac } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import { SectionLink } from '../ui/SectionLink';
import './Footer.css';

export function Footer({ onOpenPalette }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">{profile.tagline}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <p className="footer__heading mono">Navigate</p>
            <ul role="list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <SectionLink id={link.id}>{link.label}</SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__nav">
            <p className="footer__heading mono">Connect</p>
            <ul role="list">
              {socials.map(({ name, url }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {profile.name}. Designed &amp; built with React and Vite.
          </p>
          <div className="footer__bottom-actions">
            <button type="button" className="footer__hint" onClick={onOpenPalette}>
              Press <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to navigate
            </button>
            <a href="#top" className="icon-btn" aria-label="Back to top">
              <LuArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
