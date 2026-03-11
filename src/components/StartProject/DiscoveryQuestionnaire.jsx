import { useState, useEffect, useRef, useCallback } from 'react';
import { DraftManager } from '../../services/draftManager';
import { SupabaseService } from '../../services/supabaseService';

/* ─── Data ─── */
const BUSINESS_TYPES = ['Service business', 'Ecommerce', 'SaaS / software', 'Personal brand', 'Startup', 'Agency', 'Other'];
const AUDIENCES      = ['B2B', 'B2C', 'Both', 'Not sure yet'];
const GOALS          = ['Generate leads', 'Sell products', 'Showcase brand', 'Launch product', 'Build credibility', 'Not sure yet'];
const PERSONALITIES  = ['Modern', 'Minimal', 'Premium', 'Corporate', 'Bold', 'Playful', 'Futuristic', 'Elegant'];
const DESIGN_LIKES   = ['Layout', 'Colors', 'Typography', 'Animations', 'Minimalism', 'Overall style'];
const PAGES          = ['Home', 'About', 'Services', 'Pricing', 'Portfolio', 'Blog', 'Contact', 'Landing pages', 'Careers', 'FAQ', 'Not sure yet'];
const CONTENT_STATUS = ['Content ready', 'Need copywriting', 'Need images', 'Nothing ready yet'];
const BRAND_ASSETS   = ['Logo', 'Colors', 'Typography', 'Brand guidelines', 'None yet'];
const FEATURES       = ['Blog system', 'Booking system', 'Payment processing', 'Client portal', 'Membership area', 'Admin dashboard', 'API integrations', 'Inventory system'];
const CMS_OPTIONS    = ['WordPress', 'Shopify', 'Webflow', 'Headless CMS', 'No preference', 'Not sure'];
const MARKETING_TOOLS = ['Google Analytics', 'Facebook / Meta Pixel', 'Google Tag Manager', 'Email marketing integration', 'SEO optimization'];
const SEO_LEVELS     = ['Basic setup', 'Advanced strategy', 'Ongoing SEO', 'Not sure'];

const SECTIONS = [
  { id: 'business',  num: '01', title: 'Business', titleFull: 'Business & Goals',        em: 'Goals'     },
  { id: 'design',    num: '02', title: 'Design',   titleFull: 'Design Direction',        em: 'Direction' },
  { id: 'structure', num: '03', title: 'Structure', titleFull: 'Website Structure',       em: 'Structure' },
  { id: 'content',   num: '04', title: 'Content',  titleFull: 'Content & Brand Assets',  em: 'Assets'    },
  { id: 'features',  num: '05', title: 'Features', titleFull: 'Features & Integrations', em: 'Features'  },
  { id: 'marketing', num: '06', title: 'Marketing', titleFull: 'Marketing & Growth',     em: 'Growth'    },
  { id: 'final',     num: '07', title: 'Goals',    titleFull: 'Final Questions',          em: 'Questions' },
];

const SLIDERS = [
  { id: 'minimal_complex',    left: 'Minimal',    right: 'Complex'     },
  { id: 'corporate_creative', left: 'Corporate',  right: 'Creative'    },
  { id: 'classic_modern',     left: 'Classic',    right: 'Modern'      },
  { id: 'static_interactive', left: 'Static',     right: 'Interactive' },
];

