import { Link } from 'react-router-dom';
import { useSectionReveal } from '../hooks/useReveal';
import './Projects.css';

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
    sub: 'Full-stack web app for a local frame business — browse, customise & order online',
    href: 'https://frameverse.netlify.app/',
    img: getScreenshot('frameverse'),
    bg: 'bg-1',
  },
  {
    num: '02',
    cat: 'SaaS / AI Landing Page',
    title: 'Brainwave',
    sub: 'High-impact AI product landing page with modern glassmorphism aesthetic',
    href: 'https://aibrainwave.netlify.app/',
    img: getScreenshot('brainwave'),
    bg: 'bg-2',
  },
  {
    num: '03',
    cat: 'Real Estate',
    title: 'Meridian Builds',
    sub: 'Premium real estate & builder showcase — clean, authoritative presence',
    href: 'https://meridian-builds.vercel.app/',
    img: getScreenshot('meridian'),
    bg: 'bg-3',
  },
  {
    num: '04',
    cat: 'Financial Services',
    title: 'NorthPeak Advisory',
    sub: 'Sophisticated site for a financial advisory firm — trust, clarity, conversions',
    href: 'https://northpeak-advisory.vercel.app/',
    img: getScreenshot('northpeak'),
    bg: 'bg-4',
  },
  {
    num: '05',
    cat: 'Personal Portfolio',
    title: 'Saakshi Kobarne',
    sub: 'Personal portfolio — bold, expressive design with smooth interactions',
    href: 'https://uncagedspirit.github.io/portfolio/',
    img: getScreenshot('portfolio'),
    bg: 'bg-5',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <path d="M3 13L13 3M13 3H7M13 3v6" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useSectionReveal();

  return (
    <section id="work" className="projects section-pad" ref={sectionRef}>
      <div className="projects-header">
        <div>
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">Selected Work</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            Projects <em>Delivered</em>
          </h2>
        </div>
        <Link to="/projects" className="btn-outline reveal">
          <div className="btn-outline-arrow" />
          All Projects
        </Link>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <a
            key={p.num}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card ${i === 0 ? 'project-card--featured' : ''} reveal${i > 0 ? ` reveal-delay-${Math.min(i, 5)}` : ''}`}
          >
            {/* Layer 1: gradient background — always present */}
            <div className={`project-bg ${p.bg}`} />

            {/* Layer 2: grid lines texture */}
            <div className="project-lines" />

            {/* Layer 3: screenshot, contained in upper portion */}
            {p.img && (
              <div className="project-preview-wrap">
                <img
                  src={p.img}
                  alt={`${p.title} screenshot`}
                  className="project-preview-img"
                  loading="lazy"
                />
                <div className="project-preview-fade" />
              </div>
            )}

            {/* Layer 4: bottom overlay so text always reads */}
            <div className="project-overlay" />

            <div className="project-deco">{p.num}</div>
            <div className="project-arrow"><ArrowIcon /></div>

            <div className="project-content">
              <div className="project-cat">{p.cat}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-sub">{p.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}