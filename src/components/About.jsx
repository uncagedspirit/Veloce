import { useSectionReveal } from '../hooks/useReveal';
import './About.css';

const TAGS = ['Web Design', 'Development', 'Brand Strategy', 'SEO', 'E-Commerce', 'Motion'];

export default function About() {
  const sectionRef = useSectionReveal();

  return (
    <section id="about" className="about section-pad" ref={sectionRef}>
      <div className="about-glow" />
      <div className="about-grid">

        {/* Visual block */}
        <div className="about-visual reveal">
          <div className="about-block about-block--1">
            <span className="about-inner-text">EST. 2023</span>
          </div>
          <div className="about-block about-block--2">
            <span className="about-inner-text-2">Veloce</span>
          </div>
          <div className="about-accent-line" />
          <div className="about-bg-num">US</div>
        </div>

        {/* Copy */}
        <div className="about-right">
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">About the Studio</span>
          </div>

          <h2 className="section-title reveal reveal-delay-1">
            Design with<br /><em>Intention</em>
          </h2>

          <p className="about-copy reveal reveal-delay-2">
            Veloce Studio is a boutique digital agency that{' '}
            <strong>builds websites people actually remember</strong>. We combine sharp
            strategy with obsessive craft — every pixel, every interaction, every
            millisecond of load time is deliberate.
          </p>

          <p className="about-copy reveal reveal-delay-3">
            We work with ambitious businesses, startups, and founders who understand
            that <strong>your website is your best salesperson</strong> — and it should
            look the part.
          </p>

          <div className="about-tags reveal reveal-delay-4">
            {TAGS.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}