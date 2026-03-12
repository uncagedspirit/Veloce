import { Link } from 'react-router-dom';
import './Footer.css';

const SOCIALS = ['X', 'IG', 'LI', 'BE'];

const NAV_SERVICES = ['Web Design', 'Landing Pages', 'E-Commerce', 'Brand Identity', 'SEO & Growth', 'Web Apps'];

// Company nav — each item has a label and either an internal route or an anchor
const NAV_COMPANY = [
  { label: 'About',    to: null, href: '#about'    },
  { label: 'Work',     to: '/projects', href: null  }, // → dedicated projects page
  { label: 'Process',  to: null, href: '#process'  },
  { label: 'Reviews',  to: null, href: '#reviews'  },
  { label: 'FAQ',      to: null, href: '#faq'      },
];

const NAV_CONTACT = [
  { label: 'Veloce.studio@proton.me', href: 'mailto:Veloce.studio@proton.me' },
  { label: 'Start a Project',         href: '/start-project', internal: true },
  { label: 'Request a Quote',         href: '/start-project', internal: true },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand */}
        <div>
          <div className="footer-brand-name">
            VELOCE<span>.</span>STUDIO
          </div>
          <p className="footer-tagline">
            We design and build digital experiences that drive real growth for
            businesses that refuse to settle.
          </p>
          <div className="footer-social">
            {SOCIALS.map((s) => (
              <a key={s} href="#" className="footer-social-link">{s}</a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            {NAV_SERVICES.map((s) => (
              <li key={s}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            {NAV_COMPANY.map((item) => (
              <li key={item.label}>
                {item.to
                  ? <Link to={item.to}>{item.label}</Link>
                  : <a href={item.href}>{item.label}</a>
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">Get In Touch</div>
          <ul className="footer-links">
            {NAV_CONTACT.map((c) => (
              <li key={c.label}>
                {c.internal
                  ? <Link to={c.href}>{c.label}</Link>
                  : <a href={c.href}>{c.label}</a>
                }
              </li>
            ))}
          </ul>
          <div className="footer-response-box">
            <div className="footer-response-label">Response Time</div>
            <div className="footer-response-value">Within 24 Hours</div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © 2025 Veloce<span>.</span>Studio — All rights reserved
        </div>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}