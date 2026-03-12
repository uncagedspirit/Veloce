import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProjectsPage.css';

const screenshots = import.meta.glob(
  '../assets/projects/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

function getScreenshot(stem) {
  for (const [path, mod] of Object.entries(screenshots)) {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    if (filename === stem) return mod.default;
  }
  return null;
}

const PROJECTS = [
  {
    num: '01',
    cat: 'E-Commerce / Web App',
    title: 'FrameVerse',
    description: 'A full-stack web application built for a local frame business. Customers can browse the catalogue, customise frame options, and place orders — all from a sleek, intuitive interface built for conversions.',
    tags: ['React', 'Web App', 'E-Commerce', 'UI/UX'],
    href: 'https://frameverse.netlify.app/',
    img: getScreenshot('frameverse'),
    bg: 'bg-1',
    year: '2024',
  },
  {
    num: '02',
    cat: 'SaaS / AI Landing Page',
    title: 'Brainwave',
    description: 'A high-impact landing page for an AI SaaS product. Built with a bold glassmorphism aesthetic, animated sections, and a conversion-focused layout designed to capture leads and communicate value fast.',
    tags: ['Landing Page', 'AI / SaaS', 'Animations', 'React'],
    href: 'https://aibrainwave.netlify.app/',
    img: getScreenshot('brainwave'),
    bg: 'bg-2',
    year: '2024',
  },
  {
    num: '03',
    cat: 'Real Estate',
    title: 'Meridian Builds',
    description: 'A premium showcase site for a real estate builder. Clean architecture, strong typography, and a confident visual language that positions the brand as a market leader in premium property development.',
    tags: ['Web Design', 'Real Estate', 'Brand', 'Next.js'],
    href: 'https://meridian-builds.vercel.app/',
    img: getScreenshot('meridian'),
    bg: 'bg-3',
    year: '2024',
  },
  {
    num: '04',
    cat: 'Financial Services',
    title: 'NorthPeak Advisory',
    description: 'A sophisticated web presence for a financial advisory firm. Every design decision reinforces trust and authority — from the restrained colour palette to the carefully crafted copy hierarchy.',
    tags: ['Web Design', 'Finance', 'Conversion', 'Brand'],
    href: 'https://northpeak-advisory.vercel.app/',
    img: getScreenshot('northpeak'),
    bg: 'bg-4',
    year: '2024',
  },
  {
    num: '05',
    cat: 'Personal Portfolio',
    title: 'Saakshi Kobarne',
    description: 'A bold, expressive personal portfolio designed to make a lasting first impression. Smooth scroll animations, a strong typographic voice, and a layout that puts the work front and centre.',
    tags: ['Portfolio', 'Creative', 'Animations', 'React'],
    href: 'https://uncagedspirit.github.io/portfolio/',
    img: getScreenshot('portfolio'),
    bg: 'bg-5',
    year: '2024',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <path d="M3 13L13 3M13 3H7M13 3v6" />
    </svg>
  );
}

export default function ProjectsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pp-wrap">
      <Cursor />
      <Navbar />

      <main className="pp-main">

        {/* ── Hero header ── */}
        <div className="pp-hero">
          <div className="pp-hero-eyebrow">
            <div className="pp-hero-line" />
            <span>Selected Work</span>
          </div>
          <h1 className="pp-hero-title">
            All <em>Projects</em>
          </h1>
          <p className="pp-hero-sub">
            Five projects. Each one built from scratch — no templates, no shortcuts.
          </p>
          <Link to="/" className="pp-back-btn">
            ← Back to site
          </Link>
        </div>

        {/* ── Project rows ── */}
        <div className="pp-list">
          {PROJECTS.map((p, i) => (
            <div key={p.num} className="pp-row">

              {/* Big index number */}
              <div className="pp-row-num">{p.num}</div>

              {/* Screenshot panel */}
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-screen-panel"
              >
                <div className={`pp-screen-bg ${p.bg}`} />
                <div className="pp-screen-lines" />
                {p.img && (
                  <>
                    <img
                      src={p.img}
                      alt={`${p.title} screenshot`}
                      className="pp-screen-img"
                      loading="lazy"
                    />
                    <div className="pp-screen-fade" />
                  </>
                )}
                <div className="pp-screen-hover-label">
                  <ArrowIcon /> View Live Site
                </div>
              </a>

              {/* Copy */}
              <div className="pp-row-copy">
                <div className="pp-row-meta">
                  <span className="pp-row-cat">{p.cat}</span>
                  <span className="pp-row-year">{p.year}</span>
                </div>
                <h2 className="pp-row-title">{p.title}</h2>
                <p className="pp-row-desc">{p.description}</p>
                <div className="pp-row-tags">
                  {p.tags.map(t => (
                    <span key={t} className="pp-tag">{t}</span>
                  ))}
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-row-link"
                >
                  <span>View Project</span>
                  <div className="pp-row-link-arrow" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="pp-cta">
          <div className="pp-cta-inner">
            <div className="pp-cta-label">Next Step</div>
            <h2 className="pp-cta-title">
              Want results<br />like <em>these?</em>
            </h2>
            <Link to="/start-project" className="pp-cta-btn">
              Start Your Project →
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}