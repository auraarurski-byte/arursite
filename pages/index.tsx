import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ─── Types ─────────────────────────────────────────────────────────── */
type Tab = 'Aimbot' | 'Visuals' | 'Player' | 'Ball' | 'Misc' | 'Configs';

const TABS: Tab[] = ['Aimbot', 'Visuals', 'Player', 'Ball', 'Misc', 'Configs'];

const TAB_IMAGES: Record<Tab, string> = {
  Aimbot: '/aimbot.png',
  Visuals: '/visuals.png',
  Player: '/player.png',
  Ball: '/ball.png',
  Misc: '/misc.png',
  Configs: '/configs.png',
};

/* ─── Scroll-Reveal hook ─────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── FAQ data ────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: 'What games does ArurHub V2 support?',
    a: 'ArurHub V2 currently features full support for Hoopz with more games being added regularly. All scripts are thoroughly tested before release.',
  },
  {
    q: 'Is ArurHub V2 mobile compatible?',
    a: 'Yes! ArurHub V2 is built mobile-first with a responsive layout optimised for both desktop and mobile Roblox players.',
  },
  {
    q: 'How do I access my scripts after purchase?',
    a: "After purchasing, you'll receive instant access to the ArurHub V2 dashboard through our Discord community where scripts are distributed.",
  },
  {
    q: 'What happens when my subscription expires?',
    a: 'Your access will automatically end at the end of the subscription period. You can renew at any time. Lifetime members keep access forever.',
  },
  {
    q: 'Are the scripts safe to use?',
    a: 'Our scripts are designed to minimise detection. However, use at your own risk — no cheat tool is 100% undetectable at all times.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  useScrollReveal();

  /* Header scroll state */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Interactive-UI section: mockup vs gallery toggle */
  const [uiMode, setUiMode] = useState<'mockup' | 'gallery'>('mockup');

  /* Mockup toggle states */
  const [silentAim, setSilentAim] = useState(true);
  const [aimAssist, setAimAssist] = useState(false);
  const [prediction, setPrediction] = useState(true);
  const [teamCheck, setTeamCheck] = useState(true);
  const [trajectory, setTrajectory] = useState(false);

  /* Gallery active tab */
  const [activeTab, setActiveTab] = useState<Tab>('Aimbot');

  /* FAQ open item */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>ArurHub V2 – The Final Evolution</title>
        <meta
          name="description"
          content="ArurHub V2 – Elite Roblox script service. Cyber-purple glassmorphism UI with full Hoopz advantage, mobile support, and premium features."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ── SVG Chroma Key Filter (hidden) ──────────────────────────── */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="chroma-key">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -3 -3 -3 5 -1"
            />
            <feComposite in2="SourceGraphic" operator="in" />
            <feColorMatrix
              type="saturate"
              values="2"
            />
          </filter>
        </defs>
      </svg>

      {/* ════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 5%',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          background: scrolled
            ? 'rgba(6,6,9,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(192,132,252,0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.5px' }}>
          <span style={{ color: '#f8fafc' }}>ARUR</span>
          <span style={{ color: '#c084fc' }}>HUB</span>
          <sup style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, marginLeft: 2 }}>V2</sup>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 36 }}>
          {['Features', 'Pricing', 'FAQ'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f8fafc')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#94a3b8')}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#pricing"
          className="btn-primary"
          style={{ fontSize: '0.875rem', padding: '9px 20px' }}
        >
          Join Discord
        </a>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 5% 80px',
          overflow: 'hidden',
        }}
      >
        {/* Background radial pulse */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="reveal" style={{ maxWidth: 720, position: 'relative' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '5px 14px',
              background: 'rgba(192,132,252,0.1)',
              border: '1px solid rgba(192,132,252,0.3)',
              borderRadius: 999,
              fontSize: '0.78rem',
              color: '#c084fc',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Roblox Script Service
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: 12,
              color: '#f8fafc',
            }}
          >
            The Final Evolution
          </h1>
          <h1
            className="gradient-text"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: 28,
            }}
          >
            ArurHub V2
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              maxWidth: 560,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            The elite utility toolkit engineered for absolute dominance. Advanced aim prediction,
            rich visuals, and full mobile support — all in one ultra-premium package.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" className="btn-primary">Get Access</a>
            <a href="#features" className="btn-ghost">View Features</a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          INTERACTIVE UI SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="interface"
        style={{ padding: '80px 5%', maxWidth: 1200, margin: '0 auto' }}
      >
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: 12 }}>
            Interactive Interface
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: 480, margin: '0 auto 32px' }}>
            Toggle between the functional mockup and real in-game footage.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: 4,
              gap: 4,
            }}
          >
            {(['mockup', 'gallery'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setUiMode(mode)}
                style={{
                  padding: '8px 24px',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  background: uiMode === mode ? '#c084fc' : 'transparent',
                  color: uiMode === mode ? '#fff' : '#94a3b8',
                  boxShadow: uiMode === mode ? '0 0 16px rgba(192,132,252,0.4)' : 'none',
                }}
              >
                {mode === 'mockup' ? 'Mockup UI' : 'In-Game Gallery'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Mockup Panel ─────────────────────────────────────────────── */}
        {uiMode === 'mockup' && (
          <div
            className="reveal glass-card"
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              minHeight: 480,
              overflow: 'hidden',
              borderRadius: 20,
            }}
          >
            {/* Sidebar */}
            <div
              style={{
                background: 'rgba(0,0,0,0.4)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                padding: '24px 0',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  padding: '0 20px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: 12,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#c084fc',
                  letterSpacing: '1px',
                }}
              >
                ArurHub
              </div>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 20px',
                    textAlign: 'left',
                    color: activeTab === tab ? '#c084fc' : '#94a3b8',
                    background: activeTab === tab ? 'rgba(192,132,252,0.1)' : 'transparent',
                    borderLeft: activeTab === tab ? '2px solid #c084fc' : '2px solid transparent',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{activeTab === tab ? '⊕' : '⊙'}</span>
                  {tab}
                </button>
              ))}
              <div
                style={{
                  marginTop: 'auto',
                  padding: '12px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.75rem',
                  color: '#64748b',
                }}
              >
                <div>Hoopz</div>
                <div style={{ color: '#c084fc' }}>32 days left</div>
              </div>
            </div>

            {/* Main panel */}
            <div style={{ padding: '28px 32px', overflowY: 'auto' }}>
              <h3
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  marginBottom: 24,
                }}
              >
                {activeTab} Settings
              </h3>

              {activeTab === 'Aimbot' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <MockupToggle label="Silent Aim" value={silentAim} onChange={setSilentAim} />
                  <MockupToggle label="Aim Assist" value={aimAssist} onChange={setAimAssist} />
                  <MockupToggle label="Player Prediction" value={prediction} onChange={setPrediction} />
                  <MockupToggle label="Smart Team Check" value={teamCheck} onChange={setTeamCheck} />
                  <MockupToggle label="Trajectory Beam" value={trajectory} onChange={setTrajectory} />

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem', color: '#94a3b8' }}>
                      <span>FOV Radius</span>
                      <span style={{ color: '#c084fc' }}>62.5%</span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: 3,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '62.5%',
                          height: '100%',
                          background: 'linear-gradient(90deg, #a855f7, #c084fc)',
                          borderRadius: 3,
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '62.5%',
                          transform: 'translate(-50%, -50%)',
                          width: 14,
                          height: 14,
                          background: '#c084fc',
                          borderRadius: '50%',
                          boxShadow: '0 0 8px rgba(192,132,252,0.6)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 8, fontSize: '0.85rem', color: '#94a3b8' }}>Arc Mode</div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8,
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        cursor: 'pointer',
                      }}
                    >
                      <span>Low Arc</span>
                      <span style={{ color: '#c084fc' }}>⬈</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    {['Pass to Self', 'ArurHub Config'].map((btn) => (
                      <button
                        key={btn}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 8,
                          color: '#94a3b8',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(192,132,252,0.1)';
                          (e.currentTarget as HTMLElement).style.color = '#c084fc';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                        }}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab !== 'Aimbot' && (
                <div style={{ color: '#64748b', fontSize: '0.9rem', paddingTop: 20 }}>
                  Switch to the <strong style={{ color: '#c084fc' }}>In-Game Gallery</strong> to see real{' '}
                  <strong style={{ color: '#c084fc' }}>{activeTab}</strong> footage.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Gallery Panel ─────────────────────────────────────────────── */}
        {uiMode === 'gallery' && (
          <div className="reveal">
            {/* Dot navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  title={tab}
                  style={{
                    width: activeTab === tab ? 32 : 10,
                    height: 10,
                    borderRadius: activeTab === tab ? 5 : '50%',
                    background: activeTab === tab ? '#c084fc' : 'rgba(192,132,252,0.3)',
                    boxShadow: activeTab === tab ? '0 0 10px rgba(192,132,252,0.6)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#c084fc', textAlign: 'center', marginBottom: 20, letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
              {activeTab}
            </div>

            {/* Image with chroma-key filter */}
            <div
              style={{
                position: 'relative',
                maxWidth: 700,
                margin: '0 auto',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, transparent 60%, #060609 100%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
              <Image
                src={TAB_IMAGES[activeTab]}
                alt={`${activeTab} UI`}
                width={700}
                height={450}
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'url(#chroma-key) drop-shadow(0 8px 40px rgba(192,132,252,0.3))',
                  borderRadius: 12,
                  display: 'block',
                }}
              />
            </div>

            {/* Tab labels */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: activeTab === tab ? 'rgba(192,132,252,0.15)' : 'transparent',
                    border: `1px solid ${activeTab === tab ? '#c084fc' : 'rgba(255,255,255,0.08)'}`,
                    color: activeTab === tab ? '#c084fc' : '#64748b',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" style={{ padding: '80px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: 12 }}>Features</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Deep dive into different scripts for every game.</p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(192,132,252,0.12)',
              border: '1px solid rgba(192,132,252,0.3)',
              borderRadius: 999,
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#c084fc',
            }}
          >
            📱 MOBILE SUPPORTED
          </div>
        </div>

        {/* Hoopz Card */}
        <div
          className="reveal glass-card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 340px) 1fr',
            gap: 0,
            overflow: 'hidden',
            borderRadius: 20,
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
          }}
        >
          {/* Game thumbnail */}
          <div style={{ position: 'relative', minHeight: 280, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://tr.rbxcdn.com/180DAY-353c5959d8784f2ddcca8329d15c1c0d/768/432/Image/Webp/noFilter"
              alt="Hoopz"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.85)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent 60%, rgba(10,10,15,0.8) 100%)',
              }}
            />
          </div>

          {/* Feature grid */}
          <div style={{ padding: '32px 36px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>Hoopz Advantage</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 28 }}>
              Total court control with precision prediction and rich visual feedback.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 24,
              }}
            >
              {[
                {
                  title: 'AIM SECTION',
                  items: ['Silent Aim (Low/High Arc)', 'Advanced Jump Wait Adjuster', 'Player Prediction & Lock-On', 'Smart Team Goal Check'],
                },
                {
                  title: 'VISUALS',
                  items: ['Trajectory (Beam/Line Styles)', 'Dynamic Range Indicators', 'Overhead Rank & Streak Icons', 'Animated Visual Goal Effects'],
                },
                {
                  title: 'MOVEMENT & UTILITIES',
                  items: ['Full Mag & Shot Mag', 'Speed & Anti-Travel', 'Auto Dunk'],
                },
                {
                  title: 'HUD & EXPERIENCE',
                  items: ['Target HUD (Distance/Range)', 'Live Shooting Stats'],
                },
              ].map((cat) => (
                <div key={cat.title} style={{ borderLeft: '2px solid #c084fc', paddingLeft: 14 }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    {cat.title}
                  </div>
                  {cat.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 6,
                        marginBottom: 8,
                        fontSize: '0.83rem',
                        color: '#94a3b8',
                      }}
                    >
                      <span style={{ color: '#c084fc', fontWeight: 700, flexShrink: 0 }}>›</span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="pricing" style={{ padding: '80px 5%', maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: 12 }}>Pricing</h2>
          <p style={{ color: '#94a3b8' }}>Simple, transparent pricing. No hidden fees.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {[
            {
              name: 'Weekly',
              price: '$3.99',
              period: '/week',
              features: ['Access to all scripts', 'Mobile Supported', 'Weekly Access', 'Community Access'],
              featured: false,
            },
            {
              name: 'Monthly',
              price: '$8.99',
              period: '/month',
              features: ['Access to all scripts', 'Mobile Supported', 'Monthly Access', 'Priority Support'],
              featured: true,
              badge: 'Most Popular',
            },
            {
              name: 'Lifetime',
              price: '$18.99',
              period: '/once',
              features: ['Access to all scripts', 'Mobile Supported', 'Lifetime Access', 'Permanent License'],
              featured: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className="reveal glass-card"
              style={{
                padding: '36px 28px',
                borderRadius: 20,
                textAlign: 'center',
                transform: plan.featured ? 'scale(1.05)' : 'scale(1)',
                border: plan.featured
                  ? '1px solid rgba(192,132,252,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.featured ? '0 0 40px rgba(192,132,252,0.15)' : 'none',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px',
                    background: '#c084fc',
                    borderRadius: 999,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#94a3b8', marginBottom: 16 }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, marginBottom: 28 }}>
                <span style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, color: '#f8fafc' }}>{plan.price}</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 6 }}>{plan.period}</span>
              </div>

              <ul style={{ textAlign: 'left', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: '#94a3b8' }}>
                    <span style={{ color: '#4ade80', fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  background: plan.featured ? '#c084fc' : 'transparent',
                  color: plan.featured ? '#fff' : '#c084fc',
                  border: plan.featured ? 'none' : '1px solid rgba(192,132,252,0.4)',
                  boxShadow: plan.featured ? '0 0 20px rgba(192,132,252,0.4)' : 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(192,132,252,0.5)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = plan.featured ? '0 0 20px rgba(192,132,252,0.4)' : 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '80px 5%', maxWidth: 800, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: 12 }}>FAQ</h2>
          <p style={{ color: '#94a3b8' }}>Common questions answered.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="reveal glass-card"
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: openFaq === i ? '1px solid rgba(192,132,252,0.3)' : '1px solid rgba(255,255,255,0.06)',
                transition: 'border 0.3s',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '18px 22px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  color: '#f8fafc',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'transparent',
                }}
              >
                {item.q}
                <span
                  style={{
                    color: '#c084fc',
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div
                  style={{
                    padding: '0 22px 18px',
                    color: '#94a3b8',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    paddingTop: 14,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 5%',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, fontWeight: 800, fontSize: '1.2rem', justifyContent: 'center', marginBottom: 16 }}>
          <span style={{ color: '#f8fafc' }}>ARUR</span>
          <span style={{ color: '#c084fc' }}>HUB</span>
          <sup style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600, marginLeft: 2 }}>V2</sup>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} ArurHub V2. All rights reserved. Use responsibly.
        </p>
      </footer>
    </>
  );
}

/* ─── Reusable: Toggle Switch ────────────────────────────────────────── */
function MockupToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: value ? '#c084fc' : 'rgba(255,255,255,0.12)',
          position: 'relative',
          transition: 'background 0.3s',
          boxShadow: value ? '0 0 10px rgba(192,132,252,0.5)' : 'none',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: value ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
        />
      </button>
    </div>
  );
}
