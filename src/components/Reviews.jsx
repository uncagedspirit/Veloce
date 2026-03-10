import { useSectionReveal } from '../hooks/useReveal';
import './Reviews.css';

const REVIEWS = [
  { initials: 'DK', name: 'David Kim',       role: 'Founder, Arca Apparel',     text: 'They took our dusty old site and turned it into something we\'re genuinely proud to show people. Sales are up 40% since launch. I don\'t know what magic they used.' },
  { initials: 'SR', name: 'Sofia Reyes',     role: 'CTO, Vaultrix',             text: 'Fast, professional, and they actually listen. We had a complex dashboard spec and they delivered beyond what we imagined. Will be coming back for every project.' },
  { initials: 'JM', name: 'James McAllister',role: 'Partner, Meridian Legal',   text: 'As a law firm, we needed something polished but approachable. Uncaged nailed it perfectly. Our inquiry rate has doubled since the new site went live.' },
  { initials: 'AL', name: 'Amara Levi',      role: 'Owner, Ember & Salt',       text: 'Honestly the best design investment we\'ve made. The reservation system works flawlessly and guests constantly compliment our website before they\'ve even walked in.' },
  { initials: 'PW', name: 'Priya Watts',     role: 'Director, Pinnacle Properties', text: 'The turnaround blew my mind — 12 days from kickoff to launch. And it looked incredible. I\'ve already referred three clients. Uncaged is the real deal.' },
  { initials: 'NN', name: 'Nadia Novak',     role: 'CEO, Novak Interiors',      text: 'What stood out was their design language — nothing generic, everything intentional. Our brand finally looks as good online as it does in person. Worth every penny.' },
];

export default function Reviews() {
  const sectionRef = useSectionReveal();

  return (
    <section id="reviews" className="reviews section-pad" ref={sectionRef}>
      <div className="reviews-header">
        <div>
          <div className="section-label reveal">
            <div className="section-label-line" />
            <span className="section-label-text">Client Reviews</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            What They <em>Say</em>
          </h2>
        </div>
      </div>

      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <div key={r.name} className={`review-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 5)}` : ''}`}>
            <div className="review-quote">"</div>
            <p className="review-text">{r.text}</p>
            <div className="review-stars">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="star">★</span>
              ))}
            </div>
            <div className="review-author">
              <div className="review-avatar">{r.initials}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-role">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
