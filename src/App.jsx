import './index.css';

import Cursor       from './components/Cursor';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Stats        from './components/Stats';
import About        from './components/About';
import Services     from './components/Services';
import Projects     from './components/Projects';
import Benefits     from './components/Benefits';
import Process      from './components/Process';
import Reviews      from './components/Reviews';
import FAQ          from './components/FAQ';
import StartProject from './components/StartProject/StartProject';
import CTA          from './components/CTA';
import Footer       from './components/Footer';

export default function App() {
  return (
    <>
      {/* Cursor — fixed overlay, always on top */}
      <Cursor />

      {/* Fixed Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main>
        <Hero />
        <Stats />

        <About />
        <div className="divider" />

        <Services />
        <div className="divider" />

        <Projects />
        <div className="divider" />

        <Benefits />
        <div className="divider" />

        <Process />
        <div className="divider" />

        <Reviews />
        <div className="divider" />

        <FAQ />
        <div className="divider" />

        {/* Lead qualification + discovery questionnaire */}
        <StartProject />
      </main>

      {/* CTA + Footer */}
      <CTA />
      <Footer />
    </>
  );
}