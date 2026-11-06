import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { profile } from './data/portfolio';

const PROJECTS = [
  {
    _id: '6769a1b2c3d4e5f6a7b8c9d0',
    title: 'Bikreta Store',
    description: 'A full-stack e-commerce store with cart, checkout and an admin dashboard.',
    siteLink: 'https://bikretabd.web.app/',
    codeLink: 'https://github.com/juhayeraiaz/bikreta-client',
    date: '23rd Dec 2024',
    img: 'https://i.ibb.co/bikreta-1.png',
    img2: 'https://i.ibb.co/bikreta-2.png',
  },
  {
    _id: '65f0a1b2c3d4e5f6a7b8c9d1',
    title: 'Drilled',
    description: 'Tools marketplace with Firebase authentication.',
    siteLink: 'https://drilled-74880.web.app/',
    codeLink: 'https://github.com/juhayeraiaz/drilled-client',
    date: '27th Mar 2024',
    img: 'https://i.ibb.co/drilled.png',
  },
];

const REPOS = [
  {
    id: 1,
    name: 'bikreta-client',
    description: 'Bikreta Ecommerce web site',
    html_url: 'https://github.com/juhayeraiaz/bikreta-client',
    homepage: 'https://bikretabd.web.app/',
    language: 'JavaScript',
    stargazers_count: 3,
    forks_count: 0,
    pushed_at: '2024-12-23T19:25:17Z',
    topics: ['react'],
  },
  {
    id: 2,
    name: 'some-fork',
    fork: true,
    html_url: 'https://github.com/juhayeraiaz/some-fork',
    pushed_at: '2025-01-01T00:00:00Z',
  },
];

const json = (body, ok = true) => Promise.resolve({ ok, status: ok ? 200 : 500, json: () => Promise.resolve(body) });

