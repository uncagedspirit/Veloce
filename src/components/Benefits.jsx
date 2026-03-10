import { useSectionReveal } from '../hooks/useReveal';
import './Benefits.css';

const BENEFITS = [
  { icon: '⚡', title: 'Fast Turnaround',      desc: 'Most projects go live in 7–21 days. We move fast without cutting corners — clear processes keep everything on track.' },
  { icon: '🎯', title: 'Conversion-First',     desc: 'Every design decision is grounded in how it affects user behavior. Beautiful is non-negotiable — but results matter more.' },
  { icon: '✦',  title: 'No Templates',         desc: 'Everything is built from scratch. Your competitors can\'t buy what we make — because we build exclusively for you.' },
  { icon: '🔒', title: 'Fixed Pricing',        desc: 'Clear scope, clear price, no surprises. You\'ll know exactly what you\'re getting before we start a single thing.' },
  { icon: '🛠',  title: 'Post-Launch Support', desc: 'We don\'t disappear after launch. Every project includes 30-day support and optional ongoing maintenance plans.' },
  { icon: '📡', title: 'Full Transparency',    desc: 'Dedicated project space, weekly updates, and a direct line to whoever\'s building your site — always in the loop.' },
];

export default function Benefits() {
  const sectionRef = useSectionReveal();

  return (
    <section id="benefits" className="benefits section-pad" ref={sectionRef}>
      <div className="benefits-bg-text">WHY US</div>

      <div className="benefits-header">
        <div>
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">Why Uncaged</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            Built Different<em>.</em><br />By Design
          </h2>
        </div>
        <p className="benefits-intro reveal">
          We're not a factory. We're a focused team that cares deeply about every
          project we take on — which means we're selective, thorough, and genuinely
          invested in your success.
        </p>
      </div>

      <div className="benefits-grid">
        {BENEFITS.map((b, i) => (
          <div key={b.title} className={`benefit-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 5)}` : ''}`}>
            <div className="benefit-icon-wrap">
              <span className="benefit-icon">{b.icon}</span>
            </div>
            <div className="benefit-title">{b.title}</div>
            <p className="benefit-desc">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
