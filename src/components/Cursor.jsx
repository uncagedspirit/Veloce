import { useEffect, useRef } from 'react';
import './Cursor.css';

/** Returns true if the element (or any ancestor) is inside the CTA red section */
function isOnRedBg(el) {
  return !!el?.closest?.('.cta');
}

export default function Cursor() {
  const cursorRef  = useRef(null);
  const ringRef    = useRef(null);
  const mousePos   = useRef({ x: 0, y: 0 });
  const ringPos    = useRef({ x: 0, y: 0 });
  const rafRef     = useRef(null);
  const onRed      = useRef(false);

  useEffect(() => {
    const dot  = cursorRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── Apply black/red color depending on section ───────────
    const applyTheme = (red) => {
      onRed.current = red;
      if (red) {
        dot.style.background  = 'rgba(7,12,12,0.85)';
        ring.style.borderColor = 'rgba(7,12,12,0.45)';
      } else {
        dot.style.background  = 'var(--red)';
        ring.style.borderColor = 'rgba(224,49,32,0.5)';
      }
    };

    // ── Move dot instantly, track section ────────────────────
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      applyTheme(isOnRedBg(document.elementFromPoint(e.clientX, e.clientY)));
    };

    // ── Lag the ring ─────────────────────────────────────────
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = ringPos.current.x + 'px';
      ring.style.top  = ringPos.current.y + 'px';
      rafRef.current = requestAnimationFrame(animateRing);
    };

    // ── Event delegation for hover expand ────────────────────
    // Works on ALL elements including ones rendered later (overlay, new pages)
    const INTERACTIVE = [
      'a', 'button', '[role="button"]',
      'input', 'textarea', 'select', 'label',
      '.service-card', '.project-card', '.faq-item',
      '.sp-choice-card', '.sp-option', '.sp-chip',
      '.sp-toggle-btn', '.sp-dq-nav-item',
      '.review-card', '.benefit-card', '.tag',
    ].join(', ');

    const onEnter = (e) => {
      if (!e.target.closest(INTERACTIVE)) return;
      const red = onRed.current;
      ring.style.width       = '60px';
      ring.style.height      = '60px';
      ring.style.borderColor = red ? 'rgba(7,12,12,0.7)' : 'rgba(224,49,32,0.8)';
    };

    const onLeave = (e) => {
      if (!e.target.closest(INTERACTIVE)) return;
      ring.style.width  = '36px';
      ring.style.height = '36px';
      // color will be corrected on next mousemove via applyTheme
      applyTheme(onRed.current);
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onEnter);
    document.addEventListener('mouseout',   onLeave);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor"      ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef}   />
    </>
  );
}