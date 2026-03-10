import { useEffect, useRef, useState } from 'react';
import { useSectionReveal } from '../hooks/useReveal';
import './Stats.css';

const STATS = [
  { value: 47, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 3,  suffix: '×', label: 'Avg. Conversion Lift' },
  { value: 14, suffix: 'd', label: 'Avg. Turnaround' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatItem({ value, suffix, label, delay, animate }) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div className={`stat-item reveal reveal-delay-${delay}`}>
      <div className="stat-number">
        {count}<span>{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useSectionReveal();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="stats" className="stats-section" ref={sectionRef}>
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i} animate={animate} />
        ))}
      </div>
    </div>
  );
}
