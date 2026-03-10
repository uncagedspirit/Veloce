import { useSectionReveal } from '../hooks/useReveal';
import './Projects.css';

const PROJECTS = [
  { num: '01', cat: 'E-Commerce',      title: 'Arca Apparel',        sub: 'Luxury streetwear brand — Shopify store + brand identity',           bg: 'bg-1' },
  { num: '02', cat: 'SaaS / Web App',  title: 'Vaultrix CRM',        sub: 'Dashboard design & frontend development for B2B SaaS',               bg: 'bg-2' },
  { num: '03', cat: 'Agency / Landing',title: 'Meridian Legal',       sub: 'Conversion-focused site for a boutique law firm in NYC',              bg: 'bg-3' },
  { num: '04', cat: 'Restaurant',      title: 'Ember & Salt',         sub: 'Full website + reservation system for a fine dining restaurant',      bg: 'bg-4' },
  { num: '05', cat: 'Real Estate',     title: 'Pinnacle Properties',  sub: 'Listings platform with property search & CRM for realtors',          bg: 'bg-5' },
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
          <div
            key={p.num}
            className={`project-card ${i === 0 ? 'project-card--featured' : ''} reveal${i > 0 ? ` reveal-delay-${Math.min(i, 5)}` : ''}`}
          >
            <div className={`project-bg ${p.bg}`} />
            <div className="project-lines" />
            <div className="project-overlay" />
            <div className="project-deco">{p.num}</div>
            <div className="project-arrow"><ArrowIcon /></div>
            <div className="project-content">
              <div className="project-cat">{p.cat}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-sub">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