/* ─── Sub-components ─── */
function ChipSelect({ options, value = [], onChange, max }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt));
    } else {
      if (max && value.length >= max) return;
      onChange([...value, opt]);
    }
  };
  return (
    <div className="sp-chips">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className={`sp-chip ${value.includes(opt) ? 'selected' : ''}`}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SingleSelect({ options, value, onChange }) {
  return (
    <div className="sp-options">
      {options.map((opt, i) => {
        const keys = ['A','B','C','D','E','F','G','H','I','J'];
        return (
          <button
            key={opt}
            type="button"
            className={`sp-option ${value === opt ? 'selected' : ''}`}
            onClick={() => onChange(opt)}
          >
            <span className="sp-option-key">{keys[i]}</span>
            <span className="sp-option-text">{opt}</span>
            <div className="sp-option-check">{value === opt ? '✓' : ''}</div>
          </button>
        );
      })}
    </div>
  );
}

function SliderRow({ label, leftLabel, rightLabel, value = 3, onChange }) {
  const LABELS = ['Strongly', 'Leaning', 'Balanced', 'Leaning', 'Strongly'];
  return (
    <div className="sp-slider-wrap">
      <div className="sp-slider-labels">
        <span className="sp-slider-label-left">{leftLabel}</span>
        <span className="sp-slider-label-right">{rightLabel}</span>
      </div>
      <input
        type="range"
        min={1} max={5}
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="sp-slider"
      />
      <div className="sp-slider-value">
        {value <= 2 ? leftLabel : value >= 4 ? rightLabel : 'Balanced'} ({value}/5)
      </div>
    </div>
  );
}

function ToggleBtn({ value, onChange }) {
  return (
    <div className="sp-toggle-row">
      <button type="button" className={`sp-toggle-btn ${value === true ? 'active' : ''}`} onClick={() => onChange(true)}>Yes</button>
      <button type="button" className={`sp-toggle-btn ${value === false ? 'active' : ''}`} onClick={() => onChange(false)}>No</button>
      <button type="button" className={`sp-toggle-btn ${value === null ? 'active' : ''}`} onClick={() => onChange(null)}>Not Sure</button>
    </div>
  );
}

function SaveBadge({ status }) {
  if (status === 'idle') return null;
  return (
    <div className="sp-save-status">
      <div className={`sp-save-dot ${status}`} />
      {status === 'saving' ? 'Saving…' : '✓ Saved'}
    </div>
  );
}

/* ─── Sections ─── */
function SectionBusiness({ answers, onChange }) {
  return (
    <>
      <div className="sp-field">
        <div className="sp-field-label">What does your business primarily do?</div>
        <SingleSelect options={BUSINESS_TYPES} value={answers.business_type} onChange={v => onChange('business_type', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">Who is your target audience?</div>
        <SingleSelect options={AUDIENCES} value={answers.target_audience} onChange={v => onChange('target_audience', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">Primary goal of the website?</div>
        <SingleSelect options={GOALS} value={answers.website_goal} onChange={v => onChange('website_goal', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">
          What problem should this website solve?
          <span className="sp-field-optional">Required</span>
        </div>
        <div className="sp-field-sublabel">e.g. low conversion, outdated brand, poor SEO, no online presence</div>
        <textarea
          className="sp-input sp-textarea"
          style={{ minHeight: 100 }}
          placeholder="Describe the core problem you need solved..."
          value={answers.problem_to_solve || ''}
          onChange={e => onChange('problem_to_solve', e.target.value)}
        />
      </div>
    </>
  );
}

function SectionDesign({ answers, onChange }) {
  const inspirationSites = answers.inspiration_sites || ['', '', ''];
  const designLikes = answers.design_likes || [];
  const designSpectrum = answers.design_spectrum || {};
  const brandPersonality = answers.brand_personality || [];

  const updateSite = (i, val) => {
    const updated = [...inspirationSites];
    updated[i] = val;
    onChange('inspiration_sites', updated);
  };

  return (
    <>
      <div className="sp-field">
        <div className="sp-field-label">Share 3 websites you like</div>
        <div className="sp-field-sublabel">URLs of sites whose design resonates with you</div>
        <div className="sp-url-inputs">
          {[0, 1, 2].map(i => (
            <div className="sp-url-row" key={i}>
              <span className="sp-url-num">{i + 1}.</span>
              <input
                className="sp-input"
                type="url"
                placeholder="https://example.com"
                value={inspirationSites[i] || ''}
                onChange={e => updateSite(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sp-field">
        <div className="sp-field-label">What do you like about them?</div>
        <ChipSelect options={DESIGN_LIKES} value={designLikes} onChange={v => onChange('design_likes', v)} />
      </div>

      <div className="sp-field">
        <div className="sp-field-label">Brand personality</div>
        <div className="sp-field-sublabel">Select all that apply</div>
        <ChipSelect options={PERSONALITIES} value={brandPersonality} onChange={v => onChange('brand_personality', v)} />
      </div>

      <div className="sp-field">
        <div className="sp-field-label">Design spectrum</div>
        <div className="sp-field-sublabel">Drag each slider to describe your aesthetic preference</div>
        {SLIDERS.map(sl => (
          <SliderRow
            key={sl.id}
            leftLabel={sl.left}
            rightLabel={sl.right}
            value={designSpectrum[sl.id] || 3}
            onChange={v => onChange('design_spectrum', { ...designSpectrum, [sl.id]: v })}
          />
        ))}
      </div>
    </>
  );
}

function SectionStructure({ answers, onChange }) {
  const pages = answers.pages_needed || [];
  return (
    <>
      <div className="sp-field">
        <div className="sp-field-label">Which pages do you need?</div>
        <div className="sp-field-sublabel">Select all that apply — you can refine this later</div>
        <ChipSelect options={PAGES} value={pages} onChange={v => onChange('pages_needed', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">Any specific page requirements?<span className="sp-field-optional">Optional</span></div>
        <textarea
          className="sp-input sp-textarea"
          style={{ minHeight: 90 }}
          placeholder="e.g. We need a client login portal, a custom pricing calculator page..."
          value={answers.page_notes || ''}
          onChange={e => onChange('page_notes', e.target.value)}
        />
      </div>
    </>
  );
}

function SectionContent({ answers, onChange }) {
  const brandAssets = answers.brand_assets || [];
  return (
    <>
      <div className="sp-field">
        <div className="sp-field-label">Content readiness</div>
        <SingleSelect options={CONTENT_STATUS} value={answers.content_status} onChange={v => onChange('content_status', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">Brand assets available</div>
        <ChipSelect options={BRAND_ASSETS} value={brandAssets} onChange={v => onChange('brand_assets', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">Do you own a domain?</div>
        <ToggleBtn value={answers.has_domain ?? null} onChange={v => onChange('has_domain', v)} />
      </div>
      <div className="sp-field" style={{ marginTop: 24 }}>
        <div className="sp-field-label">Do you have hosting?</div>
        <ToggleBtn value={answers.has_hosting ?? null} onChange={v => onChange('has_hosting', v)} />
      </div>
    </>
  );
}

function SectionFeatures({ answers, onChange }) {
  const features = answers.features_required || [];
  return (
    <>
      <div className="sp-field">
        <div className="sp-field-label">Required features</div>
        <div className="sp-field-sublabel">Select everything that applies</div>
        <ChipSelect options={FEATURES} value={features} onChange={v => onChange('features_required', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">CMS preference</div>
        <SingleSelect options={CMS_OPTIONS} value={answers.cms_preference} onChange={v => onChange('cms_preference', v)} />
      </div>
    </>
  );
}

function SectionMarketing({ answers, onChange }) {
  const tools = answers.marketing_tools || [];
  return (
    <>
      <div className="sp-field">
        <div className="sp-field-label">Marketing integrations needed</div>
        <ChipSelect options={MARKETING_TOOLS} value={tools} onChange={v => onChange('marketing_tools', v)} />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">SEO approach</div>
        <SingleSelect options={SEO_LEVELS} value={answers.seo_level} onChange={v => onChange('seo_level', v)} />
      </div>
    </>
  );
}

function SectionFinal({ answers, onChange }) {
  return (
    <>
      <div className="sp-encourage" style={{ marginBottom: 32 }}>
        ✦ You're almost done — just two final questions.
      </div>
      <div className="sp-field">
        <div className="sp-field-label">What will define success for this project?</div>
        <div className="sp-field-sublabel">e.g. more leads, more sales, stronger brand presence, better conversions</div>
        <textarea
          className="sp-input sp-textarea"
          style={{ minHeight: 100 }}
          placeholder="Success for us means..."
          value={answers.success_definition || ''}
          onChange={e => onChange('success_definition', e.target.value)}
        />
      </div>
      <div className="sp-field">
        <div className="sp-field-label">If this project succeeds, what changes for your business?</div>
        <div className="sp-field-sublabel">Think big — e.g. more clients, investor credibility, brand authority</div>
        <textarea
          className="sp-input sp-textarea"
          style={{ minHeight: 100 }}
          placeholder="If the new site does its job, we'll..."
          value={answers.business_outcome || ''}
          onChange={e => onChange('business_outcome', e.target.value)}
        />
      </div>
    </>
  );
}

const SECTION_COMPONENTS = [
  SectionBusiness, SectionDesign, SectionStructure,
  SectionContent, SectionFeatures, SectionMarketing, SectionFinal,
];

/* ─── Main Component ─── */
export default function DiscoveryQuestionnaire({ leadId, onComplete }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saveStatus, setSaveStatus] = useState('idle');
  const [phase, setPhase] = useState('form'); // form | submitting | done
  const saveTimer = useRef(null);
  const contentRef = useRef(null);

  // Restore draft
  useEffect(() => {
    const draft = DraftManager.loadQuestionnaire();
    if (draft) {
      const { _section, _savedAt, ...rest } = draft;
      setAnswers(rest);
      if (_section !== undefined) setCurrentSection(_section);
    }
  }, []);

  const triggerSave = useCallback((data, section) => {
    setSaveStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      DraftManager.saveQuestionnaire({ ...data, _section: section });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 600);
  }, []);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const handleChange = useCallback((field, value) => {
    setAnswers(prev => {
      const updated = { ...prev, [field]: value };
      triggerSave(updated, currentSection);
      return updated;
    });
  }, [currentSection, triggerSave]);

  const scrollTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextSection = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(s => s + 1);
      scrollTop();
    } else {
      handleSubmit();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(s => s - 1);
      scrollTop();
    }
  };

  const handleSubmit = async () => {
    setPhase('submitting');
    try {
      await SupabaseService.submitQuestionnaire({
        lead_id: leadId || DraftManager.getLeadId(),
        business_type: answers.business_type,
        target_audience: answers.target_audience,
        website_goal: answers.website_goal,
        problem_to_solve: answers.problem_to_solve,
        brand_personality: answers.brand_personality,
        design_spectrum: answers.design_spectrum,
        inspiration_sites: answers.inspiration_sites,
        pages_needed: answers.pages_needed,
        content_status: answers.content_status,
        brand_assets: answers.brand_assets,
        has_domain: answers.has_domain,
        has_hosting: answers.has_hosting,
        features_required: answers.features_required,
        cms_preference: answers.cms_preference,
        marketing_tools: answers.marketing_tools,
        seo_level: answers.seo_level,
        success_definition: answers.success_definition,
        business_outcome: answers.business_outcome,
      });
    } catch (err) {
      console.error('Questionnaire submit error:', err);
    }
    DraftManager.clear();
    setPhase('done');
    onComplete?.();
  };

  if (phase === 'submitting') {
    return (
      <div className="sp-lc-wrap">
        <div style={{ textAlign: 'center', color: 'var(--fg-dim)' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⟳</div>
          Submitting your questionnaire…
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="sp-lc-wrap">
        <div className="sp-success">
          <div className="sp-success-mark">✓</div>
          <div className="sp-success-eyebrow">Questionnaire Complete</div>
          <h2 className="sp-success-title">
            All Done<em>.</em>
          </h2>
          <p className="sp-success-sub">
            We've received everything we need to prepare a focused proposal.
            Expect to hear from us within 24 hours.
          </p>
          <div className="sp-success-steps">
            <div className="sp-success-step">
              <div className="sp-success-step-num">01 — NEXT</div>
              <div className="sp-success-step-text">Strategy call scheduled within 24 hours</div>
            </div>
            <div className="sp-success-step">
              <div className="sp-success-step-num">02 — THEN</div>
              <div className="sp-success-step-text">Custom proposal prepared for your project</div>
            </div>
            <div className="sp-success-step">
              <div className="sp-success-step-num">03 — FINAL</div>
              <div className="sp-success-step-text">Contract signed, project kicks off</div>
            </div>
          </div>
          <div className="sp-success-actions">
            <a href="mailto:Veloce.studio@proton.me" className="sp-btn-continue" style={{ textDecoration: 'none' }}>
              Email Us Directly
            </a>
          </div>
        </div>
      </div>
    );
  }

  const SectionComp = SECTION_COMPONENTS[currentSection];
  const sec = SECTIONS[currentSection];
  const isLast = currentSection === SECTIONS.length - 1;
  const overallPct = Math.round(((currentSection) / SECTIONS.length) * 100);

  return (
    <div className="sp-dq-wrap">
      {/* Sidebar */}
      <div className="sp-dq-sidebar">
        <div className="sp-dq-sidebar-title">Step 2 of 2 — Discovery</div>

        {/* Overall progress */}
        <div style={{ marginBottom: 32 }}>
          <div className="sp-progress-meta">
            <span className="sp-progress-step">Section {currentSection + 1} of {SECTIONS.length}</span>
            <span className="sp-progress-pct">{overallPct}%</span>
          </div>
          <div className="sp-progress-bar">
            <div className="sp-progress-fill" style={{ width: `${overallPct}%` }} />
          </div>
        </div>

        <div className="sp-dq-nav-items">
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              className={`sp-dq-nav-item ${i === currentSection ? 'active' : ''} ${i < currentSection ? 'done' : ''}`}
              onClick={() => { setCurrentSection(i); scrollTop(); }}
            >
              <div className="sp-dq-nav-dot">
                {i < currentSection ? '✓' : s.num}
              </div>
              <span className="sp-dq-nav-label">{s.title}</span>
            </div>
          ))}
        </div>

        <div className="sp-dq-sidebar-footer">
          <SaveBadge status={saveStatus} />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="sp-overlay-body" style={{ overflow: 'auto' }}>
        <div className="sp-dq-content">
          <div className="sp-dq-section-header">
            <div className="sp-dq-section-num">{sec.num} / {SECTIONS.length}</div>
            <h2 className="sp-dq-section-title">
              {sec.titleFull.replace(sec.em, '')}
              <em>{sec.em}</em>
            </h2>
          </div>

          <SectionComp answers={answers} onChange={handleChange} />

          <div className="sp-dq-nav-btns">
            {currentSection > 0 && (
              <button className="sp-btn-back" onClick={prevSection}>← Back</button>
            )}
            <button
              className="sp-btn-continue"
              onClick={nextSection}
              style={{ marginLeft: currentSection > 0 ? 0 : 'auto' }}
            >
              {isLast ? 'Submit Questionnaire' : 'Next Section'}
              <span style={{ fontSize: 14 }}>→</span>
            </button>
            <SaveBadge status={saveStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}