import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LuArrowUpRight, LuMenu, LuSearch, LuX } from 'react-icons/lu';
import { navLinks, profile, socials } from '../../data/portfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cx, isMac } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import { SectionLink } from '../ui/SectionLink';
import { ThemeToggle } from '../ui/ThemeToggle';
import './Navbar.css';

const sectionIds = navLinks.map((link) => link.id);

export function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);
  const toggleRef = useRef(null);
  const active = useScrollSpy(sectionIds);
  const onHome = useLocation().pathname === '/';

  // Scroll state + reading-progress bar (updated outside React for smoothness).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY } = window;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 12);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Lock page scroll and close on Escape / desktop resize while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.classList.add('is-locked');
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia?.('(min-width: 960px)');
    const onChange = (event) => event.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    desktop?.addEventListener('change', onChange);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
      desktop?.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={cx('navbar', (scrolled || menuOpen) && 'navbar--scrolled', menuOpen && 'navbar--open')}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="navbar__inner container" aria-label="Primary">
        <SectionLink id="top" className="navbar__brand" aria-label={`${profile.name} — ${onHome ? 'back to top' : 'home'}`} onClick={closeMenu}>
          <Logo />
        </SectionLink>

        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <SectionLink
                id={link.id}
                className={cx('navbar__link', active === link.id && 'is-active')}
                aria-current={active === link.id ? 'location' : undefined}
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button type="button" className="navbar__search" onClick={onOpenPalette} aria-label="Open command menu">
            <LuSearch aria-hidden="true" />
            <span className="navbar__search-label">Search</span>
            <kbd className="navbar__kbd" aria-hidden="true">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <ThemeToggle />
          <SectionLink id="contact" className="btn btn--primary btn--sm navbar__cta">
            Let&apos;s talk
          </SectionLink>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <div className="container">
          <ul className="mobile-menu__links" role="list">
            {navLinks.map((link, index) => (
              <li key={link.id} style={{ '--i': index }}>
                <SectionLink
                  id={link.id}
                  className={cx('mobile-menu__link', active === link.id && 'is-active')}
                  onClick={closeMenu}
                >
                  <span className="mobile-menu__index mono">0{index + 1}</span>
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__footer">
            <a href={`mailto:${profile.email}`} className="mobile-menu__email">
              {profile.email}
              <LuArrowUpRight aria-hidden="true" />
            </a>
            <ul className="mobile-menu__socials" role="list">
              {socials.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                  <a className="icon-btn" href={url} target="_blank" rel="noreferrer" aria-label={name}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar__progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
