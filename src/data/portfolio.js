/**
 * ---------------------------------------------------------------------------
 *  Site content
 * ---------------------------------------------------------------------------
 * Everything that appears on the site lives in this file, so updating the
 * portfolio never requires touching component code.
 */
import { FaFacebookF, FaGithub, FaInstagram, FaJava, FaLinkedinIn } from 'react-icons/fa6';
import { LuCodeXml, LuMonitorSmartphone, LuRocket, LuServer } from 'react-icons/lu';
import {
  SiBootstrap,
  SiCss,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNetlify,
  SiNodedotjs,
  SiNpm,
  SiReact,
  SiReactrouter,
  SiTailwindcss,
} from 'react-icons/si';

export const profile = {
  name: 'Juhayer Aiaz',
  firstName: 'Juhayer',
  initials: 'JA',
  /** Rotating titles shown in the hero headline. */
  roles: ['Software Engineer', 'Full-Stack Web Developer', 'MERN Stack Developer', 'Technology Enthusiast'],
  tagline: 'I build fast, accessible web applications — from polished interfaces to the APIs behind them.',
  summary:
    "I'm a software engineer and full-stack web developer working across the JavaScript ecosystem. I care about clean architecture, thoughtful UX and shipping work that holds up in production.",
  location: 'Bangladesh',
  email: 'aiazj97@gmail.com',
  phone: '+8801302311163',
  phoneDisplay: '+880 1302-311163',
  siteUrl: 'https://juhayeraiaz.com',
  /** Shown as a status pill in the hero. Set to '' to hide it. */
  availability: 'Open to new opportunities',
  /** Year from the "EST. 2022" brand mark. */
  since: 2022,
  /** Link to a hosted PDF résumé (e.g. '/resume.pdf' in /public). Leave empty to hide the button. */
  resumeUrl: '',
  githubUsername: 'juhayeraiaz',
};

export const about = {
  paragraphs: [
    "I'm Juhayer — a full-stack developer who enjoys turning ideas into products people genuinely like using. Most of my work lives in the JavaScript ecosystem: React on the front end, Node.js and Express on the server, and MongoDB and Firebase for data and authentication.",
    "I'm a technology enthusiast at heart. I actively seek out new tools, keep up with where the industry is heading and bring what I learn back into my work — it's how I stay ahead of the curve and deliver dependable results for the people I work with.",
    "When I'm not shipping features, I'm building side projects, experimenting with new frameworks and sharing code on GitHub.",
  ],
};

export const services = [
  {
    icon: LuMonitorSmartphone,
    title: 'Frontend Engineering',
    description:
      'Responsive, accessible interfaces in React — reusable components, client-side routing and polished styling with Tailwind CSS, Bootstrap or Material UI.',
  },
  {
    icon: LuServer,
    title: 'Backend & APIs',
    description:
      'RESTful APIs with Node.js and Express, data modelling in MongoDB and authentication with Firebase — secure, predictable and easy to extend.',
  },
  {
    icon: LuRocket,
    title: 'Full-Stack Delivery',
    description:
      'End-to-end ownership from first commit to production: e-commerce stores, booking systems and service platforms deployed to Firebase Hosting and Netlify.',
  },
];

/** `color` tints the logo on hover; omit it to use the current text colour. */
export const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#2965F1' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      { name: 'Material UI', icon: SiMui, color: '#007FFF' },
      { name: 'React Router', icon: SiReactrouter, color: '#CA4245' },
    ],
  },
  {
    title: 'Backend & Data',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'REST APIs', icon: LuCodeXml, color: '#2DD4BF' },
    ],
  },
  {
    title: 'Tools & Languages',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
      { name: 'npm', icon: SiNpm, color: '#CB3837' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
    ],
  },
];

/**
 * Work history. The Experience section (and its nav link) only appears once
 * this list has entries. Example entry:
 *
 * {
 *   role: 'Software Engineer',
 *   company: 'Company name',
 *   companyUrl: 'https://example.com',
 *   period: 'Jan 2024 — Present',
 *   location: 'Remote',
 *   summary: 'One sentence about the team and what you owned.',
 *   highlights: ['Outcome-focused bullet with a metric if you have one.'],
 *   stack: ['React', 'Node.js', 'MongoDB'],
 * }
 */
export const experience = [];

export const socials = [
  { name: 'GitHub', url: 'https://github.com/juhayeraiaz', icon: FaGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/juhayer-aiaz/', icon: FaLinkedinIn },
  { name: 'Facebook', url: 'https://www.facebook.com/Juhayer.aiaz0/', icon: FaFacebookF },
  { name: 'Instagram', url: 'https://www.instagram.com/juhayer.aiaz/', icon: FaInstagram },
];

/** Projects API (MongoDB-backed server). Override with VITE_API_URL. */
export const API_URL = (import.meta.env.VITE_API_URL || 'https://portfolio-server-raue.onrender.com').replace(/\/$/, '');

/**
 * GitHub repositories to feature, in order (e.g. ['bikreta-client', 'drilled-client']).
 * Leave empty to automatically show the most recently updated public repos.
 */
export const pinnedRepos = [];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  ...(experience.length ? [{ id: 'experience', label: 'Experience' }] : []),
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'contact', label: 'Contact' },
];
