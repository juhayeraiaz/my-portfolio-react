import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { LuArrowUp, LuCode, LuCopy, LuCornerDownLeft, LuFileText, LuHash, LuMail, LuMoon, LuSearch, LuSun } from 'react-icons/lu';
import { navLinks, profile, socials } from '../../data/portfolio';
import { useTheme } from '../../hooks/useTheme';
import { toast } from '../../lib/toast';
import { copyToClipboard, cx, scrollToSection } from '../../lib/utils';
import './CommandPalette.css';

function useCommands() {
  const { theme, toggleTheme } = useTheme();

  return useMemo(
    () => [
      ...navLinks.map((link) => ({
        id: `go-${link.id}`,
        group: 'Navigate',
        label: link.label,
        hint: 'Jump to section',
        icon: LuHash,
        run: () => scrollToSection(link.id),
      })),
      {
        id: 'go-top',
        group: 'Navigate',
        label: 'Back to top',
        icon: LuArrowUp,
        run: () => scrollToSection(''),
      },
      {
        id: 'theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        keywords: 'theme dark light mode appearance',
        icon: theme === 'dark' ? LuSun : LuMoon,
        run: toggleTheme,
      },
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        keywords: 'contact mail',
        icon: LuCopy,
        run: async () => {
          const ok = await copyToClipboard(profile.email);
          toast(ok ? 'Email address copied to clipboard' : `Couldn't copy — it's ${profile.email}`, {
            tone: ok ? 'success' : 'error',
          });
        },
      },
      {
        id: 'send-email',
        group: 'Actions',
        label: 'Send an email',
        keywords: 'contact mail hire',
        icon: LuMail,
        run: () => window.location.assign(`mailto:${profile.email}`),
      },
      ...(profile.resumeUrl
        ? [
            {
              id: 'resume',
              group: 'Actions',
              label: 'Open résumé',
              keywords: 'cv resume',
              icon: LuFileText,
              run: () => window.open(profile.resumeUrl, '_blank', 'noopener'),
            },
          ]
        : []),
      ...socials.map((social) => ({
        id: `social-${social.name}`,
        group: 'Links',
        label: social.name,
        hint: social.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
        keywords: 'social profile',
        icon: social.icon,
        run: () => window.open(social.url, '_blank', 'noopener'),
      })),
      {
        id: 'source',
        group: 'Links',
        label: 'View source code of this site',
        keywords: 'github repository code',
        icon: LuCode,
        run: () => window.open(`https://github.com/${profile.githubUsername}/my-portfolio-react`, '_blank', 'noopener'),
      },
    ],
    [theme, toggleTheme],
  );
}

function matches(command, query) {
  const haystack = `${command.label} ${command.group} ${command.keywords ?? ''} ${command.hint ?? ''}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/** ⌘K / Ctrl+K command menu for keyboard-first navigation. Mount it only while open. */
export function CommandPalette({ onClose }) {
  const dialogRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const commands = useCommands();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(() => commands.filter((command) => matches(command, query)), [commands, query]);
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex]);

  const execute = (command) => {
    dialogRef.current?.close();
    // Let the dialog close (and release scroll lock) before navigating.
    requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(results.length - 1);
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      execute(results[activeIndex]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Command menu"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
    >
      <div className="palette__panel">
        <div className="palette__search">
          <LuSearch aria-hidden="true" />
          <input
            autoFocus
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined}
            placeholder="Type a command or search…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            spellCheck="false"
          />
          <kbd className="palette__esc">Esc</kbd>
        </div>

        <ul className="palette__list" id={listId} role="listbox" aria-label="Commands" ref={listRef}>
          {results.length === 0 && <li className="palette__empty">No results for “{query}”</li>}
          {results.map((command, index) => {
            const Icon = command.icon;
            const showGroup = index === 0 || results[index - 1].group !== command.group;
            return (
              <li key={command.id} role="presentation">
                {showGroup && (
                  <div className="palette__group" aria-hidden="true">
                    {command.group}
                  </div>
                )}
                <div
                  id={`${listId}-${command.id}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cx('palette__item', index === activeIndex && 'is-active')}
                  onMouseMove={() => index !== activeIndex && setActive(index)}
                  onClick={() => execute(command)}
                >
                  <Icon className="palette__icon" aria-hidden="true" />
                  <span className="palette__label">{command.label}</span>
                  {command.hint && <span className="palette__hint">{command.hint}</span>}
                  <LuCornerDownLeft className="palette__enter" aria-hidden="true" />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="palette__footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </dialog>
  );
}
