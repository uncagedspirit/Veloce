import { useSectionReveal } from '../hooks/useReveal';
import './Process.css';

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'A 30-minute call to understand your goals, audience, and what success looks like for you. We scope the project and send a proposal.' },
  { num: '02', title: 'Design',    desc: 'Full Figma mockups — every page, every state. You get two rounds of revisions before a single line of code is written.' },
  { num: '03', title: 'Build',     desc: 'We develop your site with clean, fast code. You get access to a live preview link throughout — no waiting until the end.' },
  { num: '04', title: 'Launch',    desc: 'We handle deployment, domain setup, and final QA. You get a handoff walkthrough and 30 days of post-launch support.' },
];

export default function Process() {
  const sectionRef = useSectionReveal();

  return (
    <section id="process" className="process section-pad" ref={sectionRef}>
      <div className="section-label reveal">
        <div className="section-label-line" />
        <span className="section-label-text">How We Work</span>
      </div>
      <h2 className="section-title reveal reveal-delay-1" style={{ marginBottom: 0 }}>
        The <em>Process</em>
      </h2>

      <div className="process-steps">
        <div className="process-connector" />
        {STEPS.map((s, i) => (
          <div key={s.num} className={`process-step reveal reveal-delay-${i + 1}`}>
            <div className="process-dot">{s.num}</div>
            <div className="process-step-title">{s.title}</div>
            <p className="process-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