/** Routes fetch calls to fixtures; individual tests can override any endpoint. */
function mockFetch(overrides = {}) {
  const fetchMock = vi.fn((url) => {
    const href = String(url);
    if (href.includes('/projects')) return overrides.projects ? overrides.projects() : json(PROJECTS);
    if (href.includes('api.github.com')) return overrides.github ? overrides.github() : json(REPOS);
    if (href.includes('formsubmit.co'))
      return overrides.contact ? overrides.contact() : json({ success: 'true', message: 'ok' });
    return Promise.reject(new Error(`Unexpected fetch: ${href}`));
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function renderAt(path = '/') {
  window.history.replaceState(null, '', path);
  return render(<App />);
}

describe('home page', () => {
  it('renders the hero, navigation and every main section', async () => {
    mockFetch();
    renderAt('/');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`Hi, I'm ${profile.name}`);
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    for (const label of ['About', 'Skills', 'Projects', 'Open Source', 'Contact']) {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', expect.stringMatching(/^#/));
    }
    for (const name of [/engineering products/i, /my toolkit/i, /selected work/i, /from my github/i, /build something/i]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    // Experience is hidden until the data file has entries.
    expect(screen.queryByRole('heading', { name: /where i've worked/i })).not.toBeInTheDocument();

    await screen.findByRole('button', { name: 'Bikreta Store' });
  });

  it('shows projects newest first and opens a details dialog with a gallery', async () => {
    mockFetch();
    renderAt('/');

    const titles = await screen.findAllByRole('button', { name: /^(Bikreta Store|Drilled)$/ });
    expect(titles.map((el) => el.textContent)).toEqual(['Bikreta Store', 'Drilled']);

    await userEvent.click(titles[0]);
    const dialog = screen.getByRole('dialog', { name: 'Bikreta Store' });
    expect(within(dialog).getByRole('img', { name: /screenshot 1 of 2/i })).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Next screenshot' }));
    expect(within(dialog).getByRole('img', { name: /screenshot 2 of 2/i })).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: /visit live site/i })).toHaveAttribute(
      'href',
      'https://bikretabd.web.app/',
    );

    await userEvent.click(within(dialog).getByRole('button', { name: /close project details/i }));
    expect(screen.queryByRole('dialog', { name: 'Bikreta Store' })).not.toBeInTheDocument();
  });

  it('shows live GitHub repositories, skipping forks', async () => {
    mockFetch();
    renderAt('/');

    expect(await screen.findByRole('link', { name: 'bikreta-client' })).toHaveAttribute(
      'href',
      'https://github.com/juhayeraiaz/bikreta-client',
    );
    expect(screen.queryByRole('link', { name: 'some-fork' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view all 2 repositories/i })).toBeInTheDocument();
  });

  it('lets visitors retry when the projects API fails', async () => {
    let fail = true;
    mockFetch({ projects: () => (fail ? Promise.reject(new Error('offline')) : json(PROJECTS)) });
    renderAt('/');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/couldn't load projects/i);

    fail = false;
    await userEvent.click(within(alert).getByRole('button', { name: /try again/i }));
    expect(await screen.findByRole('button', { name: 'Bikreta Store' })).toBeInTheDocument();
  });

  it('renders cached projects immediately while revalidating', async () => {
    localStorage.setItem('ja:projects:v1', JSON.stringify({ data: [{ ...PROJECTS[1], id: 'cached', images: [] }], savedAt: 1 }));
    mockFetch({ projects: () => new Promise(() => {}) });
    renderAt('/');
    expect(screen.getByRole('button', { name: 'Drilled' })).toBeInTheDocument();
  });
});

describe('theme', () => {
  it('toggles between dark and light and remembers the choice', async () => {
    mockFetch();
    renderAt('/');

    await userEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });
});

describe('command palette', () => {
  it('opens with Ctrl+K, filters commands and runs the selected one', async () => {
    mockFetch();
    renderAt('/');

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const dialog = await screen.findByRole('dialog', { name: 'Command menu' });
    const input = within(dialog).getByRole('combobox');

    await userEvent.type(input, 'light');
    const options = within(dialog).getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Switch to light theme');

    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(document.documentElement).toHaveAttribute('data-theme', 'light'));
    expect(screen.queryByRole('dialog', { name: 'Command menu' })).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', async () => {
    mockFetch();
    renderAt('/');

    await userEvent.click(screen.getByRole('button', { name: 'Open command menu' }));
    await userEvent.type(screen.getByRole('combobox'), 'zzzz');
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});

describe('contact form', () => {
  it('validates required fields before sending', async () => {
    const fetchMock = mockFetch();
    renderAt('/');

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText('Please tell me your name.')).toBeInTheDocument();
    expect(screen.getByText('I need an email to reply to.')).toBeInTheDocument();
    expect(screen.getByText('Please write a message.')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    expect(fetchMock).not.toHaveBeenCalledWith(expect.stringContaining('formsubmit'), expect.anything());
  });

  it('sends the message and shows a confirmation', async () => {
    const fetchMock = mockFetch();
    renderAt('/');

    await userEvent.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText('Email'), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Hello');
    await userEvent.type(screen.getByLabelText('Message'), 'I would love to work together on a project.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('heading', { name: 'Message sent!' })).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls.find(([u]) => String(u).includes('formsubmit'));
    expect(url).toBe(`https://formsubmit.co/ajax/${profile.email}`);
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      _subject: 'Portfolio: Hello',
    });
  });

  it('shows a helpful error when sending fails', async () => {
    mockFetch({ contact: () => json({ success: 'false', message: 'nope' }) });
    renderAt('/');

    await userEvent.type(screen.getByLabelText('Name'), 'Ada');
    await userEvent.type(screen.getByLabelText('Email'), 'ada@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'Hello there, this is a test.');
    await act(() => userEvent.click(screen.getByRole('button', { name: /send message/i })));

    expect(await screen.findByText(/something went wrong sending your message/i)).toBeInTheDocument();
  });
});

describe('routing', () => {
  it('renders a 404 page for unknown routes', async () => {
    mockFetch();
    renderAt('/does-not-exist');
    expect(screen.getByRole('heading', { name: /this page wandered off/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    await waitFor(() => expect(document.title).toMatch(/page not found/i));
  });

  it('lazy-loads the admin page', async () => {
    mockFetch();
    renderAt('/addprojects');
    expect(await screen.findByRole('heading', { name: 'Add a project' })).toBeInTheDocument();
  });
});

describe('case studies', () => {
  it('links each project card to its case study', async () => {
    mockFetch();
    renderAt('/');
    const link = await screen.findByRole('link', { name: /case study of bikreta store/i });
    expect(link).toHaveAttribute('href', '/projects/bikreta');
  });

  it('renders a full case study page with sections, links and page metadata', async () => {
    mockFetch();
    renderAt('/projects/drilled');

    expect(await screen.findByRole('heading', { level: 1, name: 'Drilled' })).toBeInTheDocument();
    for (const name of ['Overview', 'The challenge', 'How I built it', 'What I built', 'Under the hood', 'The result']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: /visit live site/i })).toHaveAttribute('href', 'https://drilled-74880.web.app/');
    expect(screen.getByRole('link', { name: /api code/i })).toHaveAttribute(
      'href',
      'https://github.com/juhayeraiaz/drilled-server',
    );
    expect(document.title).toMatch(/^Drilled case study/);
    // Navigation goes back to the home page sections from here.
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('navigation', { name: 'More case studies' })).toBeInTheDocument();
  });

  it('shows the 404 page for an unknown case study', async () => {
    mockFetch();
    renderAt('/projects/not-a-project');
    expect(await screen.findByRole('heading', { name: /wandered off/i })).toBeInTheDocument();
  });
});
