import './Footer.css';

const SOCIALS = ['X', 'IG', 'LI', 'BE'];

const NAV_SERVICES = ['Web Design', 'Landing Pages', 'E-Commerce', 'Brand Identity', 'SEO & Growth', 'Web Apps'];
const NAV_COMPANY  = ['About', 'Work', 'Process', 'Reviews', 'FAQ'];
const NAV_CONTACT  = [
  { label: 'hello@uncaged.studio', href: 'mailto:hello@uncaged.studio' },
  { label: 'Start a Project',      href: '#cta' },
  { label: 'Request a Quote',      href: '#cta' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div>
          <div className="footer-brand-name">
            UNCAGED<span>.</span>STUDIO
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
            {NAV_COMPANY.map((s) => (
              <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">Get In Touch</div>
          <ul className="footer-links">
            {NAV_CONTACT.map((c) => (
              <li key={c.label}><a href={c.href}>{c.label}</a></li>
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
          © 2025 Uncaged<span>.</span>Studio — All rights reserved
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
