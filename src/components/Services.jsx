import { useSectionReveal } from '../hooks/useReveal';
import './Services.css';

const SERVICES = [
  {
    num: '01',
    name: 'Web Design & Development',
    desc: 'Custom-built websites from scratch — no templates, no shortcuts. Designed to convert and engineered to perform.',
    items: ['Custom UI/UX Design', 'Responsive Development', 'CMS Integration', 'Performance Optimization'],
  },
  {
    num: '02',
    name: 'Landing Pages',
    desc: 'High-converting single pages built for launches, campaigns, and lead generation. Fast turnaround, maximum impact.',
    items: ['Conversion-Focused Design', 'A/B Test Ready', 'Copy Guidance', 'Analytics Setup'],
  },
  {
    num: '03',
    name: 'E-Commerce Stores',
    desc: 'Shopify and WooCommerce stores built to sell — beautiful, intuitive, and optimized for the full buying journey.',
    items: ['Shopify / WooCommerce', 'Product Page Design', 'Checkout Optimization', 'Inventory Systems'],
  },
  {
    num: '04',
    name: 'Brand & Visual Identity',
    desc: 'Logo, color system, typography — built around your positioning so every touchpoint feels deliberate and unified.',
    items: ['Logo Design', 'Color & Type Systems', 'Brand Guidelines', 'Social Templates'],
  },
  {
    num: '05',
    name: 'SEO & Growth',
    desc: 'Technical SEO baked into every build, with ongoing strategies that bring the right people to your door — organically.',
    items: ['Technical SEO Audit', 'On-Page Optimization', 'Core Web Vitals', 'Content Strategy'],
  },
  {
    num: '06',
    name: 'Web Apps & Dashboards',
    desc: 'Custom tools, portals, and dashboards for businesses that need more than a brochure website can offer.',
    items: ['React / Next.js Apps', 'Admin Dashboards', 'API Integrations', 'Client Portals'],
  },
];

export default function Services() {
  const sectionRef = useSectionReveal();

  return (
    <section id="services" className="services section-pad" ref={sectionRef}>
      <div className="services-header">
        <div>
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">What We Do</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            Our <em>Services</em>
          </h2>
        </div>
        <p className="services-intro reveal">
          From a simple landing page to a full e-commerce platform — we scope it,
          design it, build it, and hand it off ready to perform.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            className={`service-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 5)}` : ''}`}
          >
            <span className="service-num">{s.num}</span>
            <div className="service-name">{s.name}</div>
            <p className="service-desc">{s.desc}</p>
            <ul className="service-list">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
