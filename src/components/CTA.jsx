import { useNavigate } from 'react-router-dom';
import './CTA.css';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section id="cta" className="cta">
      <div className="cta-bg-text">START</div>
      <div className="cta-content">
        <div className="cta-label">Ready to Begin</div>
        <h2 className="cta-title">
          Let's Build<br />
          <em>Something</em><br />
          <span className="cta-title-word">Unforgettable</span>
        </h2>
        <p className="cta-sub">
          Tell us about your project and we'll get back within 24 hours with a
          clear scope and quote. No obligation, no fluff.
        </p>
        <div className="cta-actions">
          <a href="mailto:Veloce.studio@proton.me" className="btn-dark">
            Email Us Directly
          </a>
          <button className="cta-btn-soft" onClick={() => navigate('/start-project')}>
            <span className="cta-btn-soft-icon">No commitment</span>
            <span className="cta-btn-soft-main">Just share your idea</span>
            <span className="cta-btn-soft-sub">5 min · zero pressure</span>
          </button>
        </div>
        <p className="cta-contact">
          Or write to{' '}
          <a href="mailto:Veloce.studio@proton.me">Veloce.studio@proton.me</a>
        </p>
      </div>
    </section>
  );
}