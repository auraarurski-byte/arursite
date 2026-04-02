import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

// ============================================================
// TYPES
// ============================================================
type SidebarTab = 'Aimbot' | 'Visuals' | 'Player' | 'Ball' | 'Misc' | 'Configs';
type GalleryTab = 'Aimbot' | 'Visuals' | 'Player' | 'Ball' | 'Misc' | 'Configs';
type InterfaceView = 'mockup' | 'gallery';

// ============================================================
// TOGGLE SWITCH COMPONENT
// ============================================================
interface ToggleSwitchProps {
  defaultOn?: boolean;
}
function ToggleSwitch({ defaultOn = false }: ToggleSwitchProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="toggle-switch" onClick={() => setOn(!on)}>
      <div className={`toggle-track ${on ? 'on' : ''}`} />
      <div className={`toggle-thumb ${on ? 'on' : ''}`} />
    </label>
  );
}

// ============================================================
// CHECKBOX COMPONENT
// ============================================================
interface CheckboxProps {
  defaultChecked?: boolean;
}
function Checkbox({ defaultChecked = false }: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className={`checkbox-custom ${checked ? 'checked' : ''}`} onClick={() => setChecked(!checked)}>
      {checked && <span className="checkbox-check">✓</span>}
    </div>
  );
}

// ============================================================
// SLIDER COMPONENT
// ============================================================
interface SliderProps {
  defaultValue?: number;
}
function Slider({ defaultValue = 62.5 }: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const pct = value;
  return (
    <div className="slider-wrapper">
      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="slider-input"
        style={{
          background: `linear-gradient(to right, #c084fc ${pct}%, rgba(255,255,255,0.1) ${pct}%)`
        }}
      />
      <div className="slider-val">{value.toFixed(1)}%</div>
    </div>
  );
}

