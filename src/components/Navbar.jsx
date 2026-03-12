import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NAV_ITEMS = ['Services', 'Work', 'Process', 'Reviews', 'FAQ'];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // For nav items: on homepage use anchor scroll, on other pages navigate
  const handleNavClick = (e, item) => {
    setMobileOpen(false);

    // "Work" always goes to the dedicated projects page
    if (item === 'Work') {
      e.preventDefault();
      navigate('/projects');
      return;
    }

    // Other items: if not on homepage, go home first then scroll
    if (!isHome) {
      e.preventDefault();
      navigate(`/#${item.toLowerCase()}`);
    }
    // If on homepage, the default <a href="#x"> scroll behaviour handles it
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="nav-logo">
          VELOCE<span>.</span>STUDIO
        </a>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={item === 'Work' ? '/projects' : `#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link to="/start-project" className="nav-cta nav-cta--desktop">
          Start a Project
        </Link>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="nav-ham-line" />
          <span className="nav-ham-line" />
          <span className="nav-ham-line" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`nav-mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="nav-mobile-inner">
          <ul className="nav-mobile-links">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item}
                className="nav-mobile-item"
                style={{ animationDelay: mobileOpen ? `${i * 0.07}s` : '0s' }}
              >
                <a
                  href={item === 'Work' ? '/projects' : `#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <span className="nav-mobile-num">0{i + 1}</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-mobile-footer">
            <Link
              to="/start-project"
              className="nav-mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              Start a Project →
            </Link>
            <a href="mailto:Veloce.studio@proton.me" className="nav-mobile-email">
              Veloce.studio@proton.me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}