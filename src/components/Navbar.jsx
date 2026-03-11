import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        VELOCE<span>.</span>STUDIO
      </a>

      <ul className="nav-links">
        {['Services', 'Work', 'Process', 'Reviews', 'FAQ'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>

      <Link to="/start-project" className="nav-cta">
        Start a Project
      </Link>
    </nav>
  );
}