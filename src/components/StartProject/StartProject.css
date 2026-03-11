import { useState, useEffect, useCallback } from 'react';
import { useSectionReveal } from '../../hooks/useReveal';
import { DraftManager } from '../../services/draftManager';
import LeadCaptureForm from './LeadCaptureForm';
import DiscoveryQuestionnaire from './DiscoveryQuestionnaire';
import TalkToUs from './TalkToUs';
import './StartProject.css';

const QUESTIONNAIRE_PREVIEW = [
  { num: '01', name: 'Quick project basics', time: '~2 min', desc: '8 questions about you and your project' },
  { num: '02', name: 'Business & goals',     time: '~1 min', desc: 'What you do, who you serve, and what success looks like' },
  { num: '03', name: 'Design direction',     time: '~1 min', desc: 'Style preferences, inspiration, and brand personality' },
  { num: '04', name: 'Website structure',    time: '~30 sec', desc: 'Pages, sitemap, and navigation needs' },
  { num: '05', name: 'Content & assets',     time: '~30 sec', desc: 'What you have ready and what you need help with' },
  { num: '06', name: 'Features & marketing', time: '~1 min', desc: 'Integrations, CMS, analytics, and SEO goals' },
  { num: '07', name: 'Final goals',          time: '~30 sec', desc: 'What defines success and your bigger vision' },
];

