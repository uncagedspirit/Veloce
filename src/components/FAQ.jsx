import { useState, useEffect, useRef } from 'react';
import { useSectionReveal } from '../hooks/useReveal';
import './FAQ.css';

const FAQS = [
  { q: 'How much does a website cost?',             a: 'Pricing depends on the scope and complexity of your project. A basic landing page starts around $500–$900, while a full multi-page website typically ranges from $1,500–$5,000+. We always provide a fixed quote upfront — no hidden costs, no scope creep surprises.' },
  { q: 'How long does a project take?',              a: 'Most landing pages take 5–7 days. Full websites typically take 2–4 weeks depending on size and revisions. We\'ll give you a clear timeline in the proposal before any work begins — and we stick to it.' },
  { q: 'Do you work with clients globally?',         a: 'Yes — we work with clients all over the world. Our entire process is remote-first: clear communication through Notion and Slack, with video calls at key checkpoints. Timezone differences rarely cause issues with our async workflow.' },
  { q: 'Will I be able to update the site myself?',  a: 'Absolutely. We build with your independence in mind — whether that\'s a CMS like Webflow, WordPress, or a custom admin panel. We include a walkthrough session and video guide so you can manage your content with confidence.' },
  { q: 'What if I need changes after launch?',       a: 'Every project includes 30 days of post-launch support for bug fixes and minor tweaks. For ongoing changes or new features, we offer flexible monthly retainer plans. You\'re never left without support.' },
  { q: 'Do you only build websites?',                a: 'Websites are our main focus, but we also handle brand identity, logo design, SEO strategy, and light web app development. If you\'re not sure whether we can help, just reach out — we\'ll tell you honestly.' },
  { q: 'How do payments work?',                      a: 'We require a 50% deposit to start, with the remaining 50% due on launch day. For larger projects, we offer milestone-based payment plans. We accept bank transfer, Stripe, and PayPal.' },
  { q: 'Do I need to provide content and copy?',     a: 'Ideally yes — but we can help. We offer copywriting as an add-on service and can source or suggest imagery. The more you share about your brand and tone, the better we can craft messaging that resonates.' },
];

function FAQItem({ q, a, delay }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : '';
  const classes = [
    'faq-item',
    'reveal',
    delayClass,
    visible ? 'visible' : '',
    open ? 'open' : '',
  ].join(' ');

  return (
    <div className={classes} ref={ref} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <div className="faq-q-text">{q}</div>
        <div className="faq-toggle">+</div>
      </div>
      <div className="faq-answer">
        <div className="faq-answer-inner">{a}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useSectionReveal();

  const left  = FAQS.filter((_, i) => i % 2 === 0);
  const right = FAQS.filter((_, i) => i % 2 !== 0);

  return (
    <section id="faq" className="faq section-pad" ref={sectionRef}>
      <div className="section-label reveal">
        <div className="section-label-line" />
        <span className="section-label-text">FAQ</span>
      </div>
      <h2 className="section-title reveal reveal-delay-1">
        Common <em>Questions</em>
      </h2>

      <div className="faq-grid">
        <div className="faq-col">
          {left.map((item, i) => <FAQItem key={item.q} {...item} delay={i} />)}
        </div>
        <div className="faq-col">
          {right.map((item, i) => <FAQItem key={item.q} {...item} delay={i + 1} />)}
        </div>
      </div>
    </section>
  );
}