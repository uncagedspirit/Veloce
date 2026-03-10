import './Hero.css';

const TICKER_ITEMS = [
  'Web Design', 'Brand Identity', 'E-Commerce',
  'SEO Optimization', 'Landing Pages', 'Web Apps', 'Motion Design',
];

export default function Hero() {
  // Duplicate for seamless infinite scroll
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section id="hero" className="hero">
      {/* Background */}
      <div className="hero-bg" />

      {/* Motion streaks */}
      <div className="hero-streak hero-streak--1" />
      <div className="hero-streak hero-streak--2" />
      <div className="hero-streak hero-streak--3" />

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">Web Design &amp; Development Agency</span>
        </div>

        <h1 className="hero-title">
          We Build
          <em className="hero-italic-line">Websites that</em>
          <span>
            Move<span className="hero-accent">.</span>
          </span>
        </h1>

        <p className="hero-sub">
          Uncaged Studio crafts high-performance digital experiences for brands
          that refuse to blend in. From concept to launch — we make it count.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            <span>See Our Work</span>
          </a>
          <a href="#cta" className="btn-outline">
            <div className="btn-outline-arrow" />
            Start a Project
          </a>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="hero-ticker">
        <div className="ticker-track">
          {items.map((item, i) => (
            <div className="ticker-item" key={i}>
              {item}
              <div className="ticker-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
