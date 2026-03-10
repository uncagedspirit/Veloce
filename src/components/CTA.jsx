import './CTA.css';

export default function CTA() {
  return (
    <section id="cta" className="cta">
      <div className="cta-bg-text">START</div>
      <div className="cta-content">
        <div className="cta-label">Ready to Begin</div>
        <h2 className="cta-title">
          Let's Build<br />
          <em>Something</em><br />
          Unforgettable
        </h2>
        <p className="cta-sub">
          Tell us about your project and we'll get back within 24 hours with a
          clear scope and quote. No obligation, no fluff.
        </p>
        <div className="cta-actions">
          <a href="mailto:hello@uncaged.studio" className="btn-dark">
            Email Us Directly
          </a>
        </div>
        <p className="cta-contact">
          Or write to{' '}
          <a href="mailto:hello@uncaged.studio">hello@uncaged.studio</a>
        </p>
      </div>
    </section>
  );
}
