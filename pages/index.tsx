import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

const UI_TABS = [
  { label: 'Aimbot', src: '/aimbot.png' },
  { label: 'Visuals', src: '/visuals.png' },
  { label: 'Player', src: '/player.png' },
  { label: 'Ball', src: '/ball.png' },
  { label: 'Misc', src: '/misc.png' },
  { label: 'Configs', src: '/configs.png' },
];

const AIMBOT_TOGGLES = [
  { label: 'Silent Aim', defaultOn: true },
  { label: 'Auto Jump Wait', defaultOn: false },
  { label: 'Player Lock-On', defaultOn: true },
  { label: 'Smart Team Check', defaultOn: false },
];

const FAQ_ITEMS = [
  {
    q: 'What games does ArurHub V2 support?',
    a: 'ArurHub V2 currently supports Hoopz with more games coming soon. Our scripts are built for precision and reliability.',
  },
  {
    q: 'Is it mobile supported?',
    a: 'Yes! ArurHub V2 is fully mobile supported. Our scripts are optimised for both desktop and mobile Roblox players.',
  },
  {
    q: 'How do I get access after purchasing?',
    a: 'After purchasing, you will receive access via our Discord server. Join the server link provided at checkout.',
  },
  {
    q: 'Is ArurHub V2 safe to use?',
    a: 'We build our scripts with care, but as with any exploit tool, usage is at your own risk. We are not responsible for any account actions taken by Roblox.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Due to the digital nature of our product, all sales are final. Please contact support on Discord if you have issues.',
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'mockup'>('gallery');
  const [toggleStates, setToggleStates] = useState<boolean[]>(AIMBOT_TOGGLES.map((t) => t.defaultOn));
  const [sliderValue, setSliderValue] = useState(62.5);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll effect for header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleSwitch = (i: number) => {
    setToggleStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <>
      <Head>
        <title>ArurHub V2 — The Final Evolution</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ArurHub V2 - Elite Roblox Script Service. The Final Evolution." />
      </Head>

      {/* SVG Chroma Key Filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="chromaKey">
            <feColorMatrix
              type="matrix"
              values="1.2  0    0    0   -0.1
                      0    1.2  0    0   -0.1
                      0    0    1.4  0   -0.1
                      -10  -10  -10  50   5"
            />
          </filter>
        </defs>
      </svg>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>
            <span className={styles.logoArur}>ARUR</span>
            <span className={styles.logoHub}>HUB</span>
            <sup className={styles.logoV2}>V2</sup>
          </span>
          <nav className={styles.nav}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="https://discord.gg" className={styles.discordBtn} target="_blank" rel="noopener noreferrer">
            Join Discord
          </a>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroPulse} />
        <div className={`${styles.heroContent} reveal`}>
          <p className={styles.heroEyebrow}>Elite Utility · Absolute Dominance</p>
          <h1 className={styles.heroTitle}>
            The Final Evolution
            <br />
            <span className={styles.heroGradient}>ArurHub V2</span>
          </h1>
          <p className={styles.heroSub}>
            The most advanced Roblox script service engineered for precision, power, and performance.
            Dominate every lobby with tools built for the elite.
          </p>
          <div className={styles.heroCtas}>
            <a href="#pricing" className={styles.btnPrimary}>Get Access</a>
            <a href="#ui" className={styles.btnGhost}>View Scripts</a>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE UI SECTION ──────────────────────────── */}
      <section id="ui" className={styles.section}>
        <div className={`${styles.sectionHeader} reveal`}>
          <h2 className={styles.sectionTitle}>Interactive Interface</h2>
          <p className={styles.sectionSub}>See the real in-game UI or explore the interactive mockup.</p>
        </div>
        <div className={`${styles.uiToggleRow} reveal`}>
          <button
            className={`${styles.uiToggleBtn} ${viewMode === 'gallery' ? styles.uiToggleBtnActive : ''}`}
            onClick={() => setViewMode('gallery')}
          >
            In-Game View
          </button>
          <button
            className={`${styles.uiToggleBtn} ${viewMode === 'mockup' ? styles.uiToggleBtnActive : ''}`}
            onClick={() => setViewMode('mockup')}
          >
            Mockup View
          </button>
        </div>

        {viewMode === 'gallery' ? (
          <div className={`${styles.galleryWrap} reveal`}>
            <div className={styles.dotNav}>
              {UI_TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`${styles.dot} ${i === activeTab ? styles.dotActive : ''}`}
                  onClick={() => setActiveTab(i)}
                  aria-label={tab.label}
                  title={tab.label}
                />
              ))}
            </div>
            <p className={styles.dotLabel}>{UI_TABS[activeTab].label}</p>
            <div className={styles.galleryFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={UI_TABS[activeTab].src}
                alt={`${UI_TABS[activeTab].label} UI`}
                className={styles.galleryImg}
                style={{ filter: 'url(#chromaKey)' }}
              />
            </div>
          </div>
        ) : (
          <div className={`${styles.mockupWrap} reveal`}>
            <div className={styles.mockupSidebar}>
              <span className={styles.mockupBrand}>ArurHub</span>
              {['Aimbot', 'Visuals', 'Player', 'Ball', 'Misc'].map((tab) => (
                <button key={tab} className={styles.mockupTab}>
                  <span className={styles.mockupTabIcon}>⊕</span> {tab}
                </button>
              ))}
              <div className={styles.mockupDivider}>Settings</div>
              <button className={styles.mockupTab}>
                <span className={styles.mockupTabIcon}>⊙</span> Configs
              </button>
            </div>
            <div className={styles.mockupPanel}>
              <h4 className={styles.mockupPanelTitle}>Aimbot Panel</h4>
              {AIMBOT_TOGGLES.map((t, i) => (
                <div key={t.label} className={styles.mockupRow}>
                  <span>{t.label}</span>
                  <button
                    className={`${styles.toggleSwitch} ${toggleStates[i] ? styles.toggleOn : ''}`}
                    onClick={() => toggleSwitch(i)}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                </div>
              ))}
              <div className={styles.mockupRow}>
                <span>Arc Strength</span>
                <div className={styles.sliderWrap}>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className={styles.slider}
                  />
                  <span className={styles.sliderVal}>{sliderValue.toFixed(0)}%</span>
                </div>
              </div>
              <div className={styles.mockupRow}>
                <span>Arc Type</span>
                <div className={styles.dropdownBox}>Low Arc <span>⬈</span></div>
              </div>
              <div className={styles.mockupBtnRow}>
                <button className={styles.flatBtn}>Pass to Self</button>
                <button className={styles.flatBtn}>ArurHub Config</button>
              </div>
              <div className={styles.mockupFooter}>
                <span className={styles.footerGame}>Hoopz</span>
                <span className={styles.footerCountdown}>32 days left</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section id="features" className={styles.section}>
        <div className={`${styles.sectionHeader} reveal`}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <p className={styles.sectionSub}>Deep dive into different scripts for every game.</p>
          <span className={styles.mobileBadge}>📱 MOBILE SUPPORTED</span>
        </div>

        <div className={`${styles.featureCard} reveal`}>
          <div className={styles.featureCardImg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://tr.rbxcdn.com/180DAY-353c5959d8784f2ddcca8329d15c1c0d/768/432/Image/Webp/noFilter"
              alt="Hoopz game thumbnail"
              className={styles.gameThumbnail}
            />
          </div>
          <div className={styles.featureCardBody}>
            <h3 className={styles.featureGameTitle}>Hoopz Advantage</h3>
            <p className={styles.featureGameTagline}>
              Total court control with precision prediction and rich visual feedback.
            </p>
            <div className={styles.featureGrid}>
              <div className={styles.featureCategory}>
                <div className={styles.featureCategoryTitle}>Aim Section</div>
                <ul className={styles.featureList}>
                  <li>Silent Aim (Low/High Arc)</li>
                  <li>Advanced Jump Wait Adjuster</li>
                  <li>Player Prediction &amp; Lock-On</li>
                  <li>Smart Team Goal Check</li>
                </ul>
              </div>
              <div className={styles.featureCategory}>
                <div className={styles.featureCategoryTitle}>Visuals</div>
                <ul className={styles.featureList}>
                  <li>Trajectory (Beam/Line Styles)</li>
                  <li>Dynamic Range Indicators</li>
                  <li>Overhead Rank &amp; Streak Icons</li>
                  <li>Animated Visual Goal Effects</li>
                </ul>
              </div>
              <div className={styles.featureCategory}>
                <div className={styles.featureCategoryTitle}>Movement &amp; Utilities</div>
                <ul className={styles.featureList}>
                  <li>Full Mag &amp; Shot Mag</li>
                  <li>Speed &amp; Anti-Travel</li>
                  <li>Auto Dunk</li>
                </ul>
              </div>
              <div className={styles.featureCategory}>
                <div className={styles.featureCategoryTitle}>HUD &amp; Experience</div>
                <ul className={styles.featureList}>
                  <li>Target HUD (Distance/Range)</li>
                  <li>Live Shooting Stats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────── */}
      <section id="pricing" className={styles.section}>
        <div className={`${styles.sectionHeader} reveal`}>
          <h2 className={styles.sectionTitle}>Pricing</h2>
          <p className={styles.sectionSub}>Choose the plan that fits your game.</p>
        </div>
        <div className={`${styles.pricingGrid} reveal`}>
          {/* Weekly */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingPlan}>Weekly</div>
            <div className={styles.pricingPrice}>$3.99</div>
            <ul className={styles.pricingList}>
              <li>✓ Access to all scripts</li>
              <li>✓ Mobile Supported</li>
              <li>✓ Weekly Access</li>
              <li>✓ Community Access</li>
            </ul>
            <button className={styles.pricingBtn}>Purchase</button>
          </div>
          {/* Monthly - featured */}
          <div className={`${styles.pricingCard} ${styles.pricingFeatured}`}>
            <div className={styles.pricingBadge}>Most Popular</div>
            <div className={styles.pricingPlan}>Monthly</div>
            <div className={styles.pricingPrice}>$8.99</div>
            <ul className={styles.pricingList}>
              <li>✓ Access to all scripts</li>
              <li>✓ Mobile Supported</li>
              <li>✓ Monthly Access</li>
              <li>✓ Priority Support</li>
            </ul>
            <button className={`${styles.pricingBtn} ${styles.pricingBtnFeatured}`}>Purchase</button>
          </div>
          {/* Lifetime */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingPlan}>Lifetime</div>
            <div className={styles.pricingPrice}>$18.99</div>
            <ul className={styles.pricingList}>
              <li>✓ Access to all scripts</li>
              <li>✓ Mobile Supported</li>
              <li>✓ Lifetime Access</li>
              <li>✓ Permanent License</li>
            </ul>
            <button className={styles.pricingBtn}>Purchase</button>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section id="faq" className={styles.section}>
        <div className={`${styles.sectionHeader} reveal`}>
          <h2 className={styles.sectionTitle}>FAQ</h2>
          <p className={styles.sectionSub}>Everything you need to know.</p>
        </div>
        <div className={`${styles.faqList} reveal`}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className={styles.faqQ}>
                <span>{item.q}</span>
                <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <div className={styles.faqA}>{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>
            <span className={styles.logoArur}>ARUR</span>
            <span className={styles.logoHub}>HUB</span>
            <sup className={styles.logoV2}>V2</sup>
          </span>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} ArurHub V2. Not affiliated with Roblox Corporation.
          </p>
          <div className={styles.footerLinks}>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="#faq">FAQ</a>
            <a href="#pricing">Pricing</a>
          </div>
        </div>
      </footer>
    </>
  );
}