// ============================================================
// MOCKUP PANEL CONTENT
// ============================================================
function AimbotPanel() {
  return (
    <div>
      <div className="panel-section">
        <div className="panel-title">Silent Aim</div>
        <div className="control-row">
          <div>
            <div className="control-label">Silent Aim</div>
            <div className="control-sub">Bypasses standard detection</div>
          </div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Arc Type</div>
          <div className="dropdown-mock">
            Low Arc
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="control-row">
          <div className="control-label">Aim Strength</div>
          <Slider defaultValue={62.5} />
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-title">Prediction</div>
        <div className="control-row">
          <div>
            <div className="control-label">Player Prediction</div>
            <div className="control-sub">Lead target movement</div>
          </div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Lock-On Mode</div>
          <Checkbox defaultChecked={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Jump Wait</div>
          <Slider defaultValue={45} />
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-title">Team Filters</div>
        <div className="control-row">
          <div className="control-label">Smart Team Check</div>
          <ToggleSwitch defaultOn={false} />
        </div>
        <div className="control-row">
          <div className="control-label">Camera Mode</div>
          <div className="dropdown-mock">
            Camera
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="control-row">
          <div className="control-label">Auto Calibrate</div>
          <button className="flat-btn">Calibrate</button>
        </div>
      </div>
    </div>
  );
}

function VisualsPanel() {
  return (
    <div>
      <div className="panel-section">
        <div className="panel-title">Trajectory</div>
        <div className="control-row">
          <div className="control-label">Show Trajectory</div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Style</div>
          <div className="dropdown-mock">Beam<span className="dropdown-arrow">▼</span></div>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-title">Indicators</div>
        <div className="control-row">
          <div className="control-label">Range Indicators</div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Goal Effects</div>
          <Checkbox defaultChecked={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Opacity</div>
          <Slider defaultValue={80} />
        </div>
      </div>
    </div>
  );
}

function PlayerPanel() {
  return (
    <div>
      <div className="panel-section">
        <div className="panel-title">Player Overhead</div>
        <div className="control-row">
          <div className="control-label">Show Rank Icons</div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Streak Icons</div>
          <Checkbox defaultChecked={false} />
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-title">Speed</div>
        <div className="control-row">
          <div className="control-label">Speed Boost</div>
          <ToggleSwitch defaultOn={false} />
        </div>
        <div className="control-row">
          <div className="control-label">Anti-Travel</div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Speed Value</div>
          <Slider defaultValue={55} />
        </div>
      </div>
    </div>
  );
}

function GenericPanel({ title }: { title: string }) {
  return (
    <div>
      <div className="panel-section">
        <div className="panel-title">{title} Settings</div>
        <div className="control-row">
          <div className="control-label">Enable Module</div>
          <ToggleSwitch defaultOn={true} />
        </div>
        <div className="control-row">
          <div className="control-label">Intensity</div>
          <Slider defaultValue={70} />
        </div>
        <div className="control-row">
          <div className="control-label">Auto Mode</div>
          <Checkbox defaultChecked={true} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MOCKUP COMPONENT
// ============================================================
function InteractiveMockup() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('Aimbot');

  const renderPanel = () => {
    switch (activeTab) {
      case 'Aimbot': return <AimbotPanel />;
      case 'Visuals': return <VisualsPanel />;
      case 'Player': return <PlayerPanel />;
      default: return <GenericPanel title={activeTab} />;
    }
  };

  const tabs: SidebarTab[] = ['Aimbot', 'Visuals', 'Player', 'Ball', 'Misc'];

  return (
    <div className="mockup-container">
      <div className="mockup-sidebar">
        <div className="sidebar-brand">ArurHub</div>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`sidebar-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
        <hr className="sidebar-separator" />
        <div className="sidebar-label">Settings</div>
        <div
          className={`sidebar-tab ${activeTab === 'Configs' ? 'active' : ''}`}
          onClick={() => setActiveTab('Configs')}
        >
          Configs
        </div>
        <div className="sidebar-footer">
          <div>Hoopz <span>● Online</span></div>
          <div>32 days left</div>
        </div>
      </div>
      <div className="mockup-content">
        {renderPanel()}
      </div>
    </div>
  );
}

// ============================================================
// GALLERY COMPONENT
// ============================================================
const galleryImages: Record<GalleryTab, string> = {
  Aimbot: '/aimbot.png',
  Visuals: '/visuals.png',
  Player: '/player.png',
  Ball: '/ball.png',
  Misc: '/misc.png',
  Configs: '/configs.png',
};

function InGameGallery() {
  const [activeTab, setActiveTab] = useState<GalleryTab>('Aimbot');
  const tabs: GalleryTab[] = ['Aimbot', 'Visuals', 'Player', 'Ball', 'Misc', 'Configs'];

  return (
    <div className="gallery-container">
      <div className="gallery-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`gallery-dot-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="gallery-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={galleryImages[activeTab]}
          alt={`${activeTab} screenshot`}
          style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

// ============================================================
// FAQ ITEM COMPONENT
// ============================================================
interface FAQItemProps {
  question: string;
  answer: string;
}
function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {question}
        <div className="faq-icon">+</div>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [interfaceView, setInterfaceView] = useState<InterfaceView>('mockup');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.scroll-reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const faqItems = [
    {
      q: 'What games does ArurHub V2 support?',
      a: 'Currently featuring Hoopz with more games coming soon.',
    },
    {
      q: 'Is ArurHub V2 safe to use?',
      a: 'ArurHub V2 uses advanced techniques to minimize detection risk.',
    },
    {
      q: 'How does mobile support work?',
      a: 'ArurHub V2 is fully optimized for mobile devices.',
    },
    {
      q: 'Can I upgrade my plan?',
      a: "Yes, you can upgrade anytime and we'll prorate the difference.",
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept various payment methods including crypto.',
    },
  ];

  return (
    <>
      <Head>
        <title>ArurHub V2 — Elite Utility</title>
        <meta name="description" content="Elite utility. Absolute dominance. Built for those who refuse to play second place." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* SVG Chroma Key Filter */}
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="chroma-key">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 3 -1"
            />
          </filter>
        </defs>
      </svg>

      {/* ===== HEADER ===== */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo">
          <span className="logo-arur">ARUR</span>
          <span className="logo-hub">HUB</span>
          <span className="logo-v2">V2</span>
        </a>

        <nav>
          <ul className={`nav ${mobileNavOpen ? 'mobile-nav-shown' : ''}`}>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>Features</a></li>
            <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="https://discord.gg/arursite" target="_blank" rel="noopener noreferrer" className="btn-discord">
            Join Discord
          </a>
          <button className="hamburger" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content scroll-reveal">
          <h1>
            <span className="hero-line1">The Final Evolution</span>
            <span className="hero-line2">ArurHub V2</span>
          </h1>
          <p className="hero-sub">
            Elite utility. Absolute dominance. Built for those who refuse to play second place.
          </p>
          <div className="hero-cta">
            <a
              href="#pricing"
              onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}
              className="btn-primary"
            >
              Get Started
            </a>
            <a
              href="#features"
              onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
              className="btn-ghost"
            >
              View Features
            </a>
          </div>
        </div>
      </section>

      {/* ===== INTERFACE SECTION ===== */}
      <div className="interface-section">
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="scroll-reveal">
          <div className="section-label">Interface</div>
          <h2 className="section-title">See It In Action</h2>
          <p className="section-sub" style={{ maxWidth: '480px', margin: '0 auto 32px' }}>
            Explore the full control panel or view in-game screenshots.
          </p>
          <div className="interface-toggle">
            <button
              className={`toggle-btn ${interfaceView === 'mockup' ? 'active' : ''}`}
              onClick={() => setInterfaceView('mockup')}
            >
              Interactive Mockup
            </button>
            <button
              className={`toggle-btn ${interfaceView === 'gallery' ? 'active' : ''}`}
              onClick={() => setInterfaceView('gallery')}
            >
              In-Game Gallery
            </button>
          </div>
        </div>

        <div className="scroll-reveal">
          {interfaceView === 'mockup' ? <InteractiveMockup /> : <InGameGallery />}
        </div>
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="features-section">
        <div className="scroll-reveal">
          <div className="section-label">Features</div>
          <h2 className="section-title">Features</h2>
          <p className="section-sub">Deep dive into different scripts for every game.</p>
          <div className="mobile-badge">📱 MOBILE SUPPORTED</div>
        </div>

        <div className="features-hero-card scroll-reveal">
          <div className="features-hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://tr.rbxcdn.com/180DAY-353c5959d8784f2ddcca8329d15c1c0d/768/432/Image/Webp/noFilter"
              alt="Hoopz game"
            />
          </div>
          <div className="features-hero-text">
            <h3>Hoopz Advantage</h3>
            <p>Total court control with precision prediction and rich visual feedback.</p>
          </div>
        </div>

        <div className="features-grid scroll-reveal">
          <div className="feature-col">
            <div className="feature-col-title">Aim Section</div>
            {[
              'Silent Aim (Low/High Arc)',
              'Advanced Jump Wait Adjuster',
              'Player Prediction & Lock-On',
              'Smart Team Goal Check',
            ].map((f) => (
              <div key={f} className="feature-item">
                <span className="feature-arrow">›</span>
                {f}
              </div>
            ))}
          </div>
          <div className="feature-col">
            <div className="feature-col-title">Visuals</div>
            {[
              'Trajectory (Beam/Line Styles)',
              'Dynamic Range Indicators',
              'Overhead Rank & Streak Icons',
              'Animated Visual Goal Effects',
            ].map((f) => (
              <div key={f} className="feature-item">
                <span className="feature-arrow">›</span>
                {f}
              </div>
            ))}
          </div>
          <div className="feature-col">
            <div className="feature-col-title">Movement & Utilities</div>
            {[
              'Full Mag & Shot Mag',
              'Speed & Anti-Travel',
              'Auto Dunk',
            ].map((f) => (
              <div key={f} className="feature-item">
                <span className="feature-arrow">›</span>
                {f}
              </div>
            ))}
          </div>
          <div className="feature-col">
            <div className="feature-col-title">HUD & Experience</div>
            {[
              'Target HUD (Distance/Range)',
              'Live Shooting Stats',
            ].map((f) => (
              <div key={f} className="feature-item">
                <span className="feature-arrow">›</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="pricing-section">
        <div style={{ textAlign: 'center' }} className="scroll-reveal">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-sub">Simple, transparent pricing. No hidden fees.</p>
        </div>

        <div className="pricing-grid scroll-reveal">
          {/* Weekly */}
          <div className="pricing-card">
            <div className="pricing-name">Weekly</div>
            <div className="pricing-price">$3.99</div>
            <div className="pricing-period">per week</div>
            <ul className="pricing-features">
              {['Access to all scripts', 'Mobile Supported', 'Weekly Access', 'Community Access'].map((f) => (
                <li key={f} className="pricing-feature-item">
                  <span className="feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-pricing-ghost">Get Started</button>
          </div>

          {/* Monthly (Featured) */}
          <div className="pricing-card featured">
            <div className="pricing-badge">MOST POPULAR</div>
            <div className="pricing-name">Monthly</div>
            <div className="pricing-price">$8.99</div>
            <div className="pricing-period">per month</div>
            <ul className="pricing-features">
              {['Access to all scripts', 'Mobile Supported', 'Monthly Access', 'Priority Support'].map((f) => (
                <li key={f} className="pricing-feature-item">
                  <span className="feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-pricing-primary">Get Started</button>
          </div>

          {/* Lifetime */}
          <div className="pricing-card">
            <div className="pricing-name">Lifetime</div>
            <div className="pricing-price">$18.99</div>
            <div className="pricing-period">one time</div>
            <ul className="pricing-features">
              {['Access to all scripts', 'Mobile Supported', 'Lifetime Access', 'Permanent License'].map((f) => (
                <li key={f} className="pricing-feature-item">
                  <span className="feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-pricing-ghost">Get Started</button>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section id="faq" className="faq-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }} className="scroll-reveal">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">Everything you need to know about ArurHub V2.</p>
        </div>

        <div className="scroll-reveal">
          {faqItems.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <a href="#" className="logo">
              <span className="logo-arur">ARUR</span>
              <span className="logo-hub">HUB</span>
              <span className="logo-v2">V2</span>
            </a>
            <span className="footer-copy">© 2025 ArurHub V2. All rights reserved.</span>
          </div>
          <div className="footer-center">
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>Features</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a>
          </div>
          <a
            href="https://discord.gg/arursite"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-discord"
          >
            Join Discord →
          </a>
        </div>
      </footer>
    </>
  );
}
