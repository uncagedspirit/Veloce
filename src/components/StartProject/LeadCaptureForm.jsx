import { useState, useEffect, useRef, useCallback } from 'react';
import { DraftManager } from '../../services/draftManager';
import { SupabaseService } from '../../services/supabaseService';

const PROJECT_TYPES = [
  'Website', 'Landing page', 'Ecommerce store',
  'Web application', 'Brand identity', 'SEO / growth', 'Not sure yet', 'Other',
];

const BUDGETS = ['Under $1k', '$1k – $3k', '$3k – $7k', '$7k+', 'Not sure yet'];
const TIMELINES = ['ASAP', '2 – 4 weeks', '1 – 2 months', 'Flexible', 'Not sure yet'];

const ENCOURAGEMENTS = {
  3: '✦ Halfway there — you\'re doing great.',
  5: '✦ Almost done with the basics.',
};

const QUESTIONS = [
  {
    id: 'name',
    type: 'text',
    question: "What's your name?",
    hint: 'First and last name',
    placeholder: 'Alex Johnson',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    question: "What's your email address?",
    hint: "We'll only use this to follow up on your project",
    placeholder: 'alex@yourcompany.com',
    required: true,
  },
  {
    id: 'company',
    type: 'text',
    question: 'Company or project name?',
    hint: 'Leave blank if you\'re a solo founder',
    placeholder: 'Acme Inc.',
    required: false,
    skipLabel: "I'm a solo founder",
  },
  {
    id: 'website',
    type: 'url',
    question: 'Do you have a current website?',
    hint: 'Share the URL if you have one — helps us understand your baseline',
    placeholder: 'https://yoursite.com',
    required: false,
    skipLabel: "Don't have one yet",
  },
  {
    id: 'project_type',
    type: 'select',
    question: 'What type of project do you need?',
    hint: 'Pick the closest match — we can discuss further on the call',
    options: PROJECT_TYPES,
    required: true,
  },
  {
    id: 'budget',
    type: 'select',
    question: "What's your rough budget?",
    hint: 'No commitment — this just helps us scope the right solution',
    options: BUDGETS,
    required: true,
  },
  {
    id: 'timeline',
    type: 'select',
    question: 'When do you need this live?',
    hint: 'We\'ll always be honest if the timeline is tight',
    options: TIMELINES,
    required: true,
  },
  {
    id: 'description',
    type: 'textarea',
    question: 'Tell us about your project.',
    hint: 'No need to be perfect here — just give us the gist',
    placeholder: 'We\'re building a SaaS product for HR teams and need a marketing site that communicates our value clearly...',
    required: true,
  },
];

function useAutoSave(answers, delay = 800) {
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved
  const timerRef = useRef(null);

  const triggerSave = useCallback((data) => {
    setSaveStatus('saving');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      DraftManager.saveLead(data);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, delay);
  }, [delay]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { saveStatus, triggerSave };
}