export default function StartProject() {
  const sectionRef = useSectionReveal();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [view, setView]       = useState('choose'); // choose | lead | discovery | talk
  const [leadId, setLeadId]   = useState(null);
  const [hasDraft, setHasDraft] = useState(false);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  // Check for existing draft on mount
  useEffect(() => {
    setHasDraft(DraftManager.hasDraft());
    const existingLeadId = DraftManager.getLeadId();
    if (existingLeadId) setLeadId(existingLeadId);
  }, []);

  // Escape key closes overlay
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeOverlay(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const openOverlay = useCallback((v = 'choose') => {
    setView(v);
    setOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);
    setTimeout(() => setView('choose'), 600);
  }, []);

  const handleLeadComplete = useCallback((id, answers) => {
    setLeadId(id);
    setTimeout(() => setView('discovery'), 1400);
  }, []);

  const handleDiscoveryComplete = useCallback(() => {
    setHasDraft(false);
  }, []);

  const resumeDraft = useCallback(() => {
    const step = DraftManager.getLeadStep();
    if (step >= 8) {
      setView('discovery');
    } else {
      setView('lead');
    }
    setOverlayOpen(true);
  }, []);

  const OVERLAY_TITLES = {
    choose:    'Start Your Project',
    lead:      'Step 1 — Project Brief',
    discovery: 'Step 2 — Discovery',
    talk:      'Talk to Us',
  };

  return (
    <>
      {/* ─── Landing Page Section ─── */}
      <section id="start-project" className="start-project section-pad" ref={sectionRef}>
        <div className="sp-bg-text">START</div>

        <div className="sp-header">
          <div>
            <div className="section-label reveal">
              <div className="section-label-line" />
              <span className="section-label-text">Start Your Project</span>
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              Ready to<br /><em>Begin</em>?
            </h2>
          </div>
          <p className="sp-header-meta reveal reveal-delay-2">
            Tell us about your project through our structured questionnaire — or reach
            out directly. Either way, we'll respond within 24 hours with a clear scope and quote.
          </p>
        </div>

        {/* Resume draft banner */}
        {hasDraft && (
          <div className="sp-resume-banner reveal">
            <div className="sp-resume-dot" />
            <span className="sp-resume-text">You have an unfinished questionnaire — continue where you left off.</span>
            <button className="sp-resume-btn" onClick={resumeDraft}>Resume</button>
          </div>
        )}

        {/* Choice cards */}
        <div className="sp-choices reveal reveal-delay-3">
          {/* Option A — Questionnaire */}
          <div className="sp-choice-card" onClick={() => openOverlay('lead')}>
            <div className="sp-choice-label">Option A · 5 minutes</div>
            <h3 className="sp-choice-title">
              Fill Out the<br /><em>Questionnaire</em>
            </h3>
            <p className="sp-choice-desc">
              The fastest way to get a precise proposal. Walk through a short, structured
              process — we use your answers to arrive at the strategy call fully prepared.
            </p>

            <div className="sp-steps-preview">
              {QUESTIONNAIRE_PREVIEW.slice(0, 4).map(s => (
                <div key={s.num} className="sp-step-preview">
                  <span className="sp-step-num">{s.num}</span>
                  <div className="sp-step-info">
                    <div className="sp-step-name">{s.name}</div>
                    <div className="sp-step-time">{s.time}</div>
                  </div>
                </div>
              ))}
              <div className="sp-step-preview">
                <span className="sp-step-num">…</span>
                <div className="sp-step-info">
                  <div className="sp-step-name">+ 3 more sections</div>
                  <div className="sp-step-time">All optional, all skippable</div>
                </div>
              </div>
            </div>

            <button className="sp-choice-cta">
              Start Questionnaire
              <div className="sp-choice-cta-arrow" />
            </button>
          </div>

          {/* Option B — Talk to Us */}
          <div className="sp-choice-card sp-choice-card--b" onClick={() => openOverlay('talk')}>
            <div className="sp-choice-label">Option B · Direct</div>
            <h3 className="sp-choice-title">
              Talk to Us<br /><em>Directly</em>
            </h3>
            <p className="sp-choice-desc">
              Prefer a conversation over a form? Send us a message and we'll schedule
              a time that works. No commitment required — just a friendly first conversation.
            </p>

            <div className="sp-steps-preview">
              <div className="sp-step-preview">
                <span className="sp-step-num">✉</span>
                <div className="sp-step-info">
                  <div className="sp-step-name">Direct message</div>
                  <div className="sp-step-time">Veloce.studio@proton.me</div>
                </div>
              </div>
              <div className="sp-step-preview">
                <span className="sp-step-num">⏱</span>
                <div className="sp-step-info">
                  <div className="sp-step-name">Response within 24 hours</div>
                  <div className="sp-step-time">Weekdays guaranteed</div>
                </div>
              </div>
              <div className="sp-step-preview">
                <span className="sp-step-num">📅</span>
                <div className="sp-step-info">
                  <div className="sp-step-name">We'll schedule a strategy call</div>
                  <div className="sp-step-time">30 min · video or phone</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: 'rgba(28,79,79,0.15)', border: '1px solid rgba(139,191,191,0.15)', marginBottom: 32, fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--teal-pale)', fontFamily: 'Syne,sans-serif', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                What we'll cover in the call:
              </strong>
              Your goals → Project scope → Timeline → Investment → Proposal
            </div>

            <button className="sp-choice-cta">
              Send a Message
              <div className="sp-choice-cta-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Overlay ─── */}
      <div className={`sp-overlay ${overlayOpen ? 'open' : ''}`}>
        {/* Top bar */}
        <div className="sp-overlay-bar">
          <div className="sp-overlay-logo">VELOCE<span>.</span>STUDIO</div>
          <div className="sp-overlay-meta">{OVERLAY_TITLES[view]}</div>
          <button className="sp-close-btn" onClick={closeOverlay} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className="sp-overlay-body">
          {view === 'choose' && (
            <div style={{ padding: '80px 48px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 16 }}>
                How would you<br /><em style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontWeight: 300, color: 'var(--teal-pale)', textTransform: 'none', fontSize: '1.1em' }}>like to start?</em>
              </h2>
              <p style={{ fontSize: 14, color: 'var(--fg-dim)', marginBottom: 48 }}>
                Choose whichever feels right for you.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="sp-choice-cta" onClick={() => setView('lead')} style={{ minWidth: 200 }}>
                  Fill Questionnaire <div className="sp-choice-cta-arrow" />
                </button>
                <button className="sp-choice-cta" onClick={() => setView('talk')} style={{ minWidth: 180, background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border-bright)' }}>
                  Talk to Us <div className="sp-choice-cta-arrow" />
                </button>
              </div>
            </div>
          )}

          {view === 'lead' && (
            <LeadCaptureForm onComplete={handleLeadComplete} />
          )}

          {view === 'discovery' && (
            <DiscoveryQuestionnaire leadId={leadId} onComplete={handleDiscoveryComplete} />
          )}

          {view === 'talk' && (
            <TalkToUs onClose={closeOverlay} />
          )}
        </div>
      </div>
    </>
  );
}