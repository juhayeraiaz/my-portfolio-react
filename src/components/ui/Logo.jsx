import { profile } from '../../data/portfolio';
import './Logo.css';

// "Juhayer Aiaz" -> "juhayer" + "aiaz", set as one handle-style word.
const [firstName = '', ...otherNames] = profile.name.toLowerCase().split(/\s+/);
const lastName = otherNames.join('');

export function Logo({ showName = true }) {
  return (
    <span className="logo">
      {/* An A drawn as a code caret, with a cursor block inside. */}
      <svg className="logo__mark" viewBox="14 12 72 76" aria-hidden="true" focusable="false">
        <polygon points="50,12 86,88 70,88 50,45.8 30,88 14,88" />
        <rect className="logo__cursor" x="43" y="72" width="14" height="16" />
      </svg>
      {showName && (
        <span className="logo__name">
          <span className="visually-hidden">{profile.name}</span>
          <span aria-hidden="true">
            <span className="logo__first">{firstName}</span>
            <span className="logo__last">{lastName}</span>
            <span className="logo__caret" />
          </span>
        </span>
      )}
    </span>
  );
}
