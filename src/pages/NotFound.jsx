import { LuArrowLeft } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { profile } from '../data/portfolio';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './NotFound.css';

export default function NotFound() {
  useDocumentTitle(`Page not found — ${profile.name}`);

  return (
    <main className="not-found">
      <meta name="robots" content="noindex" />
      <div className="not-found__inner">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
        <p className="not-found__code mono gradient-text">404</p>
        <h1>This page wandered off.</h1>
        <p className="not-found__text">The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
        <Link to="/" className="btn btn--primary">
          <LuArrowLeft aria-hidden="true" /> Back to home
        </Link>
      </div>
    </main>
  );
}
