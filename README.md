# UNCAGED STUDIO — React Website

A fully componentized React website built with Vite.

## Project Structure

```
src/
├── index.css                  ← Global CSS variables & shared styles
├── main.jsx                   ← React entry point
├── App.jsx                    ← Root component — assembles all sections
├── hooks/
│   └── useReveal.js           ← Scroll reveal IntersectionObserver hooks
└── components/
    ├── Cursor.jsx / .css      ← Custom animated cursor
    ├── Navbar.jsx / .css      ← Fixed navbar with scroll effect
    ├── Hero.jsx / .css        ← Hero section + ticker
    ├── Stats.jsx / .css       ← Animated count-up stats bar
    ├── About.jsx / .css       ← About the studio
    ├── Services.jsx / .css    ← 6 service cards
    ├── Projects.jsx / .css    ← 5 portfolio project cards
    ├── Benefits.jsx / .css    ← 6 benefit cards
    ├── Process.jsx / .css     ← 4-step process timeline
    ├── Reviews.jsx / .css     ← 6 client testimonials
    ├── FAQ.jsx / .css         ← Accordion FAQ (2 columns)
    ├── CTA.jsx / .css         ← Full-bleed red CTA section
    └── Footer.jsx / .css      ← Full footer with links
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

### Colors
All colors are CSS custom properties in `src/index.css`:
```css
--red: #E03120;
--teal: #1C4F4F;
--teal-pale: #8BBFBF;
--bg: #070C0C;
```

### Content
Each component has its data at the top as a constant array — easy to swap:
- `Services.jsx` → `SERVICES` array
- `Projects.jsx` → `PROJECTS` array
- `Reviews.jsx`  → `REVIEWS` array
- `FAQ.jsx`      → `FAQS` array
- `Stats.jsx`    → `STATS` array

### Fonts
Loaded via Google Fonts in `src/index.css`:
- **Syne** — headings & UI labels
- **Cormorant Garamond** — italic display text
- **DM Sans** — body copy
