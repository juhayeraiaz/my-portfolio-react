import { profile } from '../../data/portfolio';
import './Logo.css';

export function Logo({ showName = true }) {
  return (
    <span className="logo">
      <span className="logo__mark" aria-hidden="true">
        {profile.initials}
      </span>
      {showName && <span className="logo__name">{profile.name}</span>}
    </span>
  );
}
