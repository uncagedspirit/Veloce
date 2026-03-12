import { useSectionReveal } from '../hooks/useReveal';
import './Projects.css';

// Drop your screenshots in src/assets/projects/ — filenames must match exactly.
// Windows default names are fine: Screenshot.png, etc. — just rename to these.
import ssFrameverse  from '../assets/projects/frameverse.png';
import ssBrainwave   from '../assets/projects/brainwave.png';
import ssMeridian    from '../assets/projects/meridian.png';
import ssNorthpeak   from '../assets/projects/northpeak.png';
import ssPortfolio   from '../assets/projects/portfolio.png';

const PROJECTS = [
  {
    num: '01',
    cat: 'E-Commerce / Web App',
    title: 'FrameVerse',
    sub: 'Full-stack web app for a local frame business — browse, customise & order online',
    href: 'https://frameverse.netlify.app/',
    screenshot: ssFrameverse,
  },
  {
    num: '02',
    cat: 'SaaS / AI Landing Page',
    title: 'Brainwave',
    sub: 'High-impact AI product landing page with modern glassmorphism aesthetic',
    href: 'https://aibrainwave.netlify.app/',
    screenshot: ssBrainwave,
  },
  {
    num: '03',
    cat: 'Real Estate',
    title: 'Meridian Builds',
    sub: 'Premium real estate & builder showcase — clean, authoritative presence',
    href: 'https://meridian-builds.vercel.app/',
    screenshot: ssMeridian,
  },
  {
    num: '04',
    cat: 'Financial Services',
    title: 'NorthPeak Advisory',
    sub: 'Sophisticated site for a financial advisory firm — trust, clarity, conversions',
    href: 'https://northpeak-advisory.vercel.app/',
    screenshot: ssNorthpeak,
  },
  {
    num: '05',
    cat: 'Personal Portfolio',
    title: 'Saakshi Kobarne',
    sub: 'Personal portfolio — bold, expressive design with smooth interactions',
    href: 'https://uncagedspirit.github.io/portfolio/',
    screenshot: ssPortfolio,
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
        <a href="#cta" className="btn-outline reveal">
          <div className="btn-outline-arrow" />
          All Projects
        </a>
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
            {/* Contained screenshot — sits in the upper portion of the card */}
            <div className="project-preview-wrap">
              <img
                src={p.screenshot}
                alt={`${p.title} screenshot`}
                className="project-preview-img"
                loading="lazy"
              />
              <div className="project-preview-fade" />
            </div>

            {/* Decorative number */}
            <div className="project-deco">{p.num}</div>

            {/* Arrow appears on hover */}
            <div className="project-arrow"><ArrowIcon /></div>

            {/* Text info — always visible at bottom */}
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