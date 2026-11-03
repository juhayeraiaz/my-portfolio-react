import { useEffect, useState } from 'react';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Experience } from '../components/sections/Experience';
import { Hero } from '../components/sections/Hero';
import { OpenSource } from '../components/sections/OpenSource';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { CommandPalette } from '../components/ui/CommandPalette';
import { useGitHubRepos, useProjects } from '../hooks/usePortfolioData';

const isTypingTarget = (target) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const projects = useProjects();
  const github = useGitHubRepos();

  // ⌘K / Ctrl+K toggles the command menu; "/" opens it when not typing.
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Honour deep links like /#contact once the sections have rendered.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, []);

  const openPalette = () => setPaletteOpen(true);

  return (
    <>
      <Navbar onOpenPalette={openPalette} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About
          projects={{ status: projects.status, count: projects.projects.length }}
          github={{ status: github.status, total: github.total }}
        />
        <Skills />
        <Experience />
        <Projects {...projects} />
        <OpenSource repos={github.repos} total={github.total} status={github.status} />
        <Contact />
      </main>
      <Footer onOpenPalette={openPalette} />
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </>
  );
}
