import { useState } from 'react';
import { SupabaseService } from '../../services/supabaseService';

const CONTACT_METHODS = ['Email', 'Phone', 'Video call', 'Any'];

export default function TalkToUs({ onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', company: '', contact_method: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setError('');

    try {
      await SupabaseService.submitContactMessage(form);

      // ── GA4 conversion event ──
      window.gtag?.('event', 'contact', {
        event_category: 'engagement',
        event_label: form.contact_method,
      });

      setSubmitted(true);
    } catch (err) {
      console.error('[TalkToUs] Submit error:', err);
      setError('Something went wrong — please try emailing us directly at Veloce.studio@proton.me');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="sp-lc-wrap">
        <div className="sp-success">
          <div className="sp-success-mark">✓</div>
          <div className="sp-success-eyebrow">Message Received</div>
          <h2 className="sp-success-title">We'll Be In <em>Touch</em></h2>
          <p className="sp-success-sub">
            Thanks for reaching out, {form.name.split(' ')[0]}. We'll get back to you
            within 24 hours at <strong style={{ color: 'var(--teal-pale)' }}>{form.email}</strong>.
          </p>
          <div className="sp-success-actions">
            <button className="sp-btn-continue" onClick={onClose}>
              Back to Site <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-talk-wrap">
      {/* Left — info */}
      <div className="sp-talk-left">
        <div className="section-label" style={{ marginBottom: 20 }}>
          <div className="section-label-line" />
          <span className="section-label-text">Direct Contact</span>
        </div>

        <h2 className="sp-talk-title">
          Let's Talk<br /><em>Directly</em>
        </h2>
        <p className="sp-talk-desc">
          Prefer a conversation over a form? Send us a message and we'll schedule
          a call that works for you. No commitments, no pressure.
        </p>

        <div className="sp-contact-detail">
          <div className="sp-contact-icon">✉</div>
          <div>
            <div className="sp-contact-label">Email</div>
            <div className="sp-contact-value">
              <a href="mailto:Veloce.studio@proton.me">Veloce.studio@proton.me</a>
            </div>
          </div>
        </div>

        <div className="sp-contact-detail">
          <div className="sp-contact-icon">⏱</div>
          <div>
            <div className="sp-contact-label">Response Time</div>
            <div className="sp-contact-value">Within 24 hours</div>
          </div>
        </div>

        <div className="sp-contact-detail">
          <div className="sp-contact-icon">🌍</div>
          <div>
            <div className="sp-contact-label">Availability</div>
            <div className="sp-contact-value">Clients worldwide — fully remote</div>
          </div>
        </div>

        <div style={{ marginTop: 40, padding: '20px 24px', border: '1px solid var(--border)', background: 'rgba(28,79,79,0.12)' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8 }}>
            Want a structured process?
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.6 }}>
            Our questionnaire takes 5 minutes and helps us arrive at the call
            fully prepared — saving you time.
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="sp-talk-right">
        <div className="sp-talk-form-title">Send us a message</div>

        <div className="sp-form-row">
          <div className="sp-form-field">
            <label className="sp-form-label">Name *</label>
            <input
              className="sp-input"
              type="text"
              placeholder="Alex Johnson"
              value={form.name}
              onChange={set('name')}
            />
          </div>
          <div className="sp-form-field">
            <label className="sp-form-label">Email *</label>
            <input
              className="sp-input"
              type="email"
              placeholder="alex@company.com"
              value={form.email}
              onChange={set('email')}
            />
          </div>
        </div>

        <div className="sp-form-field">
          <label className="sp-form-label">
            Company <span style={{ fontSize: 10, color: 'var(--fg-muted)', fontWeight: 300 }}>(optional)</span>
          </label>
          <input
            className="sp-input"
            type="text"
            placeholder="Acme Inc."
            value={form.company}
            onChange={set('company')}
          />
        </div>

        <div className="sp-form-field">
          <label className="sp-form-label">Preferred contact method</label>
          <select
            className="sp-select"
            value={form.contact_method}
            onChange={set('contact_method')}
          >
            <option value="">Select…</option>
            {CONTACT_METHODS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="sp-form-field">
          <label className="sp-form-label">Message *</label>
          <textarea
            className="sp-input sp-textarea"
            placeholder="Tell us about your project, timeline, and any questions you have..."
            value={form.message}
            onChange={set('message')}
            style={{ minHeight: 130 }}
          />
        </div>

        {error && (
          <div className="sp-field-error" style={{ marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        <button
          className="sp-btn-continue"
          onClick={handleSubmit}
          disabled={!form.name || !form.email || !form.message || submitting}
          style={{ marginTop: 8 }}
        >
          {submitting ? 'Sending…' : 'Send Message'}
          {!submitting && <span style={{ fontSize: 14 }}>→</span>}
        </button>
      </div>
    </div>
  );
}