function SaveIndicator({ status }) {
  if (status === 'idle') return null;
  return (
    <div className="sp-save-status">
      <div className={`sp-save-dot ${status}`} />
      {status === 'saving' ? 'Saving…' : '✓ Saved'}
    </div>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="sp-progress-wrap">
      <div className="sp-progress-meta">
        <span className="sp-progress-step">
          Question {current + 1} of {total}
        </span>
        <span className="sp-progress-pct">{pct}%</span>
      </div>
      <div className="sp-progress-bar">
        <div className="sp-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function LeadCaptureForm({ onComplete }) {
  const [phase, setPhase] = useState('intro'); // intro | questions | submitting | done
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const [direction, setDirection] = useState('forward');
  const [animKey, setAnimKey] = useState(0);
  const inputRef = useRef(null);
  const { saveStatus, triggerSave } = useAutoSave(answers);

  // Restore draft on mount
  useEffect(() => {
    const draft = DraftManager.loadLead();
    if (draft && draft._step !== undefined) {
      const { _step, _id, _savedAt, ...rest } = draft;
      setAnswers(rest);
      // We show the intro anyway, user chooses to resume
    }
  }, []);

  // Focus input on question change
  useEffect(() => {
    if (phase === 'questions') {
      setTimeout(() => inputRef.current?.focus(), 450);
    }
  }, [current, phase]);

  const q = QUESTIONS[current];

  const handleAnswer = useCallback((value, autoAdvance = false) => {
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    triggerSave({ ...updated, _step: current });
    setError('');
    if (autoAdvance) {
      setTimeout(() => advance(updated), 280);
    }
  }, [answers, q, current, triggerSave]);

  const advance = useCallback((currentAnswers = answers) => {
    const val = currentAnswers[q.id];
    if (q.required && (!val || (typeof val === 'string' && !val.trim()))) {
      setError('This field is required to continue.');
      return;
    }
    if (current === QUESTIONS.length - 1) {
      submit(currentAnswers);
    } else {
      setDirection('forward');
      setAnimKey(k => k + 1);
      setCurrent(c => c + 1);
      setInputVal('');
      setError('');
    }
  }, [answers, q, current]);

  const goBack = useCallback(() => {
    if (current === 0) { setPhase('intro'); return; }
    setDirection('backward');
    setAnimKey(k => k + 1);
    setCurrent(c => c - 1);
    setError('');
  }, [current]);

  const skipQuestion = useCallback(() => {
    const updated = { ...answers, [q.id]: '' };
    setAnswers(updated);
    triggerSave({ ...updated, _step: current });
    setDirection('forward');
    setAnimKey(k => k + 1);
    setCurrent(c => c + 1);
    setInputVal('');
    setError('');
  }, [answers, q, current, triggerSave]);

const submit = useCallback(async (finalAnswers) => {
    setPhase('submitting');
    let leadId = null;

    try {
      const lead = await SupabaseService.createLead({
        name:         finalAnswers.name,
        email:        finalAnswers.email,
        company:      finalAnswers.company      || null,
        website:      finalAnswers.website      || null,
        project_type: finalAnswers.project_type || null,
        budget:       finalAnswers.budget       || null,
        timeline:     finalAnswers.timeline     || null,
        description:  finalAnswers.description  || null,
        status: 'new',
      });

      // lead.id is the real UUID from Supabase
      leadId = lead?.id ?? null;
    } catch (err) {
      console.error('Lead submission error:', err);
      // leadId stays null — questionnaire will save without a FK link
    }

    // Save to draft: _id is either a real UUID or null (never "local_XYZ")
    DraftManager.saveLead({ ...finalAnswers, _id: leadId, _step: QUESTIONS.length });
    setPhase('done');
    // Pass real UUID (or null) to parent — DiscoveryQuestionnaire handles null safely
    onComplete?.(leadId, finalAnswers);
  }, [onComplete]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && q?.type !== 'textarea') {
      e.preventDefault();
      advance();
    }
  };

  // ─── Intro screen ───
  if (phase === 'intro') {
    const draft = DraftManager.loadLead();
    return (
      <div className="sp-lc-wrap">
        <div className="sp-intro">
          <div className="sp-intro-eyebrow">Step 1 of 2</div>
          <h2 className="sp-intro-title">
            Let's Start<br /><em>Building</em>
          </h2>
          <p className="sp-intro-sub">
            Tell us the basics about your project. This takes about 3 minutes
            — we'll use it to prepare a focused strategy call.
          </p>

          <div className="sp-intro-time">
            <div className="sp-intro-time-dot" />
            8 quick questions · ~3 minutes
          </div>

          <p className="sp-frame-txt">
            "This helps us prepare a better proposal for you."
          </p>

          <div className="sp-intro-preview">
            {QUESTIONS.map((qs, i) => (
              <div className="sp-intro-preview-item" key={qs.id}>
                <span className="sp-intro-preview-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{qs.question}</span>
              </div>
            ))}
          </div>

          {draft && draft._step > 0 && (
            <div style={{ marginBottom: 16, padding: '12px 20px', border: '1px solid rgba(139,191,191,0.25)', background: 'rgba(28,79,79,0.15)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal-pale)' }} />
              <span style={{ fontSize: 13, color: 'var(--teal-pale)', flex: 1 }}>
                Draft found — continue where you left off
              </span>
              <button
                style={{ fontFamily: 'Syne,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal-pale)', background: 'none', border: '1px solid rgba(139,191,191,0.4)', padding: '6px 16px', cursor: 'pointer' }}
                onClick={() => {
                  const { _step, _id, _savedAt, ...rest } = draft;
                  setAnswers(rest);
                  setCurrent(Math.min(_step, QUESTIONS.length - 1));
                  setPhase('questions');
                }}
              >
                Resume
              </button>
            </div>
          )}

          <button className="sp-start-btn" onClick={() => setPhase('questions')}>
            <span>Begin Questionnaire →</span>
          </button>
        </div>
      </div>
    );
  }

  // ─── Submitting ───
  if (phase === 'submitting') {
    return (
      <div className="sp-lc-wrap">
        <div className="sp-intro" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 24 }}>⟳</div>
          <p style={{ color: 'var(--fg-dim)' }}>Saving your information…</p>
        </div>
      </div>
    );
  }

  // ─── Success ───
  if (phase === 'done') {
    return (
      <div className="sp-lc-wrap">
        <div className="sp-success">
          <div className="sp-success-mark">✓</div>
          <div className="sp-success-eyebrow">Step 1 Complete</div>
          <h2 className="sp-success-title">
            You're In<em>.</em>
          </h2>
          <p className="sp-success-sub">
            Your project details are saved. Continue to the discovery questionnaire
            to help us prepare a sharper proposal — or come back to it later.
          </p>
          <div className="sp-success-steps">
            <div className="sp-success-step">
              <div className="sp-success-step-num">NEXT UP</div>
              <div className="sp-success-step-text">Step 2 — Detailed discovery questionnaire (5 min)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Questions ───
  const currentValue = answers[q.id] ?? '';
  const encourage = ENCOURAGEMENTS[current];

  return (
    <div className="sp-lc-wrap">
      <ProgressBar current={current} total={QUESTIONS.length} />

      <div className="sp-q-outer">
        {encourage && (
          <div className="sp-encourage">{encourage}</div>
        )}

        <div
          key={animKey}
          className={`sp-question-card sp-slide-enter-${direction}`}
        >
          <div className="sp-q-label">Question {current + 1} of {QUESTIONS.length}</div>
          <div className="sp-q-text">{q.question}</div>
          {q.hint && <div className="sp-q-hint">{q.hint}</div>}

          {/* Text / email / url inputs */}
          {['text', 'email', 'url'].includes(q.type) && (
            <div className="sp-input-wrap">
              <input
                ref={inputRef}
                className="sp-input"
                type={q.type}
                placeholder={q.placeholder}
                value={currentValue}
                onChange={e => handleAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {error && <div className="sp-field-error">{error}</div>}
            </div>
          )}

          {/* Textarea */}
          {q.type === 'textarea' && (
            <div className="sp-input-wrap">
              <textarea
                ref={inputRef}
                className="sp-input sp-textarea"
                placeholder={q.placeholder}
                value={currentValue}
                onChange={e => handleAnswer(e.target.value)}
              />
              {error && <div className="sp-field-error">{error}</div>}
            </div>
          )}

          {/* Single select */}
          {q.type === 'select' && (
            <div className="sp-options">
              {q.options.map((opt, i) => {
                const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                return (
                  <button
                    key={opt}
                    className={`sp-option ${currentValue === opt ? 'selected' : ''}`}
                    onClick={() => handleAnswer(opt, true)}
                  >
                    <span className="sp-option-key">{keys[i]}</span>
                    <span className="sp-option-text">{opt}</span>
                    <div className="sp-option-check">
                      {currentValue === opt ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
              {error && <div className="sp-field-error">{error}</div>}
            </div>
          )}

          <div className="sp-q-nav">
            <button className="sp-btn-back" onClick={goBack}>
              ← Back
            </button>

            {q.type !== 'select' && (
              <button
                className="sp-btn-continue"
                onClick={() => advance()}
                disabled={q.required && !currentValue?.trim()}
              >
                {current === QUESTIONS.length - 1 ? 'Submit' : 'Continue'}
                <span style={{ fontSize: 14 }}>→</span>
              </button>
            )}

            {!q.required && q.skipLabel && (
              <button className="sp-skip-btn" onClick={skipQuestion}>
                {q.skipLabel}
              </button>
            )}

            <SaveIndicator status={saveStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}