import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DraftManager } from '../services/draftManager';
import Cursor from '../components/Cursor';
import LeadCaptureForm from '../components/StartProject/LeadCaptureForm';
import DiscoveryQuestionnaire from '../components/StartProject/DiscoveryQuestionnaire';
import TalkToUs from '../components/StartProject/TalkToUs';
import '../components/StartProject/StartProject.css';
import './StartProjectPage.css';

export default function StartProjectPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('choose'); // choose | lead | discovery | talk
  const [leadId, setLeadId] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    setHasDraft(DraftManager.hasDraft());
    const existingLeadId = DraftManager.getLeadId();
    if (existingLeadId) setLeadId(existingLeadId);
    window.scrollTo(0, 0);
  }, []);

  const handleLeadComplete = useCallback((id) => {
    setLeadId(id);
    setTimeout(() => setView('discovery'), 1400);
  }, []);

  const handleDiscoveryComplete = useCallback(() => {
    setHasDraft(false);
  }, []);

  const resumeDraft = useCallback(() => {
    const step = DraftManager.getLeadStep();
    setView(step >= 8 ? 'discovery' : 'lead');
  }, []);

  const VIEW_TITLES = {
    choose:    'Start Your Project',
    lead:      'Step 1 — Project Brief',
    discovery: 'Step 2 — Discovery',
    talk:      'Talk to Us',
  };

  return (
    <div className="spp-wrap">
      <Cursor />
      {/* Top bar */}
      <div className="spp-bar">
        <button className="spp-back-btn" onClick={() => navigate('/')}>
          ← Back to site
        </button>
        <div className="spp-logo">VELOCE<span>.</span>STUDIO</div>
        <div className="spp-view-label">{VIEW_TITLES[view]}</div>
      </div>

      {/* Content */}
      <div className="spp-body">
        {view === 'choose' && (
          <div className="spp-choose">
            {/* Draft banner */}
            {hasDraft && (
              <div className="sp-resume-banner" style={{ marginBottom: 48 }}>
                <div className="sp-resume-dot" />
                <span className="sp-resume-text">You have an unfinished questionnaire — continue where you left off.</span>
                <button className="sp-resume-btn" onClick={resumeDraft}>Resume</button>
              </div>
            )}

            <div className="spp-choose-header">
              <div className="section-label">
                <div className="section-label-line" />
                <span className="section-label-text">Start Your Project</span>
              </div>
              <h1 className="spp-choose-title">
                How Would You<br />
                <em>Like to Start?</em>
              </h1>
              <p className="spp-choose-sub">
                Choose whichever feels right — no commitment, no pressure.
              </p>
            </div>

            <div className="sp-choices">
              {/* Option A */}
              <div className="sp-choice-card" onClick={() => setView('lead')}>
                <div className="sp-choice-label">Option A · ~5 minutes</div>
                <h3 className="sp-choice-title">
                  Tell Us About<br /><em>Your Project</em>
                </h3>
                <p className="sp-choice-desc">
                  Walk through a few short questions — no jargon, no commitment.
                  Just tell us what you're building so we can prepare a focused proposal.
                </p>
                <div className="sp-steps-preview">
                  {[
                    { num: '01', name: 'Quick project basics', time: '~2 min' },
                    { num: '02', name: 'Business & goals', time: '~1 min' },
                    { num: '03', name: 'Design direction', time: '~1 min' },
                    { num: '04', name: 'Features & structure', time: '~1 min' },
                  ].map(s => (
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
                      <div className="sp-step-name">+ a few more sections</div>
                      <div className="sp-step-time">All skippable, zero pressure</div>
                    </div>
                  </div>
                </div>
                <button className="sp-choice-cta">
                  Share My Preferences
                  <div className="sp-choice-cta-arrow" />
                </button>
              </div>

              {/* Option B */}
              <div className="sp-choice-card sp-choice-card--b" onClick={() => setView('talk')}>
                <div className="sp-choice-label">Option B · Direct</div>
                <h3 className="sp-choice-title">
                  Talk to Us<br /><em>Directly</em>
                </h3>
                <p className="sp-choice-desc">
                  Prefer a real conversation? Send us a message and we'll get back
                  to you within 24 hours to schedule a friendly first call.
                </p>
                <div className="sp-steps-preview">
                  {[
                    { num: '✉', name: 'Direct message', time: 'Veloce.studio@proton.me' },
                    { num: '⏱', name: 'Response within 24 hours', time: 'Weekdays guaranteed' },
                    { num: '📅', name: 'Strategy call scheduled', time: '30 min · video or phone' },
                  ].map((s, i) => (
                    <div key={i} className="sp-step-preview">
                      <span className="sp-step-num">{s.num}</span>
                      <div className="sp-step-info">
                        <div className="sp-step-name">{s.name}</div>
                        <div className="sp-step-time">{s.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="sp-choice-cta" style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border-bright)' }}>
                  Send a Message
                  <div className="sp-choice-cta-arrow" />
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'lead' && (
          <div className="spp-form-wrap">
            <div className="spp-breadcrumb">
              <button className="spp-crumb-btn" onClick={() => setView('choose')}>← Choose path</button>
            </div>
            <LeadCaptureForm onComplete={handleLeadComplete} />
          </div>
        )}

        {view === 'discovery' && (
          <DiscoveryQuestionnaire leadId={leadId} onComplete={handleDiscoveryComplete} />
        )}

        {view === 'talk' && (
          <div className="spp-form-wrap">
            <div className="spp-breadcrumb">
              <button className="spp-crumb-btn" onClick={() => setView('choose')}>← Choose path</button>
            </div>
            <TalkToUs onClose={() => navigate('/')} />
          </div>
        )}
      </div>
    </div>
  );
